import { useState, useEffect } from "react";
import { User, Award, BookOpen, TrendingUp, Settings, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";
import { projectId, publicAnonKey } from "/utils/supabase/info";

export function ProfilePage() {
  const { user, accessToken, logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    loadProfile();
  }, [user, accessToken]);

  const loadProfile = async () => {
    if (!accessToken) return;

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
      setProfile(data.profile || {});
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-600">Carregando...</div>
      </div>
    );
  }

  const completedCourses = profile?.coursesCompleted || [];
  const badges = profile?.badges || [];
  const points = profile?.points || 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold text-gray-900">Meu Perfil</h1>
        <button
          onClick={handleLogout}
          className="flex items-center text-red-600 hover:text-red-700 transition-colors"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Sair
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Info */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <User className="w-12 h-12 text-green-700" />
              </div>
              <h2 className="text-2xl font-semibold mb-1">{profile?.name || user?.email}</h2>
              <p className="text-gray-600 mb-4">{user?.email}</p>

              <div className="w-full border-t pt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Pontos</span>
                  <span className="text-2xl font-bold text-green-700">{points}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Cursos Completos</span>
                  <span className="text-xl font-semibold">{completedCourses.length}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Settings className="w-5 h-5 mr-2" />
              Configurações
            </h3>
            <button className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors">
              Editar Perfil
            </button>
            <button className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors">
              Notificações
            </button>
            <button className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors">
              Privacidade
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Badges */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Award className="w-6 h-6 mr-2 text-yellow-500" />
              Conquistas e Medalhas
            </h3>

            <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Award className="w-8 h-8 text-yellow-500" />
                </div>
                <p className="text-xs font-semibold text-gray-700">Primeira Conta</p>
              </div>

              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <BookOpen className="w-8 h-8 text-green-500" />
                </div>
                <p className="text-xs font-semibold text-gray-700">Primeiro Curso</p>
              </div>

              <div className="text-center p-4 bg-blue-50 rounded-lg opacity-50">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Award className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-xs font-semibold text-gray-700">100 Pontos</p>
              </div>

              <div className="text-center p-4 bg-purple-50 rounded-lg opacity-50">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <TrendingUp className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-xs font-semibold text-gray-700">10 Desafios</p>
              </div>
            </div>
          </div>

          {/* Course Progress */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <BookOpen className="w-6 h-6 mr-2 text-green-700" />
              Progresso em Cursos
            </h3>

            {completedCourses.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">Você ainda não completou nenhum curso</p>
                <button
                  onClick={() => navigate("/courses")}
                  className="bg-green-700 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
                >
                  Explorar Cursos
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {completedCourses.map((courseId: string, index: number) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">Curso {courseId}</h4>
                        <p className="text-sm text-gray-600">Completo</p>
                      </div>
                      <Award className="w-8 h-8 text-yellow-500" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Activity Timeline */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <TrendingUp className="w-6 h-6 mr-2 text-green-700" />
              Atividade Recente
            </h3>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                <div>
                  <p className="font-medium">Conta criada</p>
                  <p className="text-sm text-gray-600">
                    {new Date(profile?.createdAt || Date.now()).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>

              {points > 0 && (
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                  <div>
                    <p className="font-medium">Ganhou {points} pontos</p>
                    <p className="text-sm text-gray-600">Por participação na comunidade</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Impact Summary */}
          <div className="bg-gradient-to-r from-green-500 to-green-700 text-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Seu Impacto Ambiental</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <div className="text-3xl font-bold">0</div>
                <div className="text-sm text-green-100">Cursos Completados</div>
              </div>
              <div>
                <div className="text-3xl font-bold">{points}</div>
                <div className="text-sm text-green-100">Pontos Conquistados</div>
              </div>
              <div>
                <div className="text-3xl font-bold">0</div>
                <div className="text-sm text-green-100">Desafios Aceitos</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
