import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RecoverPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleRecoverPassword = () => {
    if (!email) {
      toast.error("Por favor, insira seu e-mail.");
      return;
    }

    // Aqui você pode adicionar a lógica para enviar o e-mail de recuperação

    toast.success("Instruções de recuperação enviadas para seu e-mail.");
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen bg-[#61a183] font-sans">
      <ToastContainer />
      <div className="w-full md:w-1/2 bg-white px-8 md:px-12 py-16 flex flex-col justify-center shadow-2xl rounded-r-3xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Recuperar Senha
        </h2>

        <form className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              E-mail:
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2"
            />
          </div>

          <button
            type="button"
            onClick={handleRecoverPassword}
            className="w-full bg-[#26885a] text-white font-bold py-3 px-4 rounded-xl transition duration-300 shadow-md"
          >
            Enviar Instruções
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-black">
          Lembrou sua senha?{" "}
          <button
            type="button"
            onClick={() => router.push("/login")}
            className="text-green-800 hover:underline text-sm font-semibold"
          >
            Voltar para o login
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
