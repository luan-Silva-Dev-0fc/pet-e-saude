import { useState } from "react";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import { Eye, EyeOff, Mail, Lock, Loader2, HeartPulse } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";

import { auth } from "../../lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    if (e) e.preventDefault();

    if (!email || !password) {
      toast.error("Por favor, preencha todos os campos.");
      return;
    }

    setIsLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;

      const token = await user.getIdToken();

      localStorage.setItem("token", token);
      localStorage.setItem("auth", "true");

      toast.success(`Bem-vindo, ${user.email.split("@")[0]}!`);

      setTimeout(() => router.push("/"), 1000);
    } catch (error) {
      console.error("Erro no login:", error.code);

      if (
        error.code === "auth/invalid-credential" ||
        error.code === "auth/user-not-found"
      ) {
        toast.error("E-mail ou senha incorretos.");
      } else if (error.code === "auth/too-many-requests") {
        toast.error("Muitas tentativas. Tente novamente mais tarde.");
      } else {
        toast.error("Erro ao entrar. Verifique sua conexão.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-linear-to-tr from-[#528d72] via-[#61a183] to-[#a3d5bd] font-sans items-center justify-center p-6">
      <ToastContainer theme="colored" position="top-right" />

      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-[2.5rem] overflow-hidden">
        <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center bg-white">
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-3">
              <HeartPulse className="text-[#26885a] w-6 h-6" />
              <span className="text-[#26885a] font-bold tracking-widest text-xs uppercase">
                Pet e Saúde
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-800 leading-tight">
              Cuidar de quem nos faz{" "}
              <span className="text-[#26885a]">feliz.</span>
            </h2>
            <p className="text-gray-500 mt-3 font-medium">
              Acesse o painel para cuidar do seu pet.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[13px] font-bold text-gray-700 uppercase tracking-wider ml-1">
                E-mail
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-[#26885a] transition-colors" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-11 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-[#61a183] outline-none transition-all text-gray-900 placeholder-gray-400"
                  placeholder="seu@email.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[13px] font-bold text-gray-700 uppercase tracking-wider ml-1">
                Senha
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-[#26885a] transition-colors" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-11 pr-12 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-[#61a183] outline-none transition-all text-gray-900 placeholder-gray-400"
                  placeholder="Sua senha"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-[#26885a] transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#26885a] hover:bg-[#1e6b47] text-white font-extrabold py-4 rounded-2xl transition-all duration-300 shadow-lg shadow-green-100 flex items-center justify-center gap-3 active:scale-[0.97] disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5" />
                  <span>Entrando...</span>
                </>
              ) : (
                "Entrar no Sistema"
              )}
            </button>
          </form>

          <div className="mt-10 text-center border-t border-gray-100 pt-6">
            <p className="text-gray-500 font-medium">
              Não tem conta?{" "}
              <button
                onClick={() => router.push("/Cadastro")}
                className="text-[#26885a] font-extrabold hover:underline underline-offset-4"
              >
                Cadastre-se grátis
              </button>
            </p>
          </div>
        </div>

        <div className="hidden md:flex w-1/2 bg-[#f8faf9] items-center justify-center p-12 relative">
          <div className="absolute w-80 h-80 bg-[#61a183]/10 rounded-full blur-3xl"></div>
          <img
            src="/veterinary-animate.svg"
            alt="Veterinary Illustration"
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
            transform: translateY(-20px);
          }
        }
      `}</style>
    </div>
  );
}
