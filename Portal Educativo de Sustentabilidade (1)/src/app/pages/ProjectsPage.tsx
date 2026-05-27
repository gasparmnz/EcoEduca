import { useState, useEffect } from "react";
import { Briefcase, Users, DollarSign, MapPin, Heart, Filter } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { projectId, publicAnonKey } from "/utils/supabase/info";

export function ProjectsPage() {
  const { user, accessToken } = useAuth();
  const [projects, setProjects] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "Todos" },
    { id: "reforestation", name: "Reflorestamento" },
    { id: "cleanup", name: "Limpeza" },
    { id: "education", name: "Educação" },
    { id: "conservation", name: "Conservação" }
  ];

  const sampleProjects = [
    {
      id: "1",
      title: "Reflorestamento da Mata Atlântica",
      description: "Projeto de plantio de 10.000 mudas nativas na região da Mata Atlântica",
      category: "reforestation",
      organization: "Instituto Verde Vida",
      location: "São Paulo, SP",
      volunteers: 45,
      volunteersNeeded: 100,
      donations: 15000,
      goal: 50000,
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=300&fit=crop"
    },
    {
      id: "2",
      title: "Limpeza de Praias",
      description: "Mutirão mensal para limpeza e conscientização nas praias do litoral",
      category: "cleanup",
      organization: "Oceano Limpo",
      location: "Rio de Janeiro, RJ",
      volunteers: 120,
      volunteersNeeded: 200,
      donations: 8000,
      goal: 20000,
      image: "https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=400&h=300&fit=crop"
    },
    {
      id: "3",
      title: "Educação Ambiental em Escolas",
      description: "Programa de workshops sobre sustentabilidade para crianças",
      category: "education",
      organization: "EduVerde",
      location: "Belo Horizonte, MG",
      volunteers: 30,
      volunteersNeeded: 50,
      donations: 12000,
      goal: 30000,
      image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=400&h=300&fit=crop"
    },
    {
      id: "4",
      title: "Preservação de Nascentes",
      description: "Recuperação e proteção de nascentes na região do cerrado",
      category: "conservation",
      organization: "Águas Vivas",
      location: "Goiás, GO",
      volunteers: 25,
      volunteersNeeded: 60,
      donations: 20000,
      goal: 40000,
      image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=300&fit=crop"
    }
  ];

  useEffect(() => {
    setProjects(sampleProjects);
  }, []);

  const filteredProjects = projects.filter(project =>
    selectedCategory === "all" || project.category === selectedCategory
  );

  const getProgressPercentage = (current: number, goal: number) => {
    return Math.min((current / goal) * 100, 100);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Projetos e Parcerias</h1>
        <p className="text-lg text-gray-600">
          Participe de iniciativas ambientais e faça a diferença na prática
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center mb-4">
          <Filter className="w-5 h-5 text-gray-600 mr-2" />
          <h2 className="text-lg font-semibold">Categoria</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? "bg-green-700 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map(project => (
          <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-48 object-cover"
            />

            <div className="p-6">
              <div className="flex items-center text-sm text-gray-600 mb-3">
                <Briefcase className="w-4 h-4 mr-1" />
                <span className="mr-4">{project.organization}</span>
                <MapPin className="w-4 h-4 mr-1" />
                <span>{project.location}</span>
              </div>

              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-gray-600 mb-4">{project.description}</p>

              {/* Volunteers Progress */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="flex items-center text-gray-700">
                    <Users className="w-4 h-4 mr-1" />
                    Voluntários
                  </span>
                  <span className="font-semibold">
                    {project.volunteers} / {project.volunteersNeeded}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${getProgressPercentage(project.volunteers, project.volunteersNeeded)}%` }}
                  ></div>
                </div>
              </div>

              {/* Donations Progress */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="flex items-center text-gray-700">
                    <DollarSign className="w-4 h-4 mr-1" />
                    Doações
                  </span>
                  <span className="font-semibold">
                    R$ {project.donations.toLocaleString('pt-BR')} / R$ {project.goal.toLocaleString('pt-BR')}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: `${getProgressPercentage(project.donations, project.goal)}%` }}
                  ></div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button className="flex-1 bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center">
                  <Users className="w-4 h-4 mr-2" />
                  Voluntariar
                </button>
                <button className="flex-1 bg-white text-green-700 border-2 border-green-700 px-4 py-2 rounded-lg hover:bg-green-50 transition-colors flex items-center justify-center">
                  <Heart className="w-4 h-4 mr-2" />
                  Doar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Nenhum projeto encontrado nesta categoria</p>
        </div>
      )}

      {/* Impact Statistics */}
      <div className="mt-16 bg-gradient-to-r from-green-600 to-green-800 text-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-8 text-center">Nosso Impacto Coletivo</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">15+</div>
            <div className="text-green-100">Projetos Ativos</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">2,500+</div>
            <div className="text-green-100">Voluntários</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">50k+</div>
            <div className="text-green-100">Árvores Plantadas</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">R$ 500k+</div>
            <div className="text-green-100">Arrecadado</div>
          </div>
        </div>
      </div>

      {/* Partner Organizations */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6 text-center">Organizações Parceiras</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {["Instituto Verde Vida", "Oceano Limpo", "EduVerde", "Águas Vivas"].map((org, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Briefcase className="w-8 h-8 text-green-700" />
              </div>
              <h3 className="font-semibold text-sm">{org}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
