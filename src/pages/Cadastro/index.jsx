import { useRouter } from "next/navigation";

export default function PageCadastro() {
  const router = useRouter();

  const tela = () => {
    router.push("/login");
  };

  const handleSignup = () => {
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen bg-[#61a183] font-sans">
      <div className="w-full md:w-1/2 bg-white px-8 md:px-12 py-16 flex flex-col justify-center shadow-2xl rounded-r-3xl mx-4 md:mx-0">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Crie sua conta
        </h2>

        <form className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              E-mail
            </label>
            <input
              id="email"
              type="email"
              required
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-800"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Senha
            </label>
            <input
              id="password"
              type="password"
              required
              className="my-3 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-800"
            />
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Confirme sua senha
            </label>
            <input
              id="password"
              type="password"
              required
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-800"
            />
          </div>

          <button
            type="button"
            onClick={tela}
            className="w-full bg-[#26885a] text-white font-bold py-3 px-4 rounded-xl transition duration-300 shadow-md"
          >
            Entrar
          </button>

          <div className="text-center">
            <span className="text-sm text-gray-600">já possui uma conta? </span>
            <button
              type="button"
              onClick={handleSignup}
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
  );
}
