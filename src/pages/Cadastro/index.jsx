"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
import { User, Mail, Lock, Eye, EyeOff, Loader2, PawPrint, ArrowRight } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";

export default function PageCadastro() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error("Preencha todos os campos para continuar.");
      return;
    }

    setIsLoading(true);
    try {
      // Substituído Axios por Fetch Nativo para corrigir o erro da Vercel
      const response = await fetch("http://localhost:4028/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao cadastrar.");
      }

      toast.success("Conta criada! Redirecionando...");
      setTimeout(() => router.push("/login"), 2000);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f0f4f2] items-center justify-center p-4 md:p-6 font-sans overflow-hidden relative">
      <ToastContainer theme="colored" />
      
      {/* Elementos Decorativos de Fundo */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-200/40 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-green-200/30 rounded-full blur-[120px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row w-full max-w-6xl bg-white/80 backdrop-blur-xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] rounded-[3rem] border border-white overflow-hidden z-10"
      >
        {/* Lado Esquerdo: Formulário */}
        <div className="w-full md:w-[55%] p-8 md:p-16 flex flex-col justify-center">
          <div className="mb-10">
            <motion.div 
              initial={{ x: -20 }} animate={{ x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-widest mb-4"
            >
              <PawPrint size={14} /> Nova Conta
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter leading-none">
              Crie sua <span className="text-emerald-600">Jornada.</span>
            </h2>
            <p className="text-gray-500 mt-4 font-medium text-lg">
              Ofereça o melhor cuidado para quem você ama.
            </p>
          </div>

          <form onSubmit={handleSignup} className="space-y-6">
            <InputField 
              label="Nome Completo" 
              icon={<User size={20} />} 
              type="text" 
              placeholder="Como deseja ser chamado?" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
            />
            
            <InputField 
              label="E-mail" 
              icon={<Mail size={20} />} 
              type="email" 
              placeholder="exemplo@pet.com" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />

            <div className="relative group">
              <InputField 
                label="Senha" 
                icon={<Lock size={20} />} 
                type={showPassword ? "text" : "password"} 
                placeholder="Mínimo 6 caracteres" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-[46px] text-gray-400 hover:text-emerald-600 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
              type="submit"
              className="w-full bg-gray-900 hover:bg-black text-white font-black py-5 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-xl disabled:opacity-70 mt-4"
            >
              {isLoading ? (
                <Loader2 className="animate-spin h-5 w-5 text-emerald-400" />
              ) : (
                <>Criar Conta <ArrowRight size={20} /></>
              )}
            </motion.button>
          </form>

          <p className="mt-10 text-center text-gray-500 font-bold">
            Já é de casa?{" "}
            <button onClick={() => router.push("/login")} className="text-emerald-600 hover:underline">
              Fazer Login
            </button>
          </p>
        </div>

        {/* Lado Direito: Visual (Escondido no mobile para focar no form) */}
        <div className="hidden md:flex w-[45%] bg-emerald-50 items-center justify-center p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/50 to-emerald-200/20" />
          <motion.img
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            src="/adopt-a-pet-animate.svg"
            alt="PetCare"
            className="relative w-full drop-shadow-3xl z-10"
          />
          {/* Círculo decorativo giratório */}
          <div className="absolute w-[120%] h-[120%] border border-emerald-200/50 rounded-full animate-[spin_20s_linear_infinite]" />
        </div>
      </motion.div>
    </div>
  );
}

// Componente de Input Modernizado
function InputField({ label, icon, type, placeholder, value, onChange }) {
  return (
    <div className="space-y-2">
      <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1 italic">
        {label}
      </label>
      <div className="relative group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors">
          {icon}
        </div>
        <input
          type={type}
          required
          value={value}
          onChange={onChange}
          className="w-full pl-12 pr-4 py-4 bg-gray-100/50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all text-gray-900 font-medium placeholder-gray-300"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}