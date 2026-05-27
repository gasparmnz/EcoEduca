import { Outlet, Link, useLocation } from "react-router";
import {
  Home, BookOpen, Library, Users, TrendingUp,
  Briefcase, User, Settings, Mail, Menu, X,
  Leaf
} from "lucide-react";
import { useState } from "react";

export function Layout() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Início", path: "/", icon: Home },
    { name: "Cursos", path: "/courses", icon: BookOpen },
    { name: "Biblioteca", path: "/library", icon: Library },
    { name: "Comunidade", path: "/community", icon: Users },
    { name: "Impacto Pessoal", path: "/impact", icon: TrendingUp },
    { name: "Projetos", path: "/projects", icon: Briefcase },
  ];

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-green-700 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <Leaf className="w-8 h-8" />
              <span className="text-xl font-bold">EcoEducação</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-1">
              {navigation.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? "bg-green-800 text-white"
                      : "text-green-100 hover:bg-green-600"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>

            {/* User Menu */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/profile"
                className="flex items-center space-x-1 text-green-100 hover:text-white transition-colors"
              >
                <User className="w-5 h-5" />
              </Link>
              <Link
                to="/admin"
                className="flex items-center space-x-1 text-green-100 hover:text-white transition-colors"
              >
                <Settings className="w-5 h-5" />
              </Link>
              <Link
                to="/contact"
                className="flex items-center space-x-1 text-green-100 hover:text-white transition-colors"
              >
                <Mail className="w-5 h-5" />
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-green-100 hover:text-white hover:bg-green-600"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-green-600">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium ${
                    isActive(item.path)
                      ? "bg-green-800 text-white"
                      : "text-green-100 hover:bg-green-600"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              ))}
              <div className="border-t border-green-600 my-2"></div>
              <Link
                to="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-green-100 hover:bg-green-600"
              >
                <User className="w-5 h-5" />
                <span>Perfil</span>
              </Link>
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-green-100 hover:bg-green-600"
              >
                <Settings className="w-5 h-5" />
                <span>Admin</span>
              </Link>
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-green-100 hover:bg-green-600"
              >
                <Mail className="w-5 h-5" />
                <span>Contato</span>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Sobre EcoEducação</h3>
              <p className="text-gray-300 text-sm">
                Portal dedicado à educação ambiental e práticas sustentáveis,
                promovendo um futuro mais verde e consciente.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><Link to="/courses" className="hover:text-white">Cursos</Link></li>
                <li><Link to="/library" className="hover:text-white">Biblioteca</Link></li>
                <li><Link to="/community" className="hover:text-white">Comunidade</Link></li>
                <li><Link to="/contact" className="hover:text-white">Contato</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contato</h3>
              <p className="text-gray-300 text-sm">
                Email: contato@ecoeducacao.com<br />
                Telefone: (11) 1234-5678
              </p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            © 2026 EcoEducação. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
