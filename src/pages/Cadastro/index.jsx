'use client';
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

export default function PageCadastro() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async () => {
    try {
      await axios.post("http://localhost:4028/api/users", {
        name,
        email,
        password
      });
      toast.success("Cadastro realizado com sucesso!");
      setTimeout(() => router.push("/login"), 2000);
    } catch (error) {
      toast.error(
        error.response?.data?.error || "Erro ao cadastrar. Verifique os dados."
      );
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="flex min-h-screen bg-[#61a183] font-sans">
        <div className="w-full md:w-1/2 bg-white px-8 md:px-12 py-16 flex flex-col justify-center shadow-2xl rounded-r-3xl mx-4 md:mx-0">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Crie sua conta
          </h2>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome</label>
              <div className="relative">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="appearance-none relative block mt-2 w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:border-black focus:z-10 sm:text-sm transition-colors"
                  placeholder="Digite seu nome"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail</label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none relative block mt-2 w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:border-black focus:z-10 sm:text-sm transition-colors"
                  placeholder="Digite seu email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Senha</label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  required
                  className="appearance-none relative block mt-2 w-full pl-10 pr-12 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:border-black focus:z-10 sm:text-sm transition-colors"
                  placeholder="Digite sua senha"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.54 9.54A3.5 3.5 0 0112 15.5a3.5 3.5 0 01-3.54-5.96" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.522 5 12 5c4.478 0 8.268 2.943 9.543 7-1.275 4.057-5.065 7-9.543 7-4.478 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              onClick={handleSignup}
              className="w-full bg-[#26885a] text-white font-bold py-3 px-4 rounded-xl transition duration-300 shadow-md"
            >
              Cadastrar
            </button>

            <div className="text-center">
              <span className="text-sm text-gray-600">já possui uma conta? </span>
              <button
                type="button"
                onClick={() => router.push("/login")}
                className="text-green-800 hover:underline text-sm font-semibold"
              >
                login
              </button>
            </div>
          </form>
        </div>

        <div className="w-full md:w-1/2 flex items-center justify-center bg-[#61a183] md:bg-transparent">
          <img
            src="/adopt-a-pet-animate.svg"
            alt="Logo"
            width={390}
            height={390}
            className="drop-shadow-lg"
          />
        </div>
      </div>
    </>
  );
}
