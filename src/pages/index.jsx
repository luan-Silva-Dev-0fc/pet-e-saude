import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { BsArrowLeftCircle } from "react-icons/bs";
import Image from "next/image";

export default function QuemSomos() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [order, setOrder] = useState([1, 2, 3, 4, 5, 6]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("auth") === "true";
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    const interval = setInterval(() => {
      setOrder(([a, b, c, d, e, f]) => [b, c, d, e, f, a]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/produtos?search=${searchQuery}`);
  };

  if (loading) return null;

  const images = [
    "/animais/animal1.jpg",
    "/animais/animal2.jpg",
    "/animais/animal3.jpg",
    "/animais/animal4.jpeg",
    "/animais/animal5.jpg",
    "/animais/animal6.jpeg",
  ];

  const handleAdoptClick = (id) => {
    router.push(`/animal/${id}`);
  };

  const handleLogout = () => {
    setShowModal(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem("auth");
    router.push("/login");
  };

  const cancelLogout = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="absolute top-6 left-6 right-6 z-20 flex items-center justify-start">
        <button onClick={() => setMenuOpen(prev => !prev)} className="mr-4">
          {menuOpen ? (
            <X size={28} className="text-gray-700" />
          ) : (
            <Menu size={28} className="text-gray-700" />
          )}
        </button>

        <Image
          src="/logo.png"
          alt="pet e saude"
          width={40}
          height={40}
          className="object-contain cursor-pointer"
          onClick={() => router.push("/")}
        />
      </div>

      {menuOpen && (
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          exit={{ x: -300 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-white via-gray-100 to-white shadow-2xl z-30 p-6 rounded-tr-3xl rounded-br-3xl flex flex-col justify-between"
        >
          <div>
            <div className="flex justify-between items-center mb-6">
              <Image
                src="/logo.png"
                alt="Logo"
                width={40}
                height={40}
                className="cursor-pointer"
                onClick={() => {
                  setMenuOpen(false);
                  router.push("/");
                }}
              />
              <button onClick={() => setMenuOpen(false)} className="text-gray-700 hover:text-red-500 transition">
                <X size={28} />
              </button>
            </div>

            <div className="flex flex-col gap-4 mt-4 text-gray-700 font-medium">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  router.push("/produtos");
                }}
                className="hover:text-emerald-600 transition"
              >
                Produtos
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  router.push("/exames");
                }}
                className="hover:text-emerald-600 transition"
              >
                Exames
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  router.push("/chat");
                }}
                className="hover:text-emerald-600 transition"
              >
                Chat
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  router.push("/denuncia-maus-tratos");
                }}
                className="hover:text-emerald-600 transition"
              >
                Denúncia de Maus-Tratos
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  router.push("/contatos");
                }}
                className="hover:text-emerald-600 transition"
              >
                Contatos
              </button>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="mt-6 flex items-center justify-center gap-2 bg-emerald-600 text-white py-2 px-4 rounded-xl hover:bg-emerald-700 transition"
          >
            <BsArrowLeftCircle size={22} />
            <span>Sair</span>
          </button>
        </motion.div>
      )}

      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center z-40 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Você deseja realmente sair e voltar para a página de login?
            </h2>
            <div className="flex justify-between">
              <button
                onClick={confirmLogout}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
              >
                Sim
              </button>
              <button
                onClick={cancelLogout}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
              >
                Não
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row min-h-screen">
        <div className="w-full md:hidden flex items-center justify-center bg-[#ffffff] py-1"></div>

        <div className="w-full md:w-1/2 bg-white p-8 pt-20 flex flex-col justify-between">
          <div>
            <form onSubmit={handleSearch} className="mb-6">
              <input
                type="text"
                placeholder="Buscar produtos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 w-full"
              />
            </form>

            <nav className="mb-8">
              <div className="hidden md:flex justify-center gap-10 text-gray-700 border-b-4 border-[#61a183] pb-2">
                <button onClick={() => router.push("/produtos")}>Produtos</button>
                <button onClick={() => router.push("/exames")}>Exames</button>
                <button onClick={() => router.push("/chat")}>Chat</button>
                <button onClick={() => router.push("/denuncia-maus-tratos")}>Denúncia de Maus-Tratos</button>
                <button onClick={() => router.push("/contatos")}>Contatos</button>
              </div>
              <div className="flex md:hidden justify-center flex-wrap gap-4 text-gray-700 border-b-4 border-[#61a183] pb-2">
                <button onClick={() => router.push("/produtos")}>Produtos</button>
                <button onClick={() => router.push("/exames")}>Exames</button>
                <button onClick={() => router.push("/chat")}>Chat</button>
                <button onClick={() => router.push("/denuncia-maus-tratos")}>Denúncia de Maus-Tratos</button>
                <button onClick={() => router.push("/contatos")}>Contatos</button>
              </div>
            </nav>

            <motion.h1
              className="text-2xl font-semibold mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Quem Somos
            </motion.h1>

            <p className="text-gray-800 leading-relaxed mb-6">
              Somos mais que um PetShop: somos um espaço de amor, inclusão e
              cuidado especial. Acreditamos que todo animal, independente de
              suas limitações, merece carinho, respeito e qualidade de vida.
              Criamos este projeto para dar voz e atenção aos pets com
              deficiência — porque cada vida importa, cada patinha merece apoio.
            </p>

            <p className="text-xl text-center font-medium text-emerald-700 mb-4">
              Adote um desses heróis de quatro patas e mude uma vida para
              sempre!
            </p>

            <div className="mt-4 flex flex-col items-center gap-6">
              <div className="flex gap-6">
                {order.slice(0, 3).map((i) => (
                  <motion.div
                    key={i}
                    layout
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="flex flex-col items-center"
                  >
                    <img
                      src={images[i - 1]}
                      alt={`Animal ${i}`}
                      className="w-44 h-44 object-cover rounded-xl shadow-lg"
                    />
                    <button
                      onClick={() => handleAdoptClick(i)}
                      className="mt-2 bg-emerald-600 text-white text-sm px-4 py-1 rounded-lg hover:bg-emerald-700 transition"
                    >
                      Me Adote
                    </button>
                  </motion.div>
                ))}
              </div>
              <div className="flex gap-6">
                {order.slice(3).map((i) => (
                  <motion.div
                    key={i}
                    layout
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="flex flex-col items-center"
                  >
                    <img
                      src={images[i - 1]}
                      alt={`Animal ${i}`}
                      className="w-44 h-44 object-cover rounded-xl shadow-lg"
                    />
                    <button
                      onClick={() => handleAdoptClick(i)}
                      className="mt-2 bg-emerald-600 text-white text-sm px-4 py-1 rounded-lg hover:bg-emerald-700 transition"
                    >
                      Me Adote
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="hidden md:flex w-full md:w-1/2 items-center justify-center bg-[#61a183] pt-2 pb-2">
          <img
            src="/logo da barra direita home.svg"
            alt="Ilustração"
            width={390}
            height={390}
            className="max-w-full h-auto"
          />
        </div>
      </div>
    </>
  );
}
