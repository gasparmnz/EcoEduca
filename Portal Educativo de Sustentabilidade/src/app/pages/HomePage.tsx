import { Link } from "react-router";
import { BookOpen, Users, TrendingUp, Briefcase, Award, ArrowRight, Leaf } from "lucide-react";

export function HomePage() {
  const highlights = [
    {
      title: "Energia Renovável",
      description: "Aprenda sobre fontes de energia limpa e como implementá-las",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=300&fit=crop",
      category: "Curso em Destaque"
    },
    {
      title: "Reciclagem Inteligente",
      description: "Guia completo sobre separação e destinação correta de resíduos",
      image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=300&fit=crop",
      category: "Novo na Biblioteca"
    },
    {
      title: "Horta Urbana",
      description: "Projeto comunitário para criação de hortas em espaços urbanos",
      image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=300&fit=crop",
      category: "Projeto Ativo"
    }
  ];

  const features = [
    {
      icon: BookOpen,
      title: "Cursos Online",
      description: "Trilhas de aprendizado completas sobre sustentabilidade",
      link: "/courses",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: Users,
      title: "Comunidade",
      description: "Conecte-se com pessoas engajadas em práticas sustentáveis",
      link: "/community",
      color: "bg-purple-100 text-purple-600"
    },
    {
      icon: TrendingUp,
      title: "Impacto Pessoal",
      description: "Calcule e monitore sua pegada de carbono",
      link: "/impact",
      color: "bg-green-100 text-green-600"
    },
    {
      icon: Briefcase,
      title: "Projetos",
      description: "Participe de iniciativas ambientais reais",
      link: "/projects",
      color: "bg-orange-100 text-orange-600"
    }
  ];

  const stats = [
    { value: "1.5k+", label: "Alunos Ativos" },
    { value: "50+", label: "Cursos Disponíveis" },
    { value: "200+", label: "Recursos na Biblioteca" },
    { value: "30+", label: "Projetos em Andamento" }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Leaf className="w-20 h-20" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Portal Educativo de Sustentabilidade
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-green-100 max-w-3xl mx-auto">
              Aprenda, conecte-se e faça a diferença. Junte-se a milhares de pessoas
              comprometidas com um futuro mais sustentável.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-white text-green-700 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors inline-flex items-center justify-center"
              >
                Começar Agora
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                to="/courses"
                className="bg-green-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors border-2 border-white inline-flex items-center justify-center"
              >
                Explorar Cursos
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-green-700 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">O que oferecemos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Link
                key={index}
                to={feature.link}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow"
              >
                <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Destaques</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlights.map((highlight, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                <img
                  src={highlight.image}
                  alt={highlight.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full mb-2">
                    {highlight.category}
                  </span>
                  <h3 className="text-xl font-semibold mb-2">{highlight.title}</h3>
                  <p className="text-gray-600 mb-4">{highlight.description}</p>
                  <button className="text-green-700 font-semibold flex items-center hover:text-green-800">
                    Saiba mais
                    <ArrowRight className="ml-1 w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Award className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">
            Pronto para fazer a diferença?
          </h2>
          <p className="text-xl mb-8 text-green-100 max-w-2xl mx-auto">
            Cadastre-se agora e comece sua jornada rumo a um estilo de vida mais sustentável
          </p>
          <Link
            to="/register"
            className="bg-white text-green-700 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors inline-flex items-center"
          >
            Criar Conta Gratuita
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
