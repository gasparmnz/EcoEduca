import { useState, useEffect } from "react";
import { MessageSquare, ThumbsUp, Award, TrendingUp, Plus, Send } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { projectId, publicAnonKey } from "/utils/supabase/info";

export function CommunityPage() {
  const { user, accessToken } = useAuth();
  const [posts, setPosts] = useState<any[]>([]);
  const [showNewPost, setShowNewPost] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostCategory, setNewPostCategory] = useState("general");
  const [userProfile, setUserProfile] = useState<any>(null);

  const categories = [
    { id: "general", name: "Geral", color: "bg-gray-100 text-gray-700" },
    { id: "tips", name: "Dicas", color: "bg-blue-100 text-blue-700" },
    { id: "projects", name: "Projetos", color: "bg-green-100 text-green-700" },
    { id: "questions", name: "Perguntas", color: "bg-purple-100 text-purple-700" }
  ];

  useEffect(() => {
    loadPosts();
    if (user && accessToken) {
      loadUserProfile();
    }
  }, [user, accessToken]);

  const loadPosts = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-84c7c45b/forum/posts`,
        {
          headers: {
            Authorization: `Bearer ${publicAnonKey}`
          }
        }
      );
      const data = await response.json();
      setPosts(data.posts || []);
    } catch (error) {
      console.error('Error loading posts:', error);
    }
  };

  const loadUserProfile = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-84c7c45b/profile`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
      const data = await response.json();
      setUserProfile(data.profile);
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const handleCreatePost = async () => {
    if (!user || !accessToken) {
      alert('Você precisa estar logado para criar posts');
      return;
    }

    if (!newPostTitle.trim() || !newPostContent.trim()) {
      alert('Preencha título e conteúdo');
      return;
    }

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-84c7c45b/forum/posts`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
          },
          body: JSON.stringify({
            title: newPostTitle,
            content: newPostContent,
            category: newPostCategory
          })
        }
      );

      if (response.ok) {
        setNewPostTitle("");
        setNewPostContent("");
        setShowNewPost(false);
        loadPosts();
        loadUserProfile();
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleLikePost = async (postId: string) => {
    if (!user || !accessToken) {
      alert('Você precisa estar logado para curtir posts');
      return;
    }

    try {
      await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-84c7c45b/forum/posts/${postId}/like`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
      loadPosts();
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const getCategoryStyle = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category?.color || "bg-gray-100 text-gray-700";
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Comunidade</h1>
        <p className="text-lg text-gray-600">
          Conecte-se, compartilhe experiências e aprenda com outros membros
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* New Post Button */}
          {user && (
            <div className="mb-6">
              <button
                onClick={() => setShowNewPost(!showNewPost)}
                className="w-full bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center"
              >
                <Plus className="w-5 h-5 mr-2" />
                Criar Nova Publicação
              </button>
            </div>
          )}

          {/* New Post Form */}
          {showNewPost && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-xl font-semibold mb-4">Nova Publicação</h3>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categoria
                </label>
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setNewPostCategory(category.id)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        newPostCategory === category.id
                          ? "bg-green-700 text-white"
                          : category.color
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              <input
                type="text"
                placeholder="Título da publicação"
                value={newPostTitle}
                onChange={(e) => setNewPostTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              <textarea
                placeholder="Compartilhe sua experiência, dica ou pergunta..."
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              <div className="flex space-x-3">
                <button
                  onClick={handleCreatePost}
                  className="flex items-center bg-green-700 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Publicar
                </button>
                <button
                  onClick={() => setShowNewPost(false)}
                  className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}

          {/* Posts List */}
          <div className="space-y-4">
            {posts.map(post => (
              <div key={post.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryStyle(post.category)}`}>
                    {categories.find(c => c.id === post.category)?.name || post.category}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(post.createdAt).toLocaleDateString('pt-BR')}
                  </span>
                </div>

                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.content}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <span className="font-medium">{post.authorName}</span>
                  </div>

                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleLikePost(post.id)}
                      className="flex items-center text-gray-600 hover:text-green-700 transition-colors"
                    >
                      <ThumbsUp className="w-5 h-5 mr-1" />
                      <span>{post.likes || 0}</span>
                    </button>
                    <div className="flex items-center text-gray-600">
                      <MessageSquare className="w-5 h-5 mr-1" />
                      <span>{post.replies || 0}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {posts.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Nenhuma publicação ainda. Seja o primeiro a compartilhar!</p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* User Points */}
          {userProfile && (
            <div className="bg-gradient-to-r from-green-500 to-green-700 text-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <TrendingUp className="w-8 h-8 mr-3" />
                <div>
                  <div className="text-3xl font-bold">{userProfile.points || 0}</div>
                  <div className="text-sm text-green-100">Pontos</div>
                </div>
              </div>
              <p className="text-sm text-green-100">
                Continue participando para ganhar mais pontos e medalhas!
              </p>
            </div>
          )}

          {/* Badges */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Award className="w-5 h-5 mr-2 text-yellow-500" />
              Medalhas
            </h3>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Award className="w-8 h-8 text-yellow-500" />
                </div>
                <p className="text-xs text-gray-600">Primeira Postagem</p>
              </div>
              <div className="text-center opacity-50">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Award className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-xs text-gray-600">10 Curtidas</p>
              </div>
              <div className="text-center opacity-50">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Award className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-xs text-gray-600">Membro Ativo</p>
              </div>
            </div>
          </div>

          {/* Top Contributors */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Top Contribuidores</h3>
            <div className="space-y-3">
              {[
                { name: "Maria Silva", points: 1250 },
                { name: "João Santos", points: 980 },
                { name: "Ana Costa", points: 750 }
              ].map((user, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-lg font-bold text-gray-400 w-6">#{index + 1}</span>
                    <span className="font-medium">{user.name}</span>
                  </div>
                  <span className="text-sm text-green-700 font-semibold">{user.points} pts</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
