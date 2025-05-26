import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("auth") === "false";
    if (isLoggedIn) {
      router.push("/");
    }
  }, [router]);

  const handleGoogleLogin = () => {
    router.push("/login/google");
  };

  const handleSignup = () => {
    router.push("/Cadastro");
  };

  const handleRecover = () => {
    router.push("/recuperar-senha");
  };

  const handleLogin = () => {
    const email = document.getElementById("email")?.value;
    const password = document.getElementById("password")?.value;

    if (!email || !password) {
      toast.error("E-mail e senha são obrigatórios.");
      return;
    }

    localStorage.setItem("auth", "true");
    router.push("/");
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
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              E-mail:
            </label>
            <input
              id="email"
              type="email"
              required
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Senha:
            </label>
            <input
              id="password"
              type="password"
              required
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2"
            />
          </div>

          <button
            type="button"
            onClick={handleLogin}
            className="w-full bg-[#26885a] text-white font-bold py-3 px-4 rounded-xl transition duration-300 shadow-md"
          >
            Entrar
          </button>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 border border-gray-300 py-2 px-4 rounded-xl shadow-sm hover:bg-gray-100 transition"
          >
            <FcGoogle />
            <span className="text-sm text-black font-medium">
              Entrar com Google
            </span>
          </button>

          <div className="text-center">
            <span className="text-sm text-black">
              Ainda não tem uma conta?{" "}
            </span>
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
