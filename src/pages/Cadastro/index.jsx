"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { User, Mail, Lock, Eye, EyeOff, Loader2, PawPrint } from "lucide-react";
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
      await new Promise((resolve) => setTimeout(resolve, 1500));

      await axios.post("http://localhost:4028/api/users", {
        name,
        email,
        password,
      });

      toast.success("Conta criada! Redirecionando...");
      setTimeout(() => router.push("/login"), 2000);
    } catch (error) {
      toast.error(
        error.response?.data?.error || "Erro ao cadastrar. Verifique os dados.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#528d72] via-[#61a183] to-[#a3d5bd] font-sans items-center justify-center p-6">
      <ToastContainer theme="colored" />

      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-[2.5rem] overflow-hidden">
        <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center bg-white order-2 md:order-1">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <PawPrint className="text-[#26885a] w-6 h-6" />
              <span className="text-[#26885a] font-bold tracking-widest text-xs uppercase">
                Junte-se a nós
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-800 leading-tight">
              Comece uma nova <span className="text-[#26885a]">jornada.</span>
            </h2>
            <p className="text-gray-500 mt-3 font-medium">
              Crie sua conta e ofereça o melhor para o seu pet.
            </p>
          </div>

          <form onSubmit={handleSignup} className="space-y-5">
            <div className="space-y-1">
              <label className="text-[13px] font-bold text-gray-700 uppercase tracking-wider ml-1">
                Nome Completo
              </label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#26885a] transition-colors w-5 h-5" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-[#61a183] outline-none transition-all text-gray-900 placeholder-gray-400"
                  placeholder="Seu nome"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[13px] font-bold text-gray-700 uppercase tracking-wider ml-1">
                E-mail
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#26885a] transition-colors w-5 h-5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-[#61a183] outline-none transition-all text-gray-900 placeholder-gray-400"
                  placeholder="exemplo@email.com"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[13px] font-bold text-gray-700 uppercase tracking-wider ml-1">
                Senha
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#26885a] transition-colors w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-[#61a183] outline-none transition-all text-gray-900 placeholder-gray-400"
                  placeholder="Crie uma senha forte"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#26885a] transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="w-full bg-[#26885a] hover:bg-[#1e6b47] text-white font-extrabold py-4 rounded-2xl transition-all duration-300 shadow-lg shadow-green-100 flex items-center justify-center gap-3 active:scale-[0.97] disabled:opacity-70 mt-4"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5" />
                  <span>Criando conta...</span>
                </>
              ) : (
                "Cadastrar agora"
              )}
            </button>
          </form>

          <div className="mt-8 text-center border-t border-gray-100 pt-6">
            <p className="text-gray-500 font-medium">
              Já possui uma conta?{" "}
              <button
                onClick={() => router.push("/login")}
                className="text-[#26885a] font-extrabold hover:underline underline-offset-4"
              >
                Fazer login
              </button>
            </p>
          </div>
        </div>

        <div className="w-full md:w-1/2 bg-[#f8faf9] flex items-center justify-center p-12 relative order-1 md:order-2">
          <div className="absolute w-72 h-72 bg-[#61a183]/10 rounded-full blur-3xl"></div>
          <img
            src="/adopt-a-pet-animate.svg"
            alt="Adopt a Pet"
            className="relative w-full max-w-sm drop-shadow-2xl"
            style={{ animation: "float 6s ease-in-out infinite" }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
        }
      `}</style>
    </div>
  );
}
