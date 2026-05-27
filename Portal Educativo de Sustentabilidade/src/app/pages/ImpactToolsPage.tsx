import { useState, useEffect } from "react";
import { Calculator, TrendingDown, Target, Award, BarChart3 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { projectId, publicAnonKey } from "/utils/supabase/info";

export function ImpactToolsPage() {
  const { user, accessToken } = useAuth();
  const [carKm, setCarKm] = useState("");
  const [electricityKwh, setElectricityKwh] = useState("");
  const [meatMeals, setMeatMeals] = useState("");
  const [result, setResult] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const challenges = [
    {
      id: "1",
      title: "Semana Sem Carro",
      description: "Use transporte público ou bicicleta por uma semana",
      points: 50,
      icon: "🚴"
    },
    {
      id: "2",
      title: "Desafio Zero Plástico",
      description: "Evite produtos com embalagem plástica por 7 dias",
      points: 40,
      icon: "♻️"
    },
    {
      id: "3",
      title: "Segunda Sem Carne",
      description: "Adote uma alimentação vegetariana às segundas-feiras",
      points: 30,
      icon: "🥗"
    },
    {
      id: "4",
      title: "Economia de Energia",
      description: "Reduza o consumo de energia em 20% este mês",
      points: 60,
      icon: "💡"
    }
  ];

  useEffect(() => {
    if (user && accessToken) {
      loadHistory();
    }
  }, [user, accessToken]);

  const loadHistory = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-84c7c45b/carbon/history`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
      const data = await response.json();
      setHistory(data.history || []);
    } catch (error) {
      console.error('Error loading history:', error);
    }
  };

  const handleCalculate = async () => {
    if (!user || !accessToken) {
      alert('Você precisa estar logado para usar a calculadora');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-84c7c45b/carbon/calculate`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
          },
          body: JSON.stringify({
            carKm: parseFloat(carKm) || 0,
            electricityKwh: parseFloat(electricityKwh) || 0,
            meatMeals: parseFloat(meatMeals) || 0
          })
        }
      );

      const data = await response.json();
      setResult(data.calculation);
      loadHistory();
    } catch (error) {
      console.error('Error calculating carbon:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSuggestions = (total: number) => {
    if (total < 2) {
      return {
        level: "Excelente!",
        color: "text-green-700",
        suggestions: [
          "Continue com suas práticas sustentáveis",
          "Compartilhe suas dicas na comunidade",
          "Considere participar de projetos ambientais"
        ]
      };
    } else if (total < 5) {
      return {
        level: "Bom trabalho!",
        color: "text-blue-700",
        suggestions: [
          "Considere usar mais transporte público",
          "Invista em energia renovável",
          "Reduza o consumo de carne gradualmente"
        ]
      };
    } else {
      return {
        level: "Há espaço para melhorias",
        color: "text-orange-700",
        suggestions: [
          "Reduza o uso do carro sempre que possível",
          "Economize energia em casa",
          "Adote uma dieta mais baseada em plantas",
          "Participe de nossos cursos sobre sustentabilidade"
        ]
      };
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Ferramentas de Impacto Pessoal</h1>
        <p className="text-lg text-gray-600">
          Calcule sua pegada de carbono e acompanhe seu progresso rumo a um estilo de vida sustentável
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calculator */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex items-center mb-6">
              <Calculator className="w-6 h-6 text-green-700 mr-2" />
              <h2 className="text-2xl font-semibold">Calculadora de Pegada de Carbono</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quilômetros percorridos de carro por mês
                </label>
                <input
                  type="number"
                  value={carKm}
                  onChange={(e) => setCarKm(e.target.value)}
                  placeholder="Ex: 500"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Consumo de eletricidade (kWh) por mês
                </label>
                <input
                  type="number"
                  value={electricityKwh}
                  onChange={(e) => setElectricityKwh(e.target.value)}
                  placeholder="Ex: 300"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Refeições com carne por semana
                </label>
                <input
                  type="number"
                  value={meatMeals}
                  onChange={(e) => setMeatMeals(e.target.value)}
                  placeholder="Ex: 10"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <button
                onClick={handleCalculate}
                disabled={loading}
                className="w-full bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
              >
                {loading ? "Calculando..." : "Calcular Pegada"}
              </button>
            </div>
          </div>

          {/* Results */}
          {result && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h3 className="text-xl font-semibold mb-4">Resultado</h3>

              <div className="bg-gradient-to-r from-green-500 to-green-700 text-white rounded-lg p-6 mb-6">
                <div className="text-center">
                  <div className="text-5xl font-bold mb-2">{result.total.toFixed(2)}</div>
                  <div className="text-lg">toneladas de CO₂ por ano</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-700">
                    {result.breakdown.transportation.toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-600">Transporte</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-700">
                    {result.breakdown.energy.toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-600">Energia</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-700">
                    {result.breakdown.food.toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-600">Alimentação</div>
                </div>
              </div>

              {(() => {
                const suggestions = getSuggestions(result.total);
                return (
                  <div>
                    <h4 className={`text-lg font-semibold mb-3 ${suggestions.color}`}>
                      {suggestions.level}
                    </h4>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="font-medium mb-2">Sugestões de melhoria:</p>
                      <ul className="space-y-2">
                        {suggestions.suggestions.map((suggestion, index) => (
                          <li key={index} className="flex items-start">
                            <TrendingDown className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{suggestion}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* History Chart */}
          {history.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <BarChart3 className="w-6 h-6 text-green-700 mr-2" />
                <h3 className="text-xl font-semibold">Histórico</h3>
              </div>
              <div className="space-y-3">
                {history.slice(0, 5).map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">
                      {new Date(item.calculatedAt).toLocaleDateString('pt-BR')}
                    </span>
                    <span className="font-semibold text-green-700">
                      {item.total.toFixed(2)} t CO₂
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Weekly Challenges */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <Target className="w-6 h-6 text-green-700 mr-2" />
              <h3 className="text-lg font-semibold">Desafios Semanais</h3>
            </div>
            <div className="space-y-4">
              {challenges.map(challenge => (
                <div key={challenge.id} className="border border-gray-200 rounded-lg p-4 hover:border-green-500 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-2xl">{challenge.icon}</span>
                    <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full">
                      +{challenge.points} pts
                    </span>
                  </div>
                  <h4 className="font-semibold mb-1">{challenge.title}</h4>
                  <p className="text-sm text-gray-600 mb-3">{challenge.description}</p>
                  <button className="w-full bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm">
                    Aceitar Desafio
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Impact Stats */}
          <div className="bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-lg shadow-md p-6">
            <Award className="w-12 h-12 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Seu Impacto</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Desafios completados</span>
                <span className="font-bold">8</span>
              </div>
              <div className="flex justify-between">
                <span>CO₂ economizado</span>
                <span className="font-bold">245 kg</span>
              </div>
              <div className="flex justify-between">
                <span>Árvores equivalentes</span>
                <span className="font-bold">12</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
