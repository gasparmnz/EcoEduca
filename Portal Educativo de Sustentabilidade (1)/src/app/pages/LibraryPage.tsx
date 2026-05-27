import { useState } from "react";
import { FileText, Download, Search, Filter, BookOpen, Video, FileImage, Check } from "lucide-react";

const types = [
  { id: "all", name: "Todos", icon: BookOpen },
  { id: "guide", name: "Guias", icon: FileText },
  { id: "video", name: "Vídeos", icon: Video },
  { id: "infographic", name: "Infográficos", icon: FileImage }
];

const topics = [
  { id: "all", name: "Todos os Temas" },
  { id: "energy", name: "Energia" },
  { id: "water", name: "Água" },
  { id: "waste", name: "Resíduos" },
  { id: "biodiversity", name: "Biodiversidade" }
];

const resources = [
  { id: "1", title: "Guia Completo de Reciclagem Residencial", description: "Manual prático para implementar a reciclagem em casa", type: "guide", topic: "waste", format: "PDF", size: "2.5 MB", downloads: 1234 },
  { id: "2", title: "Como Economizar Água em Casa", description: "Técnicas eficazes para reduzir o consumo de água", type: "video", topic: "water", format: "MP4", size: "45 MB", downloads: 892 },
  { id: "3", title: "Infográfico: Ciclo da Energia Solar", description: "Visualização do processo de geração de energia solar", type: "infographic", topic: "energy", format: "PNG", size: "1.2 MB", downloads: 2156 },
  { id: "4", title: "Apostila de Compostagem", description: "Aprenda a fazer compostagem de resíduos orgânicos", type: "guide", topic: "waste", format: "PDF", size: "3.8 MB", downloads: 1567 },
  { id: "5", title: "Biodiversidade Brasileira", description: "Documentário sobre a riqueza da fauna e flora nacional", type: "video", topic: "biodiversity", format: "MP4", size: "120 MB", downloads: 678 },
  { id: "6", title: "Energia Eólica: Infográfico Interativo", description: "Como funciona a geração de energia através dos ventos", type: "infographic", topic: "energy", format: "SVG", size: "800 KB", downloads: 1890 }
];

export function LibraryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedTopic, setSelectedTopic] = useState("all");
  const [downloadedIds, setDownloadedIds] = useState<Set<string>>(new Set());
  const [downloadCounts, setDownloadCounts] = useState<Record<string, number>>({});

  const filteredResources = resources.filter(resource => {
    if (selectedType !== "all" && resource.type !== selectedType) return false;
    if (selectedTopic !== "all" && resource.topic !== selectedTopic) return false;
    if (searchQuery && !resource.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !resource.description.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const getTypeIcon = (type: string) => {
    return types.find(t => t.id === type)?.icon || FileText;
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "guide": return "bg-blue-100 text-blue-700";
      case "video": return "bg-purple-100 text-purple-700";
      case "infographic": return "bg-green-100 text-green-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const handleDownload = (id: string) => {
    setDownloadedIds(prev => new Set([...prev, id]));
    setDownloadCounts(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    setTimeout(() => {
      setDownloadedIds(prev => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }, 2500);
  };

  const getResourceCount = (resource: typeof resources[0]) =>
    resource.downloads + (downloadCounts[resource.id] || 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Biblioteca Digital</h1>
        <p className="text-lg text-gray-600">
          Acesse materiais educativos, guias práticos e conteúdo multimídia sobre sustentabilidade
        </p>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar recursos..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center mb-4">
          <Filter className="w-5 h-5 text-gray-600 mr-2" />
          <h2 className="text-lg font-semibold">Filtros</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Recurso</label>
            <div className="flex flex-wrap gap-2">
              {types.map(type => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center ${
                      selectedType === type.id ? "bg-green-700 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-1" />
                    {type.name}
                  </button>
                );
              })}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tema</label>
            <div className="flex flex-wrap gap-2">
              {topics.map(topic => (
                <button
                  key={topic.id}
                  onClick={() => setSelectedTopic(topic.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedTopic === topic.id ? "bg-green-700 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {topic.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map(resource => {
          const Icon = getTypeIcon(resource.type);
          const isDownloading = downloadedIds.has(resource.id);
          return (
            <div key={resource.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg ${getTypeColor(resource.type)} flex items-center justify-center`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-xs text-gray-500">{resource.format}</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">{resource.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{resource.description}</p>
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span>{resource.size}</span>
                <span>{getResourceCount(resource).toLocaleString('pt-BR')} downloads</span>
              </div>
              <button
                onClick={() => handleDownload(resource.id)}
                className={`w-full flex items-center justify-center px-4 py-2 rounded-lg transition-colors font-medium ${
                  isDownloading
                    ? "bg-green-100 text-green-700 border-2 border-green-400"
                    : "bg-green-700 text-white hover:bg-green-600"
                }`}
              >
                {isDownloading ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Baixado com sucesso!
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    Baixar
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Nenhum recurso encontrado</p>
        </div>
      )}

      {/* Popular Resources */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Recursos Mais Baixados</h2>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {[...resources]
            .sort((a, b) => b.downloads - a.downloads)
            .slice(0, 5)
            .map((resource, index) => {
              const Icon = getTypeIcon(resource.type);
              const isDownloading = downloadedIds.has(resource.id);
              return (
                <div key={resource.id} className="flex items-center justify-between p-4 border-b last:border-b-0 hover:bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl font-bold text-gray-400 w-8">{index + 1}</span>
                    <Icon className="w-8 h-8 text-green-700" />
                    <div>
                      <h4 className="font-semibold">{resource.title}</h4>
                      <p className="text-sm text-gray-600">{getResourceCount(resource).toLocaleString('pt-BR')} downloads</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDownload(resource.id)}
                    className={`flex items-center transition-colors ${
                      isDownloading ? "text-green-600" : "text-green-700 hover:text-green-600"
                    }`}
                  >
                    {isDownloading ? <Check className="w-5 h-5" /> : <Download className="w-5 h-5" />}
                  </button>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
