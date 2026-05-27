import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { CoursesPage } from "./pages/CoursesPage";
import { CourseDetailsPage } from "./pages/CourseDetailsPage";
import { LibraryPage } from "./pages/LibraryPage";
import { CommunityPage } from "./pages/CommunityPage";
import { ImpactToolsPage } from "./pages/ImpactToolsPage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { ProfilePage } from "./pages/ProfilePage";
import { AdminPage } from "./pages/AdminPage";
import { ContactPage } from "./pages/ContactPage";
import { NotFoundPage } from "./pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "login", Component: LoginPage },
      { path: "register", Component: RegisterPage },
      { path: "courses", Component: CoursesPage },
      { path: "courses/:id", Component: CourseDetailsPage },
      { path: "library", Component: LibraryPage },
      { path: "community", Component: CommunityPage },
      { path: "impact", Component: ImpactToolsPage },
      { path: "projects", Component: ProjectsPage },
      { path: "profile", Component: ProfilePage },
      { path: "admin", Component: AdminPage },
      { path: "contact", Component: ContactPage },
      { path: "*", Component: NotFoundPage },
    ],
  },
]);
