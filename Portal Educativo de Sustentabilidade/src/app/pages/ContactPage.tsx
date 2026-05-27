import { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageCircle, HelpCircle } from "lucide-react";

export function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const faqs = [
    {
      question: "Como faço para me cadastrar no portal?",
      answer: "Clique no botão 'Cadastrar' no topo da página e preencha o formulário com seus dados. Você receberá um email de confirmação."
    },
    {
      question: "Os cursos são gratuitos?",
      answer: "Sim! Todos os nossos cursos são totalmente gratuitos e acessíveis para qualquer pessoa interessada em aprender sobre sustentabilidade."
    },
    {
      question: "Como funciona o sistema de pontos?",
      answer: "Você ganha pontos ao completar cursos, participar do fórum, aceitar desafios e contribuir com a comunidade. Os pontos podem ser trocados por certificados e outros benefícios."
    },
    {
      question: "Posso contribuir com meu próprio conteúdo?",
      answer: "Sim! Usuários podem sugerir conteúdo através da área administrativa. Todo conteúdo passa por revisão antes de ser publicado."
    },
    {
      question: "Como posso me voluntariar em projetos?",
      answer: "Acesse a página de Projetos e escolha o projeto que mais te interessa. Clique em 'Voluntariar' e preencha o formulário de interesse."
    },
    {
      question: "Recebo certificado ao completar os cursos?",
      answer: "Sim! Ao completar um curso, você pode emitir um certificado digital de conclusão diretamente na plataforma."
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Contato e Suporte</h1>
        <p className="text-lg text-gray-600">
          Entre em contato conosco ou consulte nossas perguntas frequentes
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold mb-6">Envie sua Mensagem</h2>

            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8 text-green-700" />
                </div>
                <h3 className="text-xl font-semibold text-green-900 mb-2">
                  Mensagem Enviada!
                </h3>
                <p className="text-green-700">
                  Obrigado pelo contato. Responderemos em breve!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Seu nome"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="seu@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assunto
                  </label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Assunto da mensagem"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mensagem
                  </label>
                  <textarea
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Escreva sua mensagem aqui..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Enviar Mensagem
                </button>
              </form>
            )}
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-lg shadow-md p-8 mt-8">
            <div className="flex items-center mb-6">
              <HelpCircle className="w-6 h-6 text-green-700 mr-2" />
              <h2 className="text-2xl font-semibold">Perguntas Frequentes</h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <details key={index} className="border border-gray-200 rounded-lg p-4 hover:border-green-500 transition-colors">
                  <summary className="font-semibold cursor-pointer text-gray-900 hover:text-green-700">
                    {faq.question}
                  </summary>
                  <p className="mt-3 text-gray-600 pl-4">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Info Sidebar */}
        <div className="space-y-6">
          {/* Contact Cards */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Informações de Contato</h3>

            <div className="space-y-4">
              <div className="flex items-start">
                <Mail className="w-5 h-5 text-green-700 mr-3 mt-1" />
                <div>
                  <p className="font-medium">Email</p>
                  <a href="mailto:contato@ecoeducacao.com" className="text-green-700 hover:text-green-600">
                    contato@ecoeducacao.com
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="w-5 h-5 text-green-700 mr-3 mt-1" />
                <div>
                  <p className="font-medium">Telefone</p>
                  <a href="tel:+551112345678" className="text-green-700 hover:text-green-600">
                    (11) 1234-5678
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-green-700 mr-3 mt-1" />
                <div>
                  <p className="font-medium">Endereço</p>
                  <p className="text-gray-600">
                    Av. Sustentável, 123<br />
                    São Paulo, SP - 01234-567
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Support Hours */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 text-green-900">Horário de Atendimento</h3>
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex justify-between">
                <span>Segunda a Sexta</span>
                <span className="font-semibold">9h - 18h</span>
              </div>
              <div className="flex justify-between">
                <span>Sábado</span>
                <span className="font-semibold">9h - 13h</span>
              </div>
              <div className="flex justify-between">
                <span>Domingo</span>
                <span className="font-semibold">Fechado</span>
              </div>
            </div>
          </div>

          {/* Live Chat */}
          <div className="bg-gradient-to-r from-green-500 to-green-700 text-white rounded-lg shadow-md p-6">
            <MessageCircle className="w-12 h-12 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Suporte Online</h3>
            <p className="text-green-100 mb-4 text-sm">
              Precisa de ajuda imediata? Fale com nosso chatbot
            </p>
            <button className="w-full bg-white text-green-700 px-4 py-2 rounded-lg hover:bg-green-50 transition-colors font-semibold">
              Iniciar Chat
            </button>
          </div>

          {/* Social Media */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Siga-nos</h3>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors">
                f
              </a>
              <a href="#" className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center text-white hover:bg-pink-700 transition-colors">
                IG
              </a>
              <a href="#" className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center text-white hover:bg-blue-500 transition-colors">
                T
              </a>
              <a href="#" className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white hover:bg-green-700 transition-colors">
                W
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
