import { useState, useEffect } from "react";
import { BookOpen, Clock, Award, Play, Filter } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { projectId, publicAnonKey } from "/utils/supabase/info";

export function CoursesPage() {
  const { accessToken } = useAuth();
  const [courses, setCourses] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");

  const categories = [
    { id: "all", name: "Todos" },
    { id: "energy", name: "Energia Limpa" },
    { id: "recycling", name: "Reciclagem" },
    { id: "consumption", name: "Consumo Consciente" },
    { id: "biodiversity", name: "Biodiversidade" }
  ];

  const levels = [
    { id: "all", name: "Todos os Níveis" },
    { id: "beginner", name: "Iniciante" },
    { id: "intermediate", name: "Intermediário" },
    { id: "advanced", name: "Avançado" }
  ];

  const sampleCourses = [
    {
      id: "1",
      title: "Introdução à Energia Solar",
      description: "Aprenda os fundamentos da energia solar e como implementar em sua casa",
      category: "energy",
      level: "beginner",
      duration: "4 horas",
      lessons: 12,
      students: 245,
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=300&fit=crop"
    },
    {
      id: "2",
      title: "Reciclagem Avançada",
      description: "Técnicas avançadas de separação e transformação de resíduos",
      category: "recycling",
      level: "advanced",
      duration: "6 horas",
      lessons: 18,
      students: 189,
      image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=300&fit=crop"
    },
    {
      id: "3",
      title: "Consumo Consciente no Dia a Dia",
      description: "Práticas diárias para reduzir seu impacto ambiental",
      category: "consumption",
      level: "beginner",
      duration: "3 horas",
      lessons: 10,
      students: 432,
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=300&fit=crop"
    },
    {
      id: "4",
      title: "Preservação da Biodiversidade",
      description: "Entenda a importância da biodiversidade e como preservá-la",
      category: "biodiversity",
      level: "intermediate",
      duration: "5 horas",
      lessons: 15,
      students: 312,
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop"
    },
    {
      id: "5",
      title: "Energia Eólica: Do Básico ao Avançado",
      description: "Compreenda o funcionamento e aplicações da energia eólica",
      category: "energy",
      level: "intermediate",
      duration: "7 horas",
      lessons: 20,
      students: 198,
      image: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=400&h=300&fit=crop"
    },
    {
      id: "6",
      title: "Compostagem Doméstica",
      description: "Aprenda a transformar resíduos orgânicos em adubo de qualidade",
      category: "recycling",
      level: "beginner",
      duration: "2 horas",
      lessons: 8,
      students: 567,
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop"
    }
  ];

  useEffect(() => {
    setCourses(sampleCourses);
  }, []);

  const filteredCourses = courses.filter(course => {
    if (selectedCategory !== "all" && course.category !== selectedCategory) return false;
    if (selectedLevel !== "all" && course.level !== selectedLevel) return false;
    return true;
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case "beginner": return "bg-green-100 text-green-700";
      case "intermediate": return "bg-yellow-100 text-yellow-700";
      case "advanced": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getLevelLabel = (level: string) => {
    switch (level) {
      case "beginner": return "Iniciante";
      case "intermediate": return "Intermediário";
      case "advanced": return "Avançado";
      default: return level;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Cursos Online</h1>
        <p className="text-lg text-gray-600">
          Aprenda sobre sustentabilidade com nossos cursos completos e certificados
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center mb-4">
          <Filter className="w-5 h-5 text-gray-600 mr-2" />
          <h2 className="text-lg font-semibold">Filtros</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Categoria
            </label>
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nível
            </label>
            <div className="flex flex-wrap gap-2">
              {levels.map(level => (
                <button
                  key={level.id}
                  onClick={() => setSelectedLevel(level.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedLevel === level.id
                      ? "bg-green-700 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {level.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map(course => (
          <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
            <div className="relative">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${getLevelColor(course.level)}`}>
                {getLevelLabel(course.level)}
              </span>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{course.description}</p>

              <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {course.duration}
                </div>
                <div className="flex items-center">
                  <BookOpen className="w-4 h-4 mr-1" />
                  {course.lessons} aulas
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">{course.students} alunos</span>
                <button className="flex items-center bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
                  <Play className="w-4 h-4 mr-1" />
                  Iniciar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Nenhum curso encontrado com os filtros selecionados</p>
        </div>
      )}

      {/* Learning Paths */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold mb-8">Trilhas de Aprendizado</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-8 rounded-lg">
            <Award className="w-12 h-12 mb-4" />
            <h3 className="text-2xl font-bold mb-2">Especialista em Energia</h3>
            <p className="mb-4">Complete 5 cursos de energia renovável e torne-se um especialista</p>
            <button className="bg-white text-blue-700 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              Ver Trilha
            </button>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-green-700 text-white p-8 rounded-lg">
            <Award className="w-12 h-12 mb-4" />
            <h3 className="text-2xl font-bold mb-2">Mestre em Sustentabilidade</h3>
            <p className="mb-4">Trilha completa cobrindo todos os aspectos da sustentabilidade</p>
            <button className="bg-white text-green-700 px-6 py-2 rounded-lg font-semibold hover:bg-green-50 transition-colors">
              Ver Trilha
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
