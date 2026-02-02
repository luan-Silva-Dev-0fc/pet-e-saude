import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { 
  Phone, 
  Mail, 
  MapPin, 
  ArrowLeft, 
  Instagram, 
  MessageCircle, 
  Clock,
  Navigation2
} from "lucide-react";
import Head from "next/head";

export default function Contatos() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulação de proteção de rota
    const isLoggedIn = localStorage.getItem("auth") === "true";
    if (!isLoggedIn) {
      // Simulando que para ver os contatos oficiais você precisa estar logado
      router.push("/login");
    } else {
      setTimeout(() => setLoading(false), 800); // Feedback visual de carregamento
    }
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8faf9]">
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-10 h-10 border-4 border-emerald-100 border-t-emerald-600 rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col lg:flex-row overflow-hidden">
      <Head>
        <title>Contato | Pet & Saúde</title>
      </Head>

      {/* COLUNA DE INFORMAÇÕES */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-full lg:w-[45%] p-8 lg:p-16 flex flex-col justify-center relative z-10"
      >
        <button 
          onClick={() => router.push("/")}
          className="group flex items-center gap-2 text-gray-400 hover:text-[#26885a] font-bold mb-12 transition-all"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Voltar para Home
        </button>

        <header className="mb-12">
          <h1 className="text-5xl font-black text-gray-900 leading-tight mb-6">
            Vamos conversar sobre o seu <span className="text-[#26885a]">pet?</span>
          </h1>
          <p className="text-lg text-gray-500 font-medium leading-relaxed">
            Nossa sede fica no icônico Edifício Manhattan. Estamos prontos para receber você e seu melhor amigo para uma visita!
          </p>
        </header>

        <div className="grid gap-6">
          <ContactCard 
            icon={<Phone className="text-emerald-600" />} 
            label="Telefone" 
            value="(85) 91234-5678" 
            sub="Seg à Sex, 08h às 18h"
          />
          <ContactCard 
            icon={<Mail className="text-emerald-600" />} 
            label="Email Oficial" 
            value="contato@petesaude.org.br" 
            sub="Respondemos em até 24h"
          />
          <ContactCard 
            icon={<MapPin className="text-emerald-600" />} 
            label="Nossa Sede" 
            value="Edifício Manhattan, Av. Santos Dumont, 1510" 
            sub="Aldeota, Fortaleza - CE"
          />
        </div>

        {/* REDES SOCIAIS */}
        <div className="mt-12 flex items-center gap-6">
          <p className="text-sm font-black text-gray-400 uppercase tracking-widest">Siga-nos:</p>
          <div className="flex gap-4">
            <SocialIcon icon={<Instagram size={20} />} />
            <SocialIcon icon={<MessageCircle size={20} />} />
          </div>
        </div>
      </motion.div>

      {/* COLUNA DO MAPA / IMAGEM INTERATIVA */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex-1 relative min-h-[400px] lg:min-h-screen bg-gray-100"
      >
        {/* Overlay do Mapa */}
        <div className="absolute top-8 left-8 z-20 hidden md:block">
          <div className="bg-white/90 backdrop-blur-md p-6 rounded-[2rem] shadow-2xl border border-white/20 max-w-xs">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-emerald-100 p-2 rounded-xl">
                <Clock size={20} className="text-emerald-600" />
              </div>
              <p className="text-sm font-black text-gray-800 uppercase">Horário de Pico</p>
            </div>
            <p className="text-xs text-gray-500 font-bold mb-4">Evite as 17h se estiver vindo para a Aldeota. Temos estacionamento no local.</p>
            <button className="w-full bg-[#26885a] text-white py-3 rounded-xl font-black flex items-center justify-center gap-2 hover:bg-[#1e6b47] transition-all">
              <Navigation2 size={16} /> Abrir no Waze
            </button>
          </div>
        </div>

        {/* Simulador de Mapa Moderno (Google Maps estilizado) */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3981.346894565706!2d-38.5036734!3d-3.7342939!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7c748624959141f%3A0xc3f8e58f001c9006!2sEdif%C3%ADcio%20Manhattan!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr"
          width="100%"
          height="100%"
          className="grayscale invert-[5%] contrast-[95%] opacity-80"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </motion.div>
    </div>
  );
}

// Componentes Auxiliares
function ContactCard({ icon, label, value, sub }) {
  return (
    <div className="flex gap-5 p-6 rounded-[2rem] hover:bg-emerald-50/50 border border-transparent hover:border-emerald-100 transition-all group">
      <div className="bg-gray-50 group-hover:bg-white p-4 rounded-2xl shadow-sm transition-all h-fit">
        {icon}
      </div>
      <div>
        <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">{label}</p>
        <p className="text-xl font-black text-gray-800 mb-1">{value}</p>
        <p className="text-sm text-gray-500 font-medium">{sub}</p>
      </div>
    </div>
  );
}

function SocialIcon({ icon }) {
  return (
    <button className="w-12 h-12 flex items-center justify-center rounded-2xl bg-gray-50 text-gray-400 hover:bg-[#26885a] hover:text-white transition-all shadow-sm">
      {icon}
    </button>
  );
}