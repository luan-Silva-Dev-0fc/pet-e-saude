import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FiEye, FiEyeOff } from "react-icons/fi"; 

export default function PageCadastro() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");
  const [senhaVisivel, setSenhaVisivel] = useState(false); 
  const [confirmaSenhaVisivel, setConfirmaSenhaVisivel] = useState(false); 

  const handleSignup = async () => {
    if (senha !== confirmaSenha) {
      toast.error("As senhas não coincidem.");
      return;
    }

    if (nome.length > 255 || email.length > 255 || senha.length < 6) {
      toast.error("Por favor, preencha os campos corretamente.");
      return;
    }

    try {
      const response = await axios.post("coloque a api aqui", {
        nome,
        email,
        senha,
      });

      if (response.status === 201) {
        toast.success("Cadastro realizado com sucesso!");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } catch (error) {
      toast.error("Erro ao cadastrar. Tente novamente.");
    }
  };

  const tela = () => {
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen bg-[#61a183] font-sans">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <div className="w-full md:w-1/2 bg-white px-8 md:px-12 py-16 flex flex-col justify-center shadow-2xl rounded-r-3xl mx-4 md:mx-0">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Crie sua conta
        </h2>

        <form className="space-y-6">
          <div>
            <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
              Nome
            </label>
            <input
              id="nome"
              type="text"
              required
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-800"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-800"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Senha
            </label>
            <div className="relative">
              <input
                id="password"
                type={senhaVisivel ? "text" : "password"} 
                required
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="my-3 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-800"
              />
              <button
                type="button"
                onClick={() => setSenhaVisivel(!senhaVisivel)}
                className="absolute right-3 top-3"
              >
                {senhaVisivel ? <FiEyeOff className="text-gray-600" /> : <FiEye className="text-gray-600" />} 
              </button>
            </div>

            <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700">
              Confirme sua senha
            </label>
            <div className="relative">
              <input
                id="confirm_password"
                type={confirmaSenhaVisivel ? "text" : "password"} 
                required
                value={confirmaSenha}
                onChange={(e) => setConfirmaSenha(e.target.value)}
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-800"
              />
              <button
                type="button"
                onClick={() => setConfirmaSenhaVisivel(!confirmaSenhaVisivel)}
                className="absolute right-3 top-3"
              >
                {confirmaSenhaVisivel ? <FiEyeOff className="text-gray-600" /> : <FiEye className="text-gray-600" />}
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSignup}
            className="w-full bg-[#26885a] text-white font-bold py-3 px-4 rounded-xl transition duration-300 shadow-md"
          >
            Cadastrar
          </button>

          <div className="text-center">
            <span className="text-sm text-gray-600">Já possui uma conta? </span>
            <button
              type="button"
              onClick={tela}
              className="text-green-800 hover:underline text-sm font-semibold"
            >
              Login
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
  );
}
