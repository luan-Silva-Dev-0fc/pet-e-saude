import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, ArrowLeft, ShieldCheck, Send, Loader2 } from "lucide-react";
import Head from "next/head";

// Simulação de Toast (para evitar dependência de biblioteca externa no exemplo)
const SimpleToast = ({ message, type }) => (
  <motion.div 
    initial={{ y: -50, opacity: 0 }} animate={{ y: 20, opacity: 1 }} exit={{ y: -50, opacity: 0 }}
    className={`fixed top-0 left-1/2 -translate-x-1/2 px-6 py-3 rounded-2xl shadow-2xl z-[100] font-bold text-white ${type === 'success' ? 'bg-emerald-600' : 'bg-red-500'}`}
  >
    {message}
  </motion.div>
);

export default function RecoverPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleRecoverPassword = async (e) => {
    e.preventDefault();
    if (!email) {
      showToast("Por favor, insira seu e-mail.", "error");
      return;
    }

    setLoading(true);
    // Simulação de delay de envio
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setLoading(false);
    showToast("Instruções enviadas com sucesso!", "success");
    
    setTimeout(() => router.push("/login"), 2000);
  };

  return (
    <div className="min-h-screen bg-[#f8faf9] flex items-center justify-center p-4 md:p-10 font-sans overflow-hidden">
      <Head>
        <title>Recuperar Senha | Pet & Saúde</title>
      </Head>

      <AnimatePresence>{toast && <SimpleToast {...toast} />}</AnimatePresence>

      <div className="max-w-5xl w-full grid lg:grid-cols-2 bg-white rounded-[3rem] shadow-2xl shadow-emerald-900/10 overflow-hidden relative">
        
        {/* COLUNA DO FORMULÁRIO */}
        <div className="p-8 md:p-16 flex flex-col justify-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <button
              onClick={() => router.push("/login")}
              className="group flex items-center gap-2 text-gray-400 hover:text-emerald-600 font-bold mb-10 transition-colors"
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              Voltar ao Login
            </button>

            <div className="mb-10">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheck size={32} />
              </div>
              <h2 className="text-4xl font-black text-gray-900 leading-tight">
                Esqueceu sua <span className="text-[#26885a]">senha?</span>
              </h2>
              <p className="text-gray-500 font-medium mt-4">
                Não se preocupe! Insira o e-mail associado à sua conta e enviaremos um link de recuperação.
              </p>
            </div>

            <form onSubmit={handleRecoverPassword} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">
                  E-mail cadastrado
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="exemplo@email.com"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-emerald-500 focus:bg-white outline-none transition-all font-medium text-gray-700"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#26885a] hover:bg-[#1e6b47] text-white font-black py-5 rounded-2xl text-lg shadow-xl shadow-emerald-100 transition-all flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={24} />
                ) : (
                  <>
                    Enviar Instruções
                    <Send size={18} />
                  </>
                )}
              </button>
            </form>

            <div className="mt-12 p-6 bg-gray-50 rounded-3xl border border-gray-100">
              <p className="text-xs text-center text-gray-500 font-medium">
                Ainda não tem uma conta?{" "}
                <button onClick={() => router.push("/cadastro")} className="text-emerald-700 font-black hover:underline underline-offset-4">
                  Criar conta agora
                </button>
              </p>
            </div>
          </motion.div>
        </div>

        {/* COLUNA DA ILUSTRAÇÃO */}
        <div 
          className="hidden lg:flex flex-col items-center justify-center p-12 relative"
          style={{ backgroundColor: "#26885a" }}
        >
          {/* Elementos decorativos de fundo */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl -ml-20 -mb-20" />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 text-center"
          >
            <img
              src="/veterinary-animate.svg"
              alt="Ilustração"
              className="w-full max-w-md mx-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.2)]"
            />
            <div className="mt-12 text-white">
              <h3 className="text-2xl font-black mb-2">Sua segurança em primeiro lugar</h3>
              <p className="text-emerald-100/70 text-sm font-medium px-10">
                Garantimos que seus dados e de seus pets estejam sempre protegidos conosco.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}