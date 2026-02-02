import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  ShieldAlert, 
  MapPin, 
  Phone, 
  User, 
  ClipboardList, 
  Camera, 
  Send,
  Search,
  CheckCircle2,
  AlertTriangle,
  Info
} from "lucide-react";

export default function Denuncia() {
  const [formData, setFormData] = useState({ nome: "", telefone: "", descricao: "", endereco: "" });
  const [denuncias, setDenuncias] = useState([
    { id: 1, nome: "Anônimo", telefone: "(85) 9****-**00", endereco: "Aldeota, Fortaleza", descricao: "Animal abandonado em terreno baldio.", status: "Em análise" }
  ]);
  
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setDenuncias([{ ...formData, id: Date.now(), status: "Recebido" }, ...denuncias]);
    setIsSubmitting(false);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setFormData({ nome: "", telefone: "", descricao: "", endereco: "" });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#f0f4f2] font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* BACKGROUND DECORATIVO CDN */}
      <div 
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/cubes.png')` }}
      />

      {/* HERO SECTION RESPONSIVO */}
      <div className="relative bg-[#1a4d35] pt-20 pb-32 px-6 overflow-hidden">
        {/* Círculos de Gradiente */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[120px] -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-black/20 rounded-full blur-[80px] -ml-24 -mb-24" />

        <motion.div 
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          className="relative z-10 max-w-6xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 bg-emerald-400/10 backdrop-blur-xl border border-emerald-400/20 px-5 py-2 rounded-full mb-8">
            <ShieldAlert size={16} className="text-emerald-400 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-100">Portal de Proteção Animal</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">
            Voz aos que <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-green-500">não podem falar.</span>
          </h1>
          <p className="text-emerald-100/70 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
            Sua denúncia é o primeiro passo para mudar um destino. 
            Ambiente seguro, criptografado e 100% sigiloso.
          </p>
        </motion.div>
      </div>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="max-w-6xl mx-auto px-4 md:px-6 -mt-20 relative z-20 pb-20">
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* COLUNA DO FORMULÁRIO (8 colunas) */}
          <motion.div 
            className="lg:col-span-8 bg-white/80 backdrop-blur-2xl rounded-[3rem] shadow-2xl shadow-emerald-900/10 p-6 md:p-12 border border-white"
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          >
            {success ? (
              <SuccessState />
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <ModernInput label="Seu Nome" icon={<User size={18}/>}>
                    <input value={formData.nome} onChange={e => setFormData({...formData, nome: e.target.value})} placeholder="Ex: João Silva ou Anônimo" className="m-input" />
                  </ModernInput>
                  <ModernInput label="WhatsApp / Telefone" icon={<Phone size={18}/>}>
                    <input value={formData.telefone} onChange={e => setFormData({...formData, telefone: e.target.value})} placeholder="(00) 00000-0000" className="m-input" />
                  </ModernInput>
                </div>

                <ModernInput label="Localização Precisa" icon={<MapPin size={18}/>}>
                  <input value={formData.endereco} onChange={e => setFormData({...formData, endereco: e.target.value})} placeholder="Rua, número, bairro e ponto de referência" className="m-input" />
                </ModernInput>

                <ModernInput label="Relato Detalhado" icon={<ClipboardList size={18}/>}>
                  <textarea value={formData.descricao} onChange={e => setFormData({...formData, descricao: e.target.value})} rows={5} placeholder="O que aconteceu? Quantos animais? Há quanto tempo?" className="m-input resize-none" />
                </ModernInput>

                <div className="flex flex-col md:flex-row gap-4 items-center justify-between p-6 bg-emerald-50/50 rounded-[2rem] border border-emerald-100">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white rounded-2xl text-emerald-600 shadow-sm">
                      <Camera size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-black text-emerald-900">Evidências Visuais</p>
                      <p className="text-xs text-emerald-700/60 font-medium">Fotos ajudam muito na investigação.</p>
                    </div>
                  </div>
                  <button type="button" className="w-full md:w-auto px-6 py-3 bg-white text-emerald-700 font-bold rounded-xl shadow-sm hover:shadow-md transition-all">
                    Selecionar Arquivos
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#26885a] text-white py-6 rounded-[1.5rem] font-black text-xl hover:bg-[#1e6b47] transition-all flex items-center justify-center gap-3 shadow-2xl shadow-emerald-200 disabled:opacity-50 active:scale-[0.98]"
                >
                  {isSubmitting ? <span className="animate-pulse">Enviando...</span> : <>Registrar Denúncia <Send size={22} /></>}
                </button>
              </form>
            )}
          </motion.div>

          {/* SIDEBAR (4 colunas) */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:scale-110 transition-transform">
                <Search size={120} />
              </div>
              <h3 className="text-xl font-black text-gray-800 mb-2 flex items-center gap-2">
                Acompanhamento
              </h3>
              <p className="text-sm text-gray-500 font-medium mb-8">
                Já fez uma denúncia? Verifique o status usando seu telefone.
              </p>
              <button 
                onClick={() => setShowModal(true)}
                className="w-full py-5 bg-gray-900 text-white rounded-2xl font-black hover:bg-black transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
              >
                <Search size={18} /> Ver Meus Protocolos
              </button>
            </div>

            <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-orange-200">
              <div className="bg-white/20 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
                <AlertTriangle size={24} />
              </div>
              <h4 className="text-2xl font-black mb-3 italic tracking-tight">Cuidado Imediato</h4>
              <p className="text-orange-50 font-medium text-sm leading-relaxed mb-6">
                Se o animal corre risco de vida **neste exato momento**, ligue para as autoridades locais imediatamente.
              </p>
              <a href="tel:190" className="block text-center bg-white text-orange-600 py-4 rounded-xl font-black text-2xl shadow-inner">
                190
              </a>
            </div>
          </aside>
        </div>
      </main>

      {/* FOOTER INFORMATIVO */}
      <footer className="max-w-6xl mx-auto px-6 py-10 border-t border-gray-200 text-center">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.3em] flex items-center justify-center gap-4">
          <Info size={14} /> Lei Federal nº 9.605/98 - Art. 32
        </p>
      </footer>

      {/* MODAL COM GLASSMORPHISM */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center z-[100] p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowModal(false)} className="absolute inset-0 bg-[#1a4d35]/60 backdrop-blur-md" />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white w-full max-w-xl rounded-[3rem] shadow-3xl relative z-10 overflow-hidden"
            >
              <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                <h3 className="text-2xl font-black text-gray-800">Protocolos</h3>
                <button onClick={() => setShowModal(false)} className="p-3 bg-gray-100 hover:bg-red-100 hover:text-red-500 rounded-2xl transition-all">
                  <X size={20} />
                </button>
              </div>
              <div className="p-8 max-h-[60vh] overflow-y-auto space-y-4">
                {denuncias.map(d => (
                  <div key={d.id} className="p-6 bg-gray-50 rounded-3xl border border-gray-100 hover:border-emerald-200 transition-all group">
                    <div className="flex justify-between items-center mb-4">
                      <span className="px-3 py-1 bg-emerald-600 text-white text-[10px] font-black rounded-full uppercase">
                        {d.status}
                      </span>
                      <span className="text-[10px] font-bold text-gray-400">{new Date(d.id).toLocaleDateString()}</span>
                    </div>
                    <h4 className="font-black text-gray-800 mb-2 group-hover:text-emerald-700 transition-colors">{d.endereco}</h4>
                    <p className="text-sm text-gray-500 font-medium line-clamp-2 leading-relaxed">{d.descricao}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .m-input {
          width: 100%;
          padding: 1.25rem;
          background: #fcfdfe;
          border: 2px solid #f1f5f9;
          border-radius: 1.25rem;
          font-weight: 600;
          color: #1e293b;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .m-input:focus {
          border-color: #26885a;
          background: white;
          box-shadow: 0 10px 25px -5px rgba(38, 136, 90, 0.1);
          outline: none;
        }
        .m-input::placeholder { color: #cbd5e1; }
      `}</style>
    </div>
  );
}

function ModernInput({ label, icon, children }) {
  return (
    <div className="space-y-3">
      <label className="flex items-center gap-2 text-[11px] font-black text-gray-400 uppercase tracking-[0.15em] ml-1">
        <span className="text-emerald-500">{icon}</span> {label}
      </label>
      {children}
    </div>
  );
}

function SuccessState() {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-16 text-center">
      <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
        <CheckCircle2 size={48} />
      </div>
      <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tighter">Missão Recebida!</h2>
      <p className="text-gray-500 font-medium max-w-sm mx-auto leading-relaxed">
        Sua coragem pode mudar o mundo para esse animal. O protocolo foi gerado e nossa equipe entrará em ação em breve.
      </p>
    </motion.div>
  );
}