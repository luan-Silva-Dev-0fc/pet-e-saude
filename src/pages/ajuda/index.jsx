import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, X, HelpCircle, UserPlus, ShoppingBag, 
  CreditCard, Activity, Truck, MessageSquare, Mail, 
  Send, ChevronRight, HeartPulse
} from "lucide-react";

export default function HelpInterface() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("intro");

  const navItems = [
    { label: "Introdução", href: "#intro", icon: HelpCircle },
    { label: "Cadastro", href: "#cadastro", icon: UserPlus },
    { label: "Produtos", href: "#produtos", icon: ShoppingBag },
    { label: "Pagamento", href: "#pagamento", icon: CreditCard },
    { label: "Saúde", href: "#exames", icon: Activity },
    { label: "Logística", href: "#entrega", icon: Truck },
    { label: "FAQ", href: "#faq", icon: MessageSquare },
    { label: "Contato", href: "#contato", icon: Mail },
  ];

  const handleScroll = (id) => {
    setActiveSection(id.replace("#", ""));
    setMenuOpen(false);
    const element = document.getElementById(id.replace("#", ""));
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#f8faf9] font-sans overflow-hidden">
      {/* HEADER MODERNIZADO */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.href = "/"}>
          <div className="bg-[#26885a] p-1.5 rounded-lg shadow-lg shadow-emerald-100">
            <HeartPulse size={22} className="text-white" />
          </div>
          <span className="text-xl font-black text-gray-800 tracking-tighter uppercase">
            Pet <span className="text-[#26885a]">&</span> Saúde
          </span>
        </div>

        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => handleScroll(item.href)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                activeSection === item.href.replace("#", "")
                  ? "bg-emerald-50 text-[#26885a]"
                  : "text-gray-500 hover:text-[#26885a] hover:bg-gray-50"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button className="lg:hidden p-2 rounded-xl bg-gray-50 text-gray-600" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* MENU MOBILE */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="lg:hidden fixed inset-x-0 top-[73px] bg-white border-b border-gray-100 shadow-xl z-40 p-4 grid grid-cols-2 gap-2"
          >
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleScroll(item.href)}
                className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 text-gray-700 font-semibold text-sm active:bg-emerald-50"
              >
                <item.icon size={18} className="text-[#26885a]" />
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {/* HERO SECTION */}
        <div className="bg-gradient-to-b from-white to-transparent pt-12 pb-8 px-6 text-center">
          <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Central de <span className="text-[#26885a]">Ajuda</span></h1>
          <p className="text-gray-500 max-w-2xl mx-auto font-medium">
            Tudo o que você precisa saber para cuidar melhor do seu pet e aproveitar nossa plataforma.
          </p>
        </div>

        <div className="max-w-4xl mx-auto px-6 pb-20 space-y-12">
          
          <SectionWrapper id="intro" title="Introdução ao Serviço" icon={<HelpCircle className="text-white" />}>
            <p className="text-gray-600 leading-relaxed">
              Pet & Saúde oferece uma plataforma completa para cuidados de saúde e produtos premium. 
              Nosso objetivo é facilitar a vida dos tutores com tecnologia e carinho.
            </p>
          </SectionWrapper>

          <SectionWrapper id="cadastro" title="Cadastro e Login" icon={<UserPlus className="text-white" />}>
            <div className="grid md:grid-cols-2 gap-4">
              <InfoCard title="Novo Registro" content="Acesse a página de cadastro e preencha nome, e-mail e senha." />
              <InfoCard title="Segurança" content="Sua conta é protegida por criptografia de ponta a ponta." />
            </div>
          </SectionWrapper>

          <SectionWrapper id="produtos" title="Produtos e Filtros" icon={<ShoppingBag className="text-white" />}>
            <p className="text-gray-600 leading-relaxed">
              Nossa loja conta com IA para sugerir os melhores alimentos e acessórios baseados na raça e idade do seu pet.
            </p>
          </SectionWrapper>

          <SectionWrapper id="pagamento" title="Pagamento Seguro" icon={<CreditCard className="text-white" />}>
            <div className="flex flex-wrap gap-3">
              {["PIX (Aprovação Instantânea)", "Cartão de Crédito", "Boleto Bancário"].map(p => (
                <span key={p} className="bg-white border border-gray-200 px-4 py-2 rounded-xl text-sm font-bold text-gray-700 shadow-sm">
                  {p}
                </span>
              ))}
            </div>
          </SectionWrapper>

          <SectionWrapper id="exames" title="Exames e Cuidados" icon={<Activity className="text-white" />}>
            <p className="text-gray-600">Agende consultas veterinárias e exames laboratoriais diretamente pelo app com poucos cliques.</p>
          </SectionWrapper>

          <SectionWrapper id="faq" title="Perguntas Frequentes" icon={<MessageSquare className="text-white" />}>
            <div className="space-y-4">
              <FaqItem q="Como alterar meus dados?" a="Vá em Perfil > Editar Dados para atualizar e-mail ou telefone." />
              <FaqItem q="Qual o prazo de entrega?" a="O prazo médio é de 2 a 5 dias úteis, dependendo da sua região." />
            </div>
          </SectionWrapper>

          {/* FORMULÁRIO DE CONTATO MODERNIZADO */}
          <section id="contato" className="bg-white rounded-[2.5rem] shadow-xl shadow-emerald-900/5 p-8 border border-emerald-50">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-[#26885a] p-3 rounded-2xl">
                <Mail className="text-white" />
              </div>
              <h2 className="text-2xl font-black text-gray-800 tracking-tight">Fale Conosco</h2>
            </div>
            
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-4">
                <input type="text" placeholder="Seu nome" className="w-full p-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-[#61a183] outline-none transition-all" />
                <input type="email" placeholder="Seu e-mail" className="w-full p-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-[#61a183] outline-none transition-all" />
              </div>
              <textarea placeholder="Como podemos ajudar?" rows="4" className="w-full p-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-[#61a183] outline-none transition-all resize-none" />
              <button className="w-full md:w-auto px-8 py-4 bg-[#26885a] text-white font-black rounded-2xl shadow-lg shadow-emerald-100 hover:bg-[#1e6b47] transition-all flex items-center justify-center gap-2 active:scale-95">
                <Send size={18} />
                Enviar Mensagem
              </button>
            </form>
          </section>

        </div>
      </div>
    </div>
  );
}

// COMPONENTES AUXILIARES PARA LIMPEZA DE CÓDIGO
function SectionWrapper({ id, title, icon, children }) {
  return (
    <section id={id} className="scroll-mt-24 group">
      <div className="flex items-center gap-4 mb-4">
        <div className="bg-gray-200 group-hover:bg-[#26885a] p-2 rounded-xl transition-colors duration-300">
          {icon}
        </div>
        <h2 className="text-2xl font-black text-gray-800 tracking-tight">{title}</h2>
      </div>
      <div className="ml-12">
        {children}
      </div>
    </section>
  );
}

function InfoCard({ title, content }) {
  return (
    <div className="p-5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
      <h3 className="font-bold text-[#26885a] mb-2">{title}</h3>
      <p className="text-sm text-gray-500 font-medium">{content}</p>
    </div>
  );
}

function FaqItem({ q, a }) {
  return (
    <div className="bg-gray-50 p-4 rounded-2xl border border-transparent hover:border-emerald-100 transition-all">
      <div className="flex items-center gap-2 text-gray-800 font-bold mb-1">
        <ChevronRight size={16} className="text-[#26885a]" />
        <h4>{q}</h4>
      </div>
      <p className="text-sm text-gray-600 ml-6">{a}</p>
    </div>
  );
}