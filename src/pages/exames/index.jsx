import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CalendarDays, 
  FileText, 
  CheckCircle2, 
  Clock, 
  Search, 
  Filter,
  ArrowRight,
  Download,
  Stethoscope,
  Activity
} from "lucide-react";
import { useRouter } from "next/router";
import Head from "next/head";

export default function InterfaceExames() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState("Todos");

  // Dados simulados com maior fidelidade visual
  const [exames, setExames] = useState([
    {
      id: 1,
      nome: "Hemograma Completo",
      status: "Realizado",
      dataSolicitacao: "15/01/2026",
      dataExame: "18/01/2026",
      profissional: "Dra. Ana Beatriz",
      observacoes: "Animal em jejum de 8 horas.",
      resultadoDisponivel: true,
      animal: {
        nome: "Toby",
        especie: "Cão",
        raca: "SRD",
        idade: "2 anos",
        sexo: "Macho",
        foto: "/animais/animal1.jpg"
      }
    },
    {
      id: 2,
      nome: "Radiografia Abdominal",
      status: "Agendado",
      dataSolicitacao: "20/01/2026",
      dataExame: "05/02/2026",
      profissional: "Dr. Marcos Vinícius",
      observacoes: "Necessário sedação leve.",
      resultadoDisponivel: false,
      animal: {
        nome: "Luna",
        especie: "Cão",
        raca: "Labrador",
        idade: "3 anos",
        sexo: "Fêmea",
        foto: "/animais/animal2.jpg"
      }
    }
  ]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const statusStyles = {
    Realizado: "bg-emerald-100 text-emerald-700 border-emerald-200",
    Agendado: "bg-blue-100 text-blue-700 border-blue-200",
    Pendente: "bg-amber-100 text-amber-700 border-amber-200",
  };

  const statusIcons = {
    Realizado: <CheckCircle2 size={14} />,
    Agendado: <CalendarDays size={14} />,
    Pendente: <Clock size={14} />,
  };

  return (
    <div className="min-h-screen bg-[#f8faf9] font-sans pb-20">
      <Head>
        <title>Central de Exames | Pet & Saúde</title>
      </Head>

      {/* HEADER DINÂMICO */}
      <div className="bg-white border-b border-gray-100 px-6 py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-[#26885a] font-bold text-sm mb-1">
              <Activity size={18} />
              <span className="uppercase tracking-widest">Painel Clínico</span>
            </div>
            <h1 className="text-3xl font-black text-gray-900">Histórico de <span className="text-[#26885a]">Exames</span></h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Buscar exame ou pet..." 
                className="pl-10 pr-4 py-3 bg-gray-50 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-emerald-500 transition-all w-64"
              />
            </div>
            <button className="p-3 bg-gray-50 text-gray-500 rounded-2xl hover:bg-gray-100 transition-all">
              <Filter size={20} />
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 mt-10">
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => <div key={i} className="h-64 bg-gray-200 animate-pulse rounded-[2.5rem]" />)}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence>
              {exames.map((exame) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  key={exame.id}
                  className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-emerald-900/5 transition-all group"
                >
                  {/* HEADER DO CARD - FOTO DO ANIMAL */}
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={exame.animal.foto}
                      alt={exame.animal.nome}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Paciente</p>
                      <h3 className="text-xl font-black">{exame.animal.nome}</h3>
                    </div>
                    <div className={`absolute top-4 right-4 px-3 py-1.5 rounded-full border text-[10px] font-black uppercase flex items-center gap-1.5 backdrop-blur-md ${statusStyles[exame.status]}`}>
                      {statusIcons[exame.status]}
                      {exame.status}
                    </div>
                  </div>

                  {/* CONTEÚDO TÉCNICO */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h2 className="text-lg font-black text-gray-800 leading-tight mb-1">{exame.nome}</h2>
                      <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                        <Stethoscope size={14} className="text-emerald-500" />
                        <span>Solicitado por {exame.profissional}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 py-4 border-y border-gray-50">
                      <InfoItem label="Data Exame" value={exame.dataExame} icon={<CalendarDays size={12}/>} />
                      <InfoItem label="Raça" value={exame.animal.raca} />
                    </div>

                    <div className="bg-gray-50 p-3 rounded-2xl">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Observações</p>
                      <p className="text-xs text-gray-600 font-medium italic">"{exame.observacoes}"</p>
                    </div>

                    {/* BOTÃO DE AÇÃO */}
                    <button
                      disabled={!exame.resultadoDisponivel}
                      onClick={() => router.push(`/resultado/${exame.id}`)}
                      className={`w-full py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all ${
                        exame.resultadoDisponivel 
                        ? "bg-[#26885a] text-white shadow-lg shadow-emerald-100 hover:bg-[#1e6b47]" 
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      {exame.resultadoDisponivel ? (
                        <>
                          Ver Laudo Completo
                          <Download size={16} />
                        </>
                      ) : (
                        "Aguardando Resultado..."
                      )}
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>
    </div>
  );
}

function InfoItem({ label, value, icon }) {
  return (
    <div>
      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">{label}</p>
      <div className="flex items-center gap-1 text-sm font-bold text-gray-700">
        {icon}
        {value}
      </div>
    </div>
  );
}