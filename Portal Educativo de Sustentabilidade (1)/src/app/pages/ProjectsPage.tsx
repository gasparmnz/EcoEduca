import { useState, useEffect } from "react";
import { Briefcase, Users, DollarSign, MapPin, Heart, Filter, Check, X } from "lucide-react";

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

function VolunteerModal({ project, onClose, onConfirm }: { project: any; onClose: () => void; onConfirm: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [availability, setAvailability] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">Voluntariar-se</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>
        <p className="text-gray-600 mb-4 text-sm">
          Você está se inscrevendo como voluntário em: <strong>{project.title}</strong>
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
            <input
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Seu nome"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="seu@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Disponibilidade</label>
            <select
              required
              value={availability}
              onChange={e => setAvailability(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Selecione...</option>
              <option value="weekends">Fins de semana</option>
              <option value="weekdays">Dias de semana</option>
              <option value="both">Ambos</option>
            </select>
          </div>
          <div className="flex space-x-3 pt-2">
            <button
              type="submit"
              className="flex-1 bg-green-700 text-white py-2 rounded-lg hover:bg-green-600 transition-colors font-semibold"
            >
              Confirmar Inscrição
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function DonateModal({ project, onClose, onConfirm }: { project: any; onClose: () => void; onConfirm: () => void }) {
  const [amount, setAmount] = useState("");
  const presets = ["25", "50", "100", "250"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">Fazer Doação</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>
        <p className="text-gray-600 mb-4 text-sm">
          Projeto: <strong>{project.title}</strong>
        </p>
        <div className="mb-4 p-3 bg-green-50 rounded-lg">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Arrecadado</span>
            <span className="font-semibold">R$ {project.donations.toLocaleString('pt-BR')} / R$ {project.goal.toLocaleString('pt-BR')}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-600 h-2 rounded-full"
              style={{ width: `${Math.min((project.donations / project.goal) * 100, 100)}%` }}
            />
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Valor (R$)</label>
            <div className="grid grid-cols-4 gap-2 mb-2">
              {presets.map(p => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setAmount(p)}
                  className={`py-2 rounded-lg text-sm font-medium border-2 transition-colors ${
                    amount === p ? "border-green-700 bg-green-700 text-white" : "border-gray-200 text-gray-700 hover:border-green-500"
                  }`}
                >
                  R$ {p}
                </button>
              ))}
            </div>
            <input
              type="number"
              min="1"
              required
              value={amount}
              onChange={e => setAmount(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Ou insira outro valor"
            />
          </div>
          <div className="flex space-x-3 pt-2">
            <button
              type="submit"
              className="flex-1 bg-green-700 text-white py-2 rounded-lg hover:bg-green-600 transition-colors font-semibold flex items-center justify-center"
            >
              <Heart className="w-4 h-4 mr-2" />
              Doar R$ {amount || "..."}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function SuccessMessage({ message, onClose }: { message: string; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className="fixed bottom-6 right-6 bg-green-700 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center z-50 animate-fade-in">
      <Check className="w-5 h-5 mr-3 flex-shrink-0" />
      <span>{message}</span>
    </div>
  );
}

export function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [volunteerProject, setVolunteerProject] = useState<any | null>(null);
  const [donateProject, setDonateProject] = useState<any | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [volunteeredIds, setVolunteeredIds] = useState<Set<string>>(new Set());
  const [donatedIds, setDonatedIds] = useState<Set<string>>(new Set());

  const categories = [
    { id: "all", name: "Todos" },
    { id: "reforestation", name: "Reflorestamento" },
    { id: "cleanup", name: "Limpeza" },
    { id: "education", name: "Educação" },
    { id: "conservation", name: "Conservação" }
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

  const handleVolunteerConfirm = () => {
    if (volunteerProject) {
      setVolunteeredIds(prev => new Set([...prev, volunteerProject.id]));
      setVolunteerProject(null);
      setSuccessMessage("Inscrição confirmada! Entraremos em contato em breve.");
    }
  };

  const handleDonateConfirm = () => {
    if (donateProject) {
      setDonatedIds(prev => new Set([...prev, donateProject.id]));
      setDonateProject(null);
      setSuccessMessage("Doação registrada! Obrigado pela sua contribuição.");
    }
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
                    {project.volunteers + (volunteeredIds.has(project.id) ? 1 : 0)} / {project.volunteersNeeded}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${getProgressPercentage(project.volunteers + (volunteeredIds.has(project.id) ? 1 : 0), project.volunteersNeeded)}%` }}
                  />
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
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                {volunteeredIds.has(project.id) ? (
                  <div className="flex-1 bg-blue-50 text-blue-700 border-2 border-blue-200 px-4 py-2 rounded-lg flex items-center justify-center text-sm font-semibold">
                    <Check className="w-4 h-4 mr-2" />
                    Inscrito como Voluntário
                  </div>
                ) : (
                  <button
                    onClick={() => setVolunteerProject(project)}
                    className="flex-1 bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center"
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Voluntariar
                  </button>
                )}

                {donatedIds.has(project.id) ? (
                  <div className="flex-1 bg-green-50 text-green-700 border-2 border-green-200 px-4 py-2 rounded-lg flex items-center justify-center text-sm font-semibold">
                    <Check className="w-4 h-4 mr-2" />
                    Doação Feita
                  </div>
                ) : (
                  <button
                    onClick={() => setDonateProject(project)}
                    className="flex-1 bg-white text-green-700 border-2 border-green-700 px-4 py-2 rounded-lg hover:bg-green-50 transition-colors flex items-center justify-center"
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    Doar
                  </button>
                )}
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

      {/* Modals */}
      {volunteerProject && (
        <VolunteerModal
          project={volunteerProject}
          onClose={() => setVolunteerProject(null)}
          onConfirm={handleVolunteerConfirm}
        />
      )}

      {donateProject && (
        <DonateModal
          project={donateProject}
          onClose={() => setDonateProject(null)}
          onConfirm={handleDonateConfirm}
        />
      )}

      {successMessage && (
        <SuccessMessage message={successMessage} onClose={() => setSuccessMessage(null)} />
      )}
    </div>
  );
}
