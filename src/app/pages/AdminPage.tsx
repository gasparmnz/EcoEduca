import { useState } from "react";
import { Users, BookOpen, MessageSquare, Briefcase, BarChart3, Plus, Edit, Trash2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";

export function AdminPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  if (!user) {
    navigate("/login");
    return null;
  }

  const stats = [
    { label: "Total de Usuários", value: "1,234", icon: Users, color: "bg-blue-500" },
    { label: "Cursos Ativos", value: "52", icon: BookOpen, color: "bg-green-500" },
    { label: "Posts no Fórum", value: "3,456", icon: MessageSquare, color: "bg-purple-500" },
    { label: "Projetos Ativos", value: "15", icon: Briefcase, color: "bg-orange-500" }
  ];

  const recentUsers = [
    { id: 1, name: "Maria Silva", email: "maria@email.com", date: "2026-05-27" },
    { id: 2, name: "João Santos", email: "joao@email.com", date: "2026-05-26" },
    { id: 3, name: "Ana Costa", email: "ana@email.com", date: "2026-05-25" }
  ];

  const recentCourses = [
    { id: 1, title: "Energia Solar Básica", students: 245, status: "Ativo" },
    { id: 2, title: "Reciclagem Avançada", students: 189, status: "Ativo" },
    { id: 3, title: "Consumo Consciente", students: 432, status: "Ativo" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Painel Administrativo</h1>
        <p className="text-lg text-gray-600">Gerencie conteúdo, usuários e monitore métricas</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-md mb-8">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "overview"
                  ? "border-green-700 text-green-700"
                  : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
              }`}
            >
              Visão Geral
            </button>
            <button
              onClick={() => setActiveTab("users")}
              className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "users"
                  ? "border-green-700 text-green-700"
                  : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
              }`}
            >
              Usuários
            </button>
            <button
              onClick={() => setActiveTab("courses")}
              className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "courses"
                  ? "border-green-700 text-green-700"
                  : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
              }`}
            >
              Cursos
            </button>
            <button
              onClick={() => setActiveTab("content")}
              className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "content"
                  ? "border-green-700 text-green-700"
                  : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
              }`}
            >
              Conteúdo
            </button>
          </nav>
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Charts and Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Engagement Chart */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Engajamento Mensal</h3>
                <BarChart3 className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-3">
                {[
                  { month: "Janeiro", value: 85 },
                  { month: "Fevereiro", value: 92 },
                  { month: "Março", value: 78 },
                  { month: "Abril", value: 95 },
                  { month: "Maio", value: 88 }
                ].map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{item.month}</span>
                      <span className="font-semibold">{item.value}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${item.value}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Users */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Usuários Recentes</h3>
              <div className="space-y-3">
                {recentUsers.map(user => (
                  <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-green-700" />
                      </div>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">{user.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Users Tab */}
      {activeTab === "users" && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Gerenciar Usuários</h3>
              <button className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center">
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Usuário
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nome
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pontos
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data de Cadastro
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentUsers.map(user => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{user.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {Math.floor(Math.random() * 500)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {user.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-800">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-800">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Courses Tab */}
      {activeTab === "courses" && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Gerenciar Cursos</h3>
              <button className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center">
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Curso
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Título
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Alunos
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentCourses.map(course => (
                  <tr key={course.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{course.title}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {course.students}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {course.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-800">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-800">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Content Tab */}
      {activeTab === "content" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Biblioteca Digital</h3>
            <p className="text-gray-600 mb-4">Gerencie recursos e materiais educativos</p>
            <button className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors w-full">
              Gerenciar Recursos
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Fórum da Comunidade</h3>
            <p className="text-gray-600 mb-4">Modere posts e discussões</p>
            <button className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors w-full">
              Moderar Fórum
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Projetos</h3>
            <p className="text-gray-600 mb-4">Gerencie projetos e parcerias</p>
            <button className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors w-full">
              Gerenciar Projetos
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Desafios</h3>
            <p className="text-gray-600 mb-4">Crie e gerencie desafios semanais</p>
            <button className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors w-full">
              Gerenciar Desafios
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
