import { useState } from "react";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    console.log("Tentando logar com:", { email, password });

    if (!email || !password) {
      toast.error("E-mail e senha são obrigatórios.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:4028/login", {
        email,
        password,
      });

      console.log("Resposta do back-end:", response.data);

      if (response.data.token) {
        console.log("Login bem-sucedido, salvando token no localStorage...");
        localStorage.setItem("auth", "true");
        localStorage.setItem("token", response.data.token);
        toast.success("Login realizado com sucesso!");
        router.push("/");
      } else {
        toast.error("Token não recebido. Verifique o back-end.");
      }
    } catch (error) {
      console.error("Erro na tentativa de login:");
      if (error.response?.data?.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Erro ao conectar com o servidor.");
      }
    }
  };

  const handleSignup = () => {
    router.push("/Cadastro");
  };

  const handleRecover = () => {
    router.push("/recuperar-senha");
  };

  return (
    <div className="flex min-h-screen bg-[#61a183] font-sans">
      <ToastContainer />
      <div className="w-full md:w-1/2 bg-white px-8 md:px-12 py-16 flex flex-col justify-center shadow-2xl rounded-r-3xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Acesse sua conta
        </h2>

        <form className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              E-mail:
            </label>
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none relative block mt-2 w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none  focus:border-black focus:z-10 sm:text-sm transition-colors"
                placeholder="Digite seu email"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Senha:
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                required
                className="appearance-none relative block mt-2 w-full pl-10 pr-12 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none  focus:border-black focus:z-10 sm:text-sm transition-colors"
                placeholder="Digite sua senha"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.72 6.72a45.847 45.847 0 00-1.901 2.158M9.878 9.878l-1.201-1.201m4.242 4.242L16.08 16.08a45.847 45.847 0 001.901-2.158m-4.242-4.242L14.92 8.48m0 0a45.847 45.847 0 011.901 2.158M14.92 8.48L20.08 3.32M14.92 8.48l-4.242 4.242" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogin}
            className="w-full bg-[#26885a] text-white font-bold py-3 px-4 rounded-xl transition duration-300 shadow-md"
          >
            Entrar
          </button>

          <div className="text-center">
            <span className="text-sm text-black">Ainda não tem uma conta? </span>
            <button
              type="button"
              onClick={handleSignup}
              className="text-green-800 hover:underline text-sm font-semibold"
            >
              Cadastre-se
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-black">
          Esqueceu sua senha?{" "}
          <button
            type="button"
            onClick={handleRecover}
            className="text-green-800 hover:underline text-sm font-semibold"
          >
            Recuperar
          </button>
        </p>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center bg-[#61a183] md:bg-transparent">
        <img
          src="/veterinary-animate.svg"
          alt="Logo"
          width={390}
          height={390}
          className="drop-shadow-lg"
        />
      </div>
    </div>
  );
}
