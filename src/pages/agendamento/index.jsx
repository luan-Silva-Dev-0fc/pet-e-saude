import { useState } from "react";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, 
  User, 
  Phone, 
  Stethoscope, 
  Dog, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  ChevronRight
} from "lucide-react";

export default function Agendamento() {
  const [pet, setPet] = useState("");
  const [dataHora, setDataHora] = useState("");
  const [tipoConsulta, setTipoConsulta] = useState("");
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [agendado, setAgendado] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(null);

  const handleAgendar = async () => {
    if (pet && dataHora && tipoConsulta && nome && telefone) {
      setLoading(true);
      
      // Simulação de delay de rede
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setAgendado(true);
      setShowModal("sucesso");
      setLoading(false);
    } else {
      setShowModal("erro");
    }
  };

  const Modal = ({ tipo, mensagem }) => (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
        className="bg-white p-8 rounded-[2.5rem] shadow-2xl text-center space-y-4 max-w-sm w-full border border-gray-100"
      >
        <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center ${tipo === 'sucesso' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
          {tipo === 'sucesso' ? <CheckCircle2 size={32} /> : <AlertCircle size={32} />}
        </div>
        <h3 className="text-xl font-black text-gray-800">
          {tipo === 'sucesso' ? 'Tudo certo!' : 'Ops! Algo falta'}
        </h3>
        <p className="text-gray-500 font-medium">{mensagem}</p>
        <button
          onClick={() => setShowModal(null)}
          className="w-full bg-[#26885a] text-white py-4 rounded-2xl font-bold hover:bg-[#1e6b47] transition-all shadow-lg shadow-emerald-100"
        >
          Entendido
        </button>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="bg-[#f8faf9] min-h-screen font-sans">
      <Head>
        <title>Agendamento | Pet & Saúde</title>
      </Head>

      <AnimatePresence>
        {showModal === "sucesso" && <Modal tipo="sucesso" mensagem="Seu agendamento foi processado com sucesso!" />}
        {showModal === "erro" && <Modal tipo="erro" mensagem="Preencha todos os campos para continuar o agendamento." />}
      </AnimatePresence>

      <div className="max-w-2xl mx-auto py-12 px-6">
        <header className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-full mb-4">
            <Calendar size={18} className="text-[#26885a]" />
            <span className="text-[#26885a] text-sm font-black uppercase tracking-widest">Reserva Online</span>
          </div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">
            Agendar <span className="text-[#26885a]">Consulta</span>
          </h1>
          <p className="text-gray-500 mt-2 font-medium text-lg">Escolha o melhor horário para o seu amigo.</p>
        </header>

        <motion.div 
          layout
          className="bg-white p-8 md:p-10 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-100"
        >
          {!agendado ? (
            <div className="space-y-6">
              {/* Seleção de Pet e Tipo */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 uppercase tracking-wide ml-1">
                    <Dog size={16} /> Pet
                  </label>
                  <select
                    className="w-full p-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-[#61a183] outline-none transition-all font-medium text-gray-700"
                    value={pet}
                    onChange={(e) => setPet(e.target.value)}
                  >
                    <option value="">Escolha um pet</option>
                    <option value="dog">Cachorro</option>
                    <option value="cat">Gato</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 uppercase tracking-wide ml-1">
                    <Stethoscope size={16} /> Serviço
                  </label>
                  <select
                    className="w-full p-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-[#61a183] outline-none transition-all font-medium text-gray-700"
                    value={tipoConsulta}
                    onChange={(e) => setTipoConsulta(e.target.value)}
                  >
                    <option value="">Tipo de consulta</option>
                    <option value="consulta">Consulta Inicial</option>
                    <option value="exame">Exame Geral</option>
                    <option value="vacina">Vacinação</option>
                  </select>
                </div>
              </div>

              {/* Data e Hora */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 uppercase tracking-wide ml-1">
                  <Clock size={16} /> Data e Horário
                </label>
                <input
                  type="datetime-local"
                  className="w-full p-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-[#61a183] outline-none transition-all font-medium text-gray-700"
                  value={dataHora}
                  onChange={(e) => setDataHora(e.target.value)}
                />
              </div>

              {/* Dados do Tutor */}
              <div className="pt-4 border-t border-gray-50 space-y-6">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 uppercase tracking-wide ml-1">
                    <User size={16} /> Nome Completo
                  </label>
                  <input
                    type="text"
                    placeholder="Como devemos te chamar?"
                    className="w-full p-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-[#61a183] outline-none transition-all font-medium text-gray-700"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 uppercase tracking-wide ml-1">
                    <Phone size={16} /> WhatsApp / Telefone
                  </label>
                  <input
                    type="text"
                    placeholder="(00) 00000-0000"
                    className="w-full p-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-[#61a183] outline-none transition-all font-medium text-gray-700"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                  />
                </div>
              </div>

              <button
                onClick={handleAgendar}
                disabled={loading}
                className="w-full bg-[#26885a] text-white py-5 rounded-[2rem] font-black text-lg hover:bg-[#1e6b47] transition-all flex items-center justify-center gap-3 shadow-xl shadow-emerald-100 disabled:opacity-50"
              >
                {loading ? "Processando..." : "Confirmar Agendamento"}
                {!loading && <ChevronRight size={20} />}
              </button>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="space-y-8"
            >
              <div className="text-center">
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={40} />
                </div>
                <h2 className="text-2xl font-black text-gray-800">Quase lá!</h2>
                <p className="text-gray-500 font-medium">Confira as informações abaixo antes de finalizar.</p>
              </div>

              <div className="bg-gray-50 p-6 rounded-[2rem] space-y-4 border border-gray-100">
                <DetailRow label="Paciente" value={pet === "dog" ? "Cachorro" : "Gato"} />
                <DetailRow label="Serviço" value={tipoConsulta} />
                <DetailRow label="Data" value={new Date(dataHora).toLocaleString()} />
                <DetailRow label="Tutor" value={nome} />
                <DetailRow label="Contato" value={telefone} />
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={() => setAgendado(false)}
                  className="w-full bg-[#26885a] text-white py-5 rounded-[2rem] font-black text-lg hover:bg-[#1e6b47] transition-all shadow-xl shadow-emerald-100"
                >
                  Finalizar Agendamento
                </button>
                <button
                  onClick={() => setAgendado(false)}
                  className="w-full bg-transparent text-gray-400 py-3 rounded-2xl font-bold hover:text-gray-600 transition-all"
                >
                  Editar Informações
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="flex justify-between items-center py-1">
      <span className="text-gray-400 font-bold text-xs uppercase tracking-widest">{label}</span>
      <span className="text-gray-800 font-extrabold capitalize">{value}</span>
    </div>
  );
}