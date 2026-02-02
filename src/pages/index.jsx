import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, X, Search, LogOut, MessageCircle, 
  Stethoscope, ShoppingBag, ShieldAlert, Phone, Heart 
} from "lucide-react";
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
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return null;

  const images = [
    "/animais/animal1.jpg", "/animais/animal2.jpg", "/animais/animal3.jpg",
    "/animais/animal4.jpeg", "/animais/animal5.jpg", "/animais/animal6.jpeg",
  ];

  const menuItems = [
    { label: "Produtos", icon: ShoppingBag, path: "/produtos" },
    { label: "Exames", icon: Stethoscope, path: "/exames" },
    { label: "Chat", icon: MessageCircle, path: "/chat" },
    { label: "Denúncias", icon: ShieldAlert, path: "/denuncia-maus-tratos" },
    { label: "Contatos", icon: Phone, path: "/contatos" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* HEADER / NAV MOBILE */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md z-40 border-b border-gray-100 px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setMenuOpen(true)} 
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Menu size={24} className="text-gray-700" />
          </button>
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push("/")}>
            <div className="bg-[#26885a] p-1.5 rounded-lg">
              <Heart size={20} className="text-white" fill="white" />
            </div>
            <span className="font-black text-lg text-gray-800 tracking-tighter">PET & SAÚDE</span>
          </div>
        </div>

        <div className="relative hidden md:block w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Buscar no portal..."
            className="w-full bg-gray-100 border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-[#61a183] transition-all outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </header>

      {/* SIDEBAR OVERLAY */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className="fixed top-0 left-0 h-full w-72 bg-white z-[60] shadow-2xl p-6 flex flex-col"
            >
              <div className="flex items-center justify-between mb-10">
                <span className="font-black text-[#26885a]">MENU PRINCIPAL</span>
                <button onClick={() => setMenuOpen(false)} className="p-1 hover:bg-gray-100 rounded-lg">
                  <X size={24} />
                </button>
              </div>

              <nav className="flex-1 space-y-2">
                {menuItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => { setMenuOpen(false); router.push(item.path); }}
                    className="w-full flex items-center gap-4 p-3 rounded-xl text-gray-600 hover:bg-emerald-50 hover:text-[#26885a] transition-all font-semibold"
                  >
                    <item.icon size={20} />
                    {item.label}
                  </button>
                ))}
              </nav>

              <button
                onClick={() => setShowModal(true)}
                className="mt-auto flex items-center justify-center gap-2 bg-red-50 text-red-600 py-3 rounded-xl hover:bg-red-100 transition-colors font-bold"
              >
                <LogOut size={20} />
                Sair da Conta
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main className="pt-24 pb-12 px-6 max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
        {/* CONTEÚDO ESQUERDA */}
        <div className="flex-1">
          <nav className="flex gap-4 mb-8 overflow-x-auto pb-2 scrollbar-hide">
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={() => router.push(item.path)}
                className="whitespace-nowrap px-4 py-2 rounded-full bg-white border border-gray-200 text-sm font-bold text-gray-600 hover:border-[#26885a] hover:text-[#26885a] transition-all shadow-sm"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">
              Quem <span className="text-[#26885a]">Somos</span>
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Somos mais que um PetShop: somos um espaço de amor, inclusão e
              cuidado especial. Acreditamos que todo animal, independente de
              suas limitações, merece carinho, respeito e qualidade de vida.
            </p>

            <div className="bg-[#26885a]/10 p-6 rounded-[2rem] border border-[#26885a]/20 mb-10">
              <p className="text-xl font-bold text-[#1e6b47] text-center">
                🐾 Adote um desses heróis de quatro patas e mude uma vida!
              </p>
            </div>

            {/* GRID DE ANIMAIS */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
              {order.map((i) => (
                <motion.div
                  key={i}
                  layout
                  className="group relative bg-white rounded-[2rem] overflow-hidden shadow-md hover:shadow-xl transition-all"
                >
                  <img
                    src={images[i - 1]}
                    alt="Pet"
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
                    <button
                      onClick={() => router.push(`/animal/${i}`)}
                      className="bg-white text-[#26885a] font-bold py-2 rounded-xl text-sm hover:bg-[#26885a] hover:text-white transition-colors"
                    >
                      Me Adote
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ILUSTRAÇÃO DIREITA (HIDDEN MOBILE) */}
        <div className="hidden lg:flex w-[400px] flex-col items-center">
           <div className="sticky top-24 w-full bg-[#61a183] rounded-[3rem] p-8 flex items-center justify-center shadow-2xl">
              <img
                src="/logo da barra direita home.svg"
                alt="Pet Illustration"
                className="w-full h-auto drop-shadow-2xl animate-pulse-slow"
              />
           </div>
        </div>
      </main>

      {/* MODAL DE LOGOUT */}
      <AnimatePresence>
        {showModal && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 flex justify-center items-center z-[100] bg-black/60 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              className="bg-white p-8 rounded-[2.5rem] shadow-2xl w-full max-w-sm text-center"
            >
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600">
                <LogOut size={32} />
              </div>
              <h2 className="text-2xl font-black text-gray-800 mb-2">Sair agora?</h2>
              <p className="text-gray-500 mb-8">Você precisará fazer login novamente para acessar o portal.</p>
              <div className="flex gap-3">
                <button
                  onClick={() => { localStorage.removeItem("auth"); router.push("/login"); }}
                  className="flex-1 px-4 py-3 bg-red-600 text-white rounded-2xl font-bold hover:bg-red-700 transition-colors"
                >
                  Sair
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-2xl font-bold hover:bg-gray-200 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
      `}</style>
    </div>
  );
}