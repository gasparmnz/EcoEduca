import { useState, useEffect } from "react";
import { User, Award, BookOpen, TrendingUp, Settings, LogOut, Edit2, Check } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";

export function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [editingName, setEditingName] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [tempName, setTempName] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    const name = (user as any).user_metadata?.name || user.email || "";
    setDisplayName(name);
    setTempName(name);
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleSaveName = () => {
    if (tempName.trim()) {
      setDisplayName(tempName.trim());
      const stored = localStorage.getItem('eco_user');
      if (stored) {
        const userData = JSON.parse(stored);
        userData.user_metadata = { ...userData.user_metadata, name: tempName.trim() };
        localStorage.setItem('eco_user', JSON.stringify(userData));
      }
    }
    setEditingName(false);
  };

  const carbonHistory: { date: string; total: number }[] = JSON.parse(
    localStorage.getItem('eco_carbon_history') || '[]'
  );

  const accounts: any[] = JSON.parse(localStorage.getItem('eco_accounts') || '[]');
  const account = accounts.find(a => a.email === user?.email);
  const joinDate = account?.id?.replace('user_', '') || Date.now().toString();

  if (!user) return null;

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

              {editingName ? (
                <div className="flex items-center gap-2 mb-1 w-full justify-center">
                  <input
                    type="text"
                    value={tempName}
                    onChange={e => setTempName(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-1 text-center focus:outline-none focus:ring-2 focus:ring-green-500 text-lg font-semibold w-full max-w-xs"
                    onKeyDown={e => e.key === 'Enter' && handleSaveName()}
                    autoFocus
                  />
                  <button onClick={handleSaveName} className="text-green-700 hover:text-green-800">
                    <Check className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-2xl font-semibold">{displayName}</h2>
                  <button
                    onClick={() => { setTempName(displayName); setEditingName(true); }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>
              )}

              <p className="text-gray-600 mb-4">{user.email}</p>

              <div className="w-full border-t pt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Cálculos Realizados</span>
                  <span className="text-xl font-semibold">{carbonHistory.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Membro desde</span>
                  <span className="text-sm font-semibold">
                    {new Date(parseInt(joinDate)).toLocaleDateString('pt-BR')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Settings className="w-5 h-5 mr-2" />
              Configurações
            </h3>
            <button
              onClick={() => { setTempName(displayName); setEditingName(true); }}
              className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors"
            >
              Editar Nome
            </button>
            <button className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors text-gray-400 cursor-default">
              Notificações (em breve)
            </button>
            <button className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors text-gray-400 cursor-default">
              Privacidade (em breve)
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
              <div className={`text-center p-4 rounded-lg ${carbonHistory.length > 0 ? "bg-green-50" : "bg-gray-50 opacity-50"}`}>
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2 ${carbonHistory.length > 0 ? "bg-green-100" : "bg-gray-100"}`}>
                  <BookOpen className={`w-8 h-8 ${carbonHistory.length > 0 ? "text-green-500" : "text-gray-400"}`} />
                </div>
                <p className="text-xs font-semibold text-gray-700">1º Cálculo</p>
              </div>
              <div className={`text-center p-4 rounded-lg ${carbonHistory.length >= 5 ? "bg-blue-50" : "bg-gray-50 opacity-50"}`}>
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2 ${carbonHistory.length >= 5 ? "bg-blue-100" : "bg-gray-100"}`}>
                  <Award className={`w-8 h-8 ${carbonHistory.length >= 5 ? "text-blue-500" : "text-gray-400"}`} />
                </div>
                <p className="text-xs font-semibold text-gray-700">5 Cálculos</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg opacity-50">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <TrendingUp className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-xs font-semibold text-gray-700">10 Desafios</p>
              </div>
            </div>
          </div>

          {/* Carbon History */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <TrendingUp className="w-6 h-6 mr-2 text-green-700" />
              Histórico de Pegada de Carbono
            </h3>

            {carbonHistory.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">Você ainda não calculou sua pegada de carbono</p>
                <button
                  onClick={() => navigate("/impact")}
                  className="bg-green-700 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
                >
                  Calcular Agora
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {carbonHistory.slice(0, 5).map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">
                      {new Date(item.date).toLocaleDateString('pt-BR')}
                    </span>
                    <div className="flex items-center">
                      <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: `${Math.min((item.total / 10) * 100, 100)}%` }}
                        />
                      </div>
                      <span className="font-semibold text-green-700 text-sm">
                        {item.total.toFixed(2)} t CO₂/ano
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Impact Summary */}
          <div className="bg-gradient-to-r from-green-500 to-green-700 text-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Seu Impacto Ambiental</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <div className="text-3xl font-bold">{carbonHistory.length}</div>
                <div className="text-sm text-green-100">Cálculos Realizados</div>
              </div>
              <div>
                <div className="text-3xl font-bold">
                  {carbonHistory.length > 0
                    ? carbonHistory[carbonHistory.length - 1].total.toFixed(1)
                    : "0"}
                </div>
                <div className="text-sm text-green-100">t CO₂ (1º cálculo)</div>
              </div>
              <div>
                <div className="text-3xl font-bold">
                  {carbonHistory.length > 1
                    ? Math.max(0, carbonHistory[carbonHistory.length - 1].total - carbonHistory[0].total).toFixed(1)
                    : "0"}
                </div>
                <div className="text-sm text-green-100">t CO₂ Economizadas</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
