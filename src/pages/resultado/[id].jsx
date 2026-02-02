import React from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { 
  FileText, 
  ArrowLeft, 
  Download, 
  Printer, 
  ShieldCheck, 
  Info,
  Beaker,
  Stethoscope
} from "lucide-react";
import Head from "next/head";

const exames = [
  {
    id: 1,
    nome: "Hemograma Completo",
    status: "Finalizado",
    dataExame: "18/01/2026",
    laboratorio: "LabPet Central",
    resultadoDisponivel: true,
    animal: {
      nome: "Toby",
      especie: "Cachorro",
      raca: "SRD",
      idade: "4 anos",
      sexo: "Macho",
      foto: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=400",
    },
    observacoes: "Paciente apresentou-se calmo. Coleta realizada em veia cefálica.",
    analise: [
      { parametro: "Eritrócitos", resultado: "6.5", referencia: "5.5 - 8.5", status: "Normal" },
      { parametro: "Hemoglobina", resultado: "14.2", referencia: "12.0 - 18.0", status: "Normal" },
      { parametro: "Leucócitos", resultado: "12.400", referencia: "6.000 - 17.000", status: "Normal" },
      { parametro: "Plaquetas", resultado: "180.000", referencia: "200.000 - 500.000", status: "Baixo" },
    ],
    conclusao: "Discreta trombocitopenia observada. Recomenda-se acompanhamento clínico e possível teste para hemoparasitoses.",
  }
];

export default function ResultadoExame() {
  const router = useRouter();
  const { id } = router.query;
  const exame = exames.find((e) => e.id === parseInt(id)) || exames[0]; // Fallback para Toby no exemplo

  if (!exame) return <div className="p-20 text-center font-bold">Carregando laudo...</div>;

  return (
    <div className="min-h-screen bg-[#f8faf9] font-sans pb-20">
      <Head>
        <title>Laudo: {exame.nome} - {exame.animal.nome}</title>
      </Head>

      {/* BARRA DE AÇÕES SUPERIOR */}
      <div className="bg-white border-b border-gray-100 px-6 py-4 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => router.push("/exames")}
            className="flex items-center gap-2 text-gray-500 hover:text-emerald-700 font-bold transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="hidden md:inline">Voltar aos Exames</span>
          </button>
          
          <div className="flex gap-3">
            <button className="p-3 text-gray-500 hover:bg-gray-50 rounded-2xl transition-all">
              <Printer size={20} />
            </button>
            <button className="flex items-center gap-2 bg-[#26885a] text-white px-6 py-3 rounded-2xl font-black text-sm shadow-lg shadow-emerald-100 hover:bg-[#1e6b47] transition-all">
              <Download size={18} />
              PDF do Laudo
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-6 mt-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[3rem] shadow-xl shadow-emerald-900/5 overflow-hidden border border-emerald-50"
        >
          {/* CABEÇALHO DO LAUDO */}
          <div className="bg-[#1a4d35] p-8 md:p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-10">
              <Beaker size={180} />
            </div>
            
            <div className="flex flex-col md:flex-row justify-between gap-8 relative z-10">
              <div className="flex gap-6 items-center">
                <img 
                  src={exame.animal.foto} 
                  className="w-24 h-24 rounded-3xl object-cover border-4 border-white/20"
                  alt={exame.animal.nome}
                />
                <div>
                  <h1 className="text-3xl font-black">{exame.animal.nome}</h1>
                  <p className="opacity-70 font-medium">{exame.animal.especie} • {exame.animal.raca} • {exame.animal.idade}</p>
                  <div className="mt-3 inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                    <ShieldCheck size={14} className="text-emerald-400" />
                    ID do Exame: #00{exame.id}2026
                  </div>
                </div>
              </div>

              <div className="text-right flex flex-col justify-center">
                <p className="text-[10px] font-black opacity-50 uppercase tracking-[0.2em] mb-1">Tipo de Exame</p>
                <h2 className="text-2xl font-black text-emerald-400 leading-tight">{exame.nome}</h2>
                <p className="text-sm opacity-70 mt-2 font-medium">Realizado em: {exame.dataExame}</p>
              </div>
            </div>
          </div>

          {/* CORPO DO LAUDO */}
          <div className="p-8 md:p-12 space-y-10">
            {/* INFORMAÇÕES TÉCNICAS */}
            <section>
              <h3 className="flex items-center gap-2 text-gray-800 font-black text-lg mb-6">
                <div className="w-1.5 h-6 bg-emerald-500 rounded-full" />
                Análise Detalhada
              </h3>
              
              <div className="overflow-hidden border border-gray-100 rounded-3xl">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    <tr>
                      <th className="px-6 py-4">Parâmetro</th>
                      <th className="px-6 py-4">Resultado</th>
                      <th className="px-6 py-4">Valores de Referência</th>
                      <th className="px-6 py-4 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {exame.analise.map((item, idx) => (
                      <tr key={idx} className="hover:bg-emerald-50/30 transition-colors">
                        <td className="px-6 py-4 text-sm font-bold text-gray-700">{item.parametro}</td>
                        <td className="px-6 py-4 text-sm font-black text-gray-900">{item.resultado}</td>
                        <td className="px-6 py-4 text-xs font-medium text-gray-400 italic">{item.referencia}</td>
                        <td className="px-6 py-4 text-right">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                            item.status === "Normal" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600"
                          }`}>
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* OBSERVAÇÕES E CONCLUSÃO */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100">
                <div className="flex items-center gap-2 text-gray-400 font-black text-[10px] uppercase tracking-widest mb-3">
                  <Stethoscope size={14} />
                  Notas do Veterinário
                </div>
                <p className="text-sm text-gray-600 font-medium leading-relaxed italic">
                  "{exame.observacoes}"
                </p>
              </div>

              <div className="bg-emerald-50 p-6 rounded-[2rem] border border-emerald-100">
                <div className="flex items-center gap-2 text-emerald-800 font-black text-[10px] uppercase tracking-widest mb-3">
                  <Info size={14} />
                  Conclusão Clínica
                </div>
                <p className="text-sm text-emerald-900 font-bold leading-relaxed">
                  {exame.conclusao}
                </p>
              </div>
            </div>

            {/* RODAPÉ DO DOCUMENTO */}
            <footer className="pt-10 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center font-black text-gray-400">
                  DR
                </div>
                <div>
                  <p className="text-sm font-black text-gray-800">Dr. Ricardo Menezes</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">CRMV-CE 12345</p>
                </div>
              </div>
              <div className="text-right">
                <img src="/assinatura-digital.png" alt="Assinatura Digital" className="h-10 opacity-30 grayscale mb-2 ml-auto" />
                <p className="text-[10px] font-bold text-gray-300 uppercase tracking-tighter">Documento Assinado Digitalmente</p>
              </div>
            </footer>
          </div>
        </motion.div>
      </main>
    </div>
  );
}