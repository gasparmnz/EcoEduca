import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
import { createClient } from "npm:@supabase/supabase-js@2";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Helper function to verify authentication
async function verifyAuth(authHeader: string | null) {
  if (!authHeader) return null;

  const token = authHeader.split(' ')[1];
  if (!token) return null;

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );

  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (error || !user) return null;

  return user;
}

// Health check endpoint
app.get("/make-server-84c7c45b/health", (c) => {
  return c.json({ status: "ok" });
});

// Authentication endpoints
app.post("/make-server-84c7c45b/auth/signup", async (c) => {
  try {
    const { email, password, name } = await c.req.json();

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      email_confirm: true
    });

    if (error) {
      console.log('Signup error:', error);
      return c.json({ error: error.message }, 400);
    }

    // Initialize user profile in KV store
    await kv.set(`user_profile:${data.user.id}`, {
      id: data.user.id,
      email,
      name,
      points: 0,
      badges: [],
      coursesCompleted: [],
      createdAt: new Date().toISOString()
    });

    return c.json({ success: true, user: data.user });
  } catch (error) {
    console.log('Signup error during request processing:', error);
    return c.json({ error: 'Failed to create user' }, 500);
  }
});

app.post("/make-server-84c7c45b/auth/login", async (c) => {
  try {
    const { email, password } = await c.req.json();

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!
    );

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      console.log('Login error:', error);
      return c.json({ error: error.message }, 401);
    }

    return c.json({
      success: true,
      access_token: data.session.access_token,
      user: data.user
    });
  } catch (error) {
    console.log('Login error during request processing:', error);
    return c.json({ error: 'Failed to login' }, 500);
  }
});

app.get("/make-server-84c7c45b/auth/session", async (c) => {
  const user = await verifyAuth(c.req.header('Authorization'));

  if (!user) {
    return c.json({ authenticated: false }, 401);
  }

  return c.json({ authenticated: true, user });
});

// User profile endpoints
app.get("/make-server-84c7c45b/profile", async (c) => {
  const user = await verifyAuth(c.req.header('Authorization'));
  if (!user) return c.json({ error: 'Unauthorized' }, 401);

  const profile = await kv.get(`user_profile:${user.id}`);
  return c.json({ profile });
});

app.put("/make-server-84c7c45b/profile", async (c) => {
  const user = await verifyAuth(c.req.header('Authorization'));
  if (!user) return c.json({ error: 'Unauthorized' }, 401);

  const updates = await c.req.json();
  const currentProfile = await kv.get(`user_profile:${user.id}`) || {};

  const updatedProfile = { ...currentProfile, ...updates };
  await kv.set(`user_profile:${user.id}`, updatedProfile);

  return c.json({ success: true, profile: updatedProfile });
});

// Courses endpoints
app.get("/make-server-84c7c45b/courses", async (c) => {
  const courses = await kv.getByPrefix('course:');
  return c.json({ courses });
});

app.get("/make-server-84c7c45b/courses/:id", async (c) => {
  const id = c.req.param('id');
  const course = await kv.get(`course:${id}`);

  if (!course) {
    return c.json({ error: 'Course not found' }, 404);
  }

  return c.json({ course });
});

app.post("/make-server-84c7c45b/courses", async (c) => {
  const user = await verifyAuth(c.req.header('Authorization'));
  if (!user) return c.json({ error: 'Unauthorized' }, 401);

  const courseData = await c.req.json();
  const courseId = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  const course = {
    id: courseId,
    ...courseData,
    createdBy: user.id,
    createdAt: new Date().toISOString()
  };

  await kv.set(`course:${courseId}`, course);
  return c.json({ success: true, course });
});

// User progress endpoints
app.get("/make-server-84c7c45b/progress/:courseId", async (c) => {
  const user = await verifyAuth(c.req.header('Authorization'));
  if (!user) return c.json({ error: 'Unauthorized' }, 401);

  const courseId = c.req.param('courseId');
  const progress = await kv.get(`progress:${user.id}:${courseId}`);

  return c.json({ progress: progress || { completed: false, percentage: 0 } });
});

app.post("/make-server-84c7c45b/progress/:courseId", async (c) => {
  const user = await verifyAuth(c.req.header('Authorization'));
  if (!user) return c.json({ error: 'Unauthorized' }, 401);

  const courseId = c.req.param('courseId');
  const progressData = await c.req.json();

  await kv.set(`progress:${user.id}:${courseId}`, {
    ...progressData,
    userId: user.id,
    courseId,
    updatedAt: new Date().toISOString()
  });

  return c.json({ success: true });
});

// Community forum endpoints
app.get("/make-server-84c7c45b/forum/posts", async (c) => {
  const posts = await kv.getByPrefix('forum_post:');
  return c.json({ posts: posts.sort((a: any, b: any) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ) });
});

app.post("/make-server-84c7c45b/forum/posts", async (c) => {
  const user = await verifyAuth(c.req.header('Authorization'));
  if (!user) return c.json({ error: 'Unauthorized' }, 401);

  const { title, content, category } = await c.req.json();
  const postId = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  const post = {
    id: postId,
    title,
    content,
    category,
    authorId: user.id,
    authorName: user.user_metadata.name || user.email,
    likes: 0,
    replies: 0,
    createdAt: new Date().toISOString()
  };

  await kv.set(`forum_post:${postId}`, post);

  // Award points for participation
  const profile = await kv.get(`user_profile:${user.id}`) || {};
  await kv.set(`user_profile:${user.id}`, {
    ...profile,
    points: (profile.points || 0) + 10
  });

  return c.json({ success: true, post });
});

app.post("/make-server-84c7c45b/forum/posts/:postId/like", async (c) => {
  const user = await verifyAuth(c.req.header('Authorization'));
  if (!user) return c.json({ error: 'Unauthorized' }, 401);

  const postId = c.req.param('postId');
  const post = await kv.get(`forum_post:${postId}`);

  if (!post) {
    return c.json({ error: 'Post not found' }, 404);
  }

  await kv.set(`forum_post:${postId}`, {
    ...post,
    likes: (post.likes || 0) + 1
  });

  return c.json({ success: true });
});

// Projects endpoints
app.get("/make-server-84c7c45b/projects", async (c) => {
  const projects = await kv.getByPrefix('project:');
  return c.json({ projects });
});

app.post("/make-server-84c7c45b/projects", async (c) => {
  const user = await verifyAuth(c.req.header('Authorization'));
  if (!user) return c.json({ error: 'Unauthorized' }, 401);

  const projectData = await c.req.json();
  const projectId = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  const project = {
    id: projectId,
    ...projectData,
    createdBy: user.id,
    volunteers: [],
    donations: 0,
    createdAt: new Date().toISOString()
  };

  await kv.set(`project:${projectId}`, project);
  return c.json({ success: true, project });
});

// Carbon footprint endpoints
app.post("/make-server-84c7c45b/carbon/calculate", async (c) => {
  const user = await verifyAuth(c.req.header('Authorization'));
  if (!user) return c.json({ error: 'Unauthorized' }, 401);

  const data = await c.req.json();

  // Simple carbon calculation (tons of CO2 per year)
  const transportation = (data.carKm || 0) * 0.000192; // kg CO2 per km
  const energy = (data.electricityKwh || 0) * 0.000475; // kg CO2 per kWh
  const food = data.meatMeals || 0 * 6.61 / 365; // kg CO2 per meal per day

  const total = transportation + energy + food;

  const calculation = {
    userId: user.id,
    total,
    breakdown: { transportation, energy, food },
    data,
    calculatedAt: new Date().toISOString()
  };

  await kv.set(`carbon:${user.id}:${Date.now()}`, calculation);

  return c.json({ calculation });
});

app.get("/make-server-84c7c45b/carbon/history", async (c) => {
  const user = await verifyAuth(c.req.header('Authorization'));
  if (!user) return c.json({ error: 'Unauthorized' }, 401);

  const history = await kv.getByPrefix(`carbon:${user.id}:`);
  return c.json({ history });
});

// Library resources endpoints
app.get("/make-server-84c7c45b/library/resources", async (c) => {
  const resources = await kv.getByPrefix('library_resource:');
  return c.json({ resources });
});

app.post("/make-server-84c7c45b/library/resources", async (c) => {
  const user = await verifyAuth(c.req.header('Authorization'));
  if (!user) return c.json({ error: 'Unauthorized' }, 401);

  const resourceData = await c.req.json();
  const resourceId = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  const resource = {
    id: resourceId,
    ...resourceData,
    uploadedBy: user.id,
    downloads: 0,
    createdAt: new Date().toISOString()
  };

  await kv.set(`library_resource:${resourceId}`, resource);
  return c.json({ success: true, resource });
});

Deno.serve(app.fetch);