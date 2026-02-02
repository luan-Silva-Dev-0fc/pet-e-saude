import { useState } from 'react';
import { useRouter } from 'next/router';
import { ArrowLeft, Heart, Home, Phone, Mail, User, Info, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Head from 'next/head';

export default function InformacoesAdocao() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    cidade_estado: '',
    motivo: '',
    ambiente: '',
    nomeAnimal: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'telefone' && value.length > 11) return;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulação de envio para a API
    try {
      // await axios.post('http://localhost:4028/api/adocoes', formData);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setShowModal(true);
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8faf9] font-sans flex flex-col items-center justify-center p-6">
      <Head>
        <title>Formulário de Adoção | Pet & Saúde</title>
      </Head>

      {/* BACKGROUND DECORATIVO */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <Heart size={300} className="absolute -top-20 -left-20 text-emerald-50 opacity-50" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-100/30 rounded-full blur-3xl" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl shadow-emerald-900/10 p-8 md:p-12 relative z-10 border border-emerald-50"
      >
        <button
          onClick={() => router.back()}
          className="mb-8 flex items-center gap-2 text-gray-400 hover:text-[#26885a] font-bold transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Voltar
        </button>

        <header className="mb-10 text-center">
          <div className="inline-flex p-3 bg-emerald-100 text-[#26885a] rounded-2xl mb-4">
            <Heart fill="currentColor" size={28} />
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
            Quase lá para o <span className="text-[#26885a]">encontro!</span>
          </h1>
          <p className="text-gray-500 font-medium mt-2">
            Preencha os dados abaixo para iniciarmos o processo de triagem.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <InputField icon={<User size={18}/>} label="Nome Completo">
              <input name="nome" value={formData.nome} onChange={handleChange} placeholder="Como quer ser chamado?" required className="modern-input" />
            </InputField>
            
            <InputField icon={<Mail size={18}/>} label="E-mail">
              <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="contato@exemplo.com" required className="modern-input" />
            </InputField>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <InputField icon={<Phone size={18}/>} label="WhatsApp">
              <input name="telefone" type="tel" value={formData.telefone} onChange={handleChange} placeholder="(00) 00000-0000" required className="modern-input" />
            </InputField>
            
            <InputField icon={<Home size={18}/>} label="Cidade / UF">
              <input name="cidade_estado" value={formData.cidade_estado} onChange={handleChange} placeholder="Ex: Fortaleza, CE" required className="modern-input" />
            </InputField>
          </div>

          <InputField icon={<Info size={18}/>} label="Nome do Pet Escolhido">
            <input name="nomeAnimal" value={formData.nomeAnimal} onChange={handleChange} placeholder="Quem você deseja adotar?" required className="modern-input border-2 border-emerald-100 focus:border-[#26885a]" />
          </InputField>

          <InputField label="Por que você quer adotar este animal?">
            <textarea name="motivo" value={formData.motivo} onChange={handleChange} rows={3} placeholder="Conte um pouco sobre sua motivação..." required className="modern-input resize-none" />
          </InputField>

          <InputField label="Descreva o ambiente (casa, apto, quintal...)">
            <textarea name="ambiente" value={formData.ambiente} onChange={handleChange} rows={3} placeholder="Onde o pet irá passar a maior parte do tempo?" required className="modern-input resize-none" />
          </InputField>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-[#26885a] hover:bg-[#1e6b47] text-white font-black py-5 rounded-2xl text-xl shadow-xl shadow-emerald-100 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {isSubmitting ? "Enviando proposta..." : "Finalizar Solicitação"}
            {!isSubmitting && <CheckCircle2 size={22} />}
          </button>
        </form>
      </motion.div>

      {/* MODAL DE SUCESSO REESTILIZADO */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-emerald-900/40 backdrop-blur-md" />
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white rounded-[3rem] p-10 max-w-sm w-full text-center shadow-2xl relative z-10"
            >
              <div className="w-20 h-20 bg-emerald-100 text-[#26885a] rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart fill="currentColor" size={40} />
              </div>
              <h2 className="text-3xl font-black text-gray-900 mb-4">Parabéns!</h2>
              <p className="text-gray-500 font-medium mb-8 leading-relaxed">
                Sua intenção de adoção foi registrada. Nossa equipe analisará seu perfil e entrará em contato em até 48 horas!
              </p>
              <button
                onClick={() => router.push('/')}
                className="w-full bg-[#26885a] text-white py-4 rounded-2xl font-black text-lg hover:shadow-lg transition-all"
              >
                Voltar para Início
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .modern-input {
          width: 100%;
          padding: 1rem;
          background-color: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 1rem;
          font-weight: 500;
          color: #374151;
          outline: none;
          transition: all 0.2s;
        }
        .modern-input:focus {
          background-color: white;
          border-color: #26885a;
          box-shadow: 0 0 0 4px rgba(38, 136, 90, 0.1);
        }
        .modern-input::placeholder {
          color: #9ca3af;
          font-weight: 400;
        }
      `}</style>
    </div>
  );
}

function InputField({ icon, label, children }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
        {icon}
        {label}
      </label>
      {children}
    </div>
  );
}