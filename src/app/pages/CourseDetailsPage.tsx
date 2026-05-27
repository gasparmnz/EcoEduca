import { useState } from "react";
import { useParams, Link } from "react-router";
import { BookOpen, Clock, Award, Play, Check, ChevronLeft, ChevronRight, Lock } from "lucide-react";
import { sampleCourses } from "./CoursesPage";

type Lesson = {
  id: string;
  title: string;
  duration: string;
  description: string;
};

const courseLessons: Record<string, Lesson[]> = {
  "1": [
    { id: "1-1", title: "Introdução à Energia Solar", duration: "10 min", description: "Conceitos básicos sobre energia solar fotovoltaica e sua importância para um futuro sustentável." },
    { id: "1-2", title: "Como Funciona um Painel Solar", duration: "15 min", description: "Entenda o funcionamento dos painéis fotovoltaicos e como convertem luz em eletricidade." },
    { id: "1-3", title: "Tipos de Painéis Solares", duration: "12 min", description: "Diferenças entre painéis monocristalinos, policristalinos e de filme fino." },
    { id: "1-4", title: "Sistemas de Energia Solar", duration: "18 min", description: "Comparação entre sistemas on-grid, off-grid e híbridos." },
    { id: "1-5", title: "Instalação Residencial", duration: "20 min", description: "Passo a passo para instalar painéis solares em residências." },
    { id: "1-6", title: "Cálculo de Retorno do Investimento", duration: "14 min", description: "Como calcular em quanto tempo o investimento se paga." },
    { id: "1-7", title: "Manutenção e Cuidados", duration: "10 min", description: "Boas práticas para manter seu sistema solar funcionando bem." },
    { id: "1-8", title: "Legislação e Incentivos", duration: "16 min", description: "Conheça as leis e incentivos governamentais para energia solar." },
    { id: "1-9", title: "Casos de Sucesso", duration: "12 min", description: "Exemplos reais de famílias e empresas que adotaram energia solar." },
    { id: "1-10", title: "Tendências e Futuro", duration: "11 min", description: "Para onde caminha a tecnologia de energia solar no Brasil e no mundo." },
    { id: "1-11", title: "Projeto Prático", duration: "22 min", description: "Desenvolva um projeto completo de instalação solar residencial." },
    { id: "1-12", title: "Conclusão e Certificado", duration: "8 min", description: "Revisão geral e emissão do certificado de conclusão." }
  ],
  "2": [
    { id: "2-1", title: "O Problema do Lixo no Brasil", duration: "12 min", description: "Dados sobre a geração de resíduos e os desafios da reciclagem no país." },
    { id: "2-2", title: "Tipos de Resíduos", duration: "14 min", description: "Classificação e características de cada tipo de resíduo sólido." },
    { id: "2-3", title: "Coleta Seletiva Avançada", duration: "18 min", description: "Técnicas avançadas para separação eficiente de materiais." },
    { id: "2-4", title: "Processo Industrial de Reciclagem", duration: "20 min", description: "Como os materiais são transformados nas usinas de reciclagem." },
    { id: "2-5", title: "Plásticos: Identificação e Destino", duration: "16 min", description: "Os 7 tipos de plástico e como cada um é reciclado." },
    { id: "2-6", title: "Reciclagem de Eletrônicos", duration: "15 min", description: "O descarte correto de resíduos eletroeletrônicos (e-waste)." },
    { id: "2-7", title: "Economia Circular", duration: "18 min", description: "O modelo de economia circular e como ele reduz o desperdício." },
    { id: "2-8", title: "Upcycling e Reutilização", duration: "14 min", description: "Transformar resíduos em produtos de maior valor agregado." },
    { id: "2-9", title: "Empreendedorismo Verde", duration: "16 min", description: "Oportunidades de negócios na área de reciclagem." },
    { id: "2-10", title: "Legislação Ambiental", duration: "12 min", description: "Política Nacional de Resíduos Sólidos e suas implicações." },
    { id: "2-11", title: "Projeto: Programa de Reciclagem", duration: "24 min", description: "Crie um programa de reciclagem para sua escola ou empresa." },
    { id: "2-12", title: "Avaliação e Certificado", duration: "10 min", description: "Prova final e emissão do certificado." }
  ]
};

function getDefaultLessons(courseId: string, lessonCount: number): Lesson[] {
  return Array.from({ length: lessonCount }, (_, i) => ({
    id: `${courseId}-${i + 1}`,
    title: `Aula ${i + 1}`,
    duration: `${10 + (i % 5) * 3} min`,
    description: `Conteúdo da aula ${i + 1} do curso.`
  }));
}

export function CourseDetailsPage() {
  const params = useParams();
  const id = params.id || "";
  const course = sampleCourses.find(c => c.id === id);
  const [started, setStarted] = useState(false);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());

  if (!course) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-4">Curso não encontrado</h2>
        <p className="text-gray-600">O curso solicitado não foi encontrado.</p>
        <Link to="/courses" className="mt-6 inline-block text-green-700 font-semibold hover:underline">
          Voltar aos cursos
        </Link>
      </div>
    );
  }

  const lessons = courseLessons[id] || getDefaultLessons(id, course.lessons);
  const currentLesson = lessons[currentLessonIndex];
  const progress = (completedLessons.size / lessons.length) * 100;

  const handleCompleteLesson = () => {
    setCompletedLessons(prev => new Set([...prev, currentLesson.id]));
    if (currentLessonIndex < lessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
    }
  };

  if (started) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <button
              onClick={() => setStarted(false)}
              className="text-green-700 hover:text-green-800 font-semibold flex items-center mb-1"
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              Voltar ao curso
            </button>
            <h1 className="text-2xl font-bold text-gray-900">{course.title}</h1>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600 mb-1">Progresso: {Math.round(progress)}%</div>
            <div className="w-48 bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Video Player */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900 rounded-xl overflow-hidden mb-4" style={{ aspectRatio: "16/9" }}>
              <div className="w-full h-full flex flex-col items-center justify-center text-white p-8 text-center">
                <Play className="w-20 h-20 mb-4 text-green-400" />
                <h2 className="text-xl font-bold mb-2">{currentLesson.title}</h2>
                <p className="text-gray-300 text-sm max-w-md">{currentLesson.description}</p>
                <div className="mt-4 flex items-center text-gray-400 text-sm">
                  <Clock className="w-4 h-4 mr-1" />
                  {currentLesson.duration}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold mb-2">{currentLesson.title}</h2>
              <p className="text-gray-600 mb-6">{currentLesson.description}</p>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => currentLessonIndex > 0 && setCurrentLessonIndex(currentLessonIndex - 1)}
                  disabled={currentLessonIndex === 0}
                  className="flex items-center px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-green-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 mr-1" />
                  Anterior
                </button>

                {completedLessons.has(currentLesson.id) ? (
                  <div className="flex-1 flex items-center justify-center bg-green-50 text-green-700 border-2 border-green-300 py-2 rounded-lg font-semibold">
                    <Check className="w-5 h-5 mr-2" />
                    Aula concluída
                  </div>
                ) : (
                  <button
                    onClick={handleCompleteLesson}
                    className="flex-1 flex items-center justify-center bg-green-700 text-white py-2 rounded-lg hover:bg-green-600 transition-colors font-semibold"
                  >
                    <Check className="w-5 h-5 mr-2" />
                    Concluir e Avançar
                  </button>
                )}

                <button
                  onClick={() => currentLessonIndex < lessons.length - 1 && setCurrentLessonIndex(currentLessonIndex + 1)}
                  disabled={currentLessonIndex === lessons.length - 1}
                  className="flex items-center px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-green-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Próxima
                  <ChevronRight className="w-5 h-5 ml-1" />
                </button>
              </div>
            </div>
          </div>

          {/* Lesson List */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-4 border-b bg-gray-50">
              <h3 className="font-bold text-gray-800">Conteúdo do Curso</h3>
              <p className="text-sm text-gray-500">{completedLessons.size}/{lessons.length} aulas concluídas</p>
            </div>
            <div className="overflow-y-auto max-h-[500px]">
              {lessons.map((lesson, index) => {
                const isCompleted = completedLessons.has(lesson.id);
                const isCurrent = index === currentLessonIndex;
                const isLocked = index > completedLessons.size && !isCompleted;

                return (
                  <button
                    key={lesson.id}
                    onClick={() => !isLocked && setCurrentLessonIndex(index)}
                    className={`w-full text-left p-4 border-b flex items-start gap-3 transition-colors ${
                      isCurrent ? "bg-green-50 border-l-4 border-l-green-600" :
                      isLocked ? "opacity-50 cursor-not-allowed" :
                      "hover:bg-gray-50"
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      isCompleted ? "bg-green-600 text-white" :
                      isCurrent ? "bg-green-100 text-green-700 border-2 border-green-600" :
                      isLocked ? "bg-gray-100 text-gray-400" :
                      "bg-gray-100 text-gray-600"
                    }`}>
                      {isCompleted ? <Check className="w-4 h-4" /> :
                       isLocked ? <Lock className="w-3 h-3" /> :
                       <span className="text-xs font-bold">{index + 1}</span>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium truncate ${isCurrent ? "text-green-700" : "text-gray-800"}`}>
                        {lesson.title}
                      </p>
                      <div className="flex items-center text-xs text-gray-500 mt-0.5">
                        <Clock className="w-3 h-3 mr-1" />
                        {lesson.duration}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Completion Banner */}
        {completedLessons.size === lessons.length && (
          <div className="mt-6 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-xl p-8 text-center shadow-lg">
            <Award className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Parabéns! Curso Concluído!</h2>
            <p className="text-green-100 mb-4">Você completou todas as {lessons.length} aulas de "{course.title}"</p>
            <Link
              to="/courses"
              className="inline-block bg-white text-green-700 px-6 py-2 rounded-lg font-semibold hover:bg-green-50 transition-colors"
            >
              Explorar Mais Cursos
            </Link>
          </div>
        )}
      </div>
    );
  }

  // Course Overview
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <img src={course.image} alt={course.title} className="w-full h-64 object-cover" />
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
          <p className="text-gray-600 mb-6">{course.description}</p>

          <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8">
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-2 text-green-700" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-green-700" />
              <span>{course.lessons} aulas</span>
            </div>
            <div className="flex items-center">
              <Award className="w-5 h-5 mr-2 text-green-700" />
              <span>{course.students} alunos</span>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4">O que você vai aprender</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {lessons.slice(0, 6).map(lesson => (
                <div key={lesson.id} className="flex items-start">
                  <Check className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm">{lesson.title}</span>
                </div>
              ))}
              {lessons.length > 6 && (
                <div className="flex items-start text-gray-500 text-sm">
                  <span className="ml-7">... e mais {lessons.length - 6} aulas</span>
                </div>
              )}
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Conteúdo do Curso ({lessons.length} aulas)</h2>
            <div className="space-y-2">
              {lessons.map((lesson, index) => (
                <div key={lesson.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <span className="w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-xs font-bold mr-3">
                      {index + 1}
                    </span>
                    <span className="text-gray-800 text-sm">{lesson.title}</span>
                  </div>
                  <span className="text-gray-500 text-xs flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {lesson.duration}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setStarted(true)}
              className="flex items-center bg-green-700 text-white px-8 py-3 rounded-lg hover:bg-green-600 transition-colors font-semibold text-lg"
            >
              <Play className="w-5 h-5 mr-2" />
              Iniciar Curso
            </button>
            <Link to="/courses" className="text-gray-600 hover:text-gray-800 underline">Voltar aos cursos</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
