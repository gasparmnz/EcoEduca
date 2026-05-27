import { Link } from "react-router";
import { Home, Search } from "lucide-react";

export function NotFoundPage() {
  return (
    <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-green-700">404</h1>
          <div className="flex items-center justify-center mt-4">
            <Search className="w-16 h-16 text-gray-400" />
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Página Não Encontrada
        </h2>

        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          Desculpe, a página que você está procurando não existe ou foi movida.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors inline-flex items-center justify-center"
          >
            <Home className="w-5 h-5 mr-2" />
            Voltar para Início
          </Link>

          <Link
            to="/courses"
            className="bg-white text-green-700 border-2 border-green-700 px-6 py-3 rounded-lg hover:bg-green-50 transition-colors inline-flex items-center justify-center"
          >
            Ver Cursos
          </Link>
        </div>

        <div className="mt-12">
          <p className="text-sm text-gray-600 mb-4">Você também pode estar procurando por:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Link to="/library" className="text-green-700 hover:underline text-sm">
              Biblioteca
            </Link>
            <span className="text-gray-400">•</span>
            <Link to="/community" className="text-green-700 hover:underline text-sm">
              Comunidade
            </Link>
            <span className="text-gray-400">•</span>
            <Link to="/impact" className="text-green-700 hover:underline text-sm">
              Impacto Pessoal
            </Link>
            <span className="text-gray-400">•</span>
            <Link to="/projects" className="text-green-700 hover:underline text-sm">
              Projetos
            </Link>
            <span className="text-gray-400">•</span>
            <Link to="/contact" className="text-green-700 hover:underline text-sm">
              Contato
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
