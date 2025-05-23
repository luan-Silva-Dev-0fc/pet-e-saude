import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { Menu, ArrowLeft } from 'lucide-react';

export default function QuemSomos() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [order, setOrder] = useState([1, 2, 3, 4, 5, 6]);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('auth') === 'true';
    if (!isLoggedIn) {
      router.push('/login');
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
    '/animais/animal1.jpg',
    '/animais/animal2.jpg',
    '/animais/animal3.jpg',
    '/animais/animal4.jpeg',
    '/animais/animal5.jpg',
    '/animais/animal6.jpeg',
  ];

  const handleAdoptClick = (id) => {
    router.push(`/animal/${id}`);
  };

  return (
    <>
      <div className="absolute top-6 left-6 z-20">
        <button onClick={() => setMenuOpen(true)}>
          <Menu className="text-gray-700" size={28} />
        </button>
      </div>

      {menuOpen && (
        <div className="fixed top-0 left-0 h-full w-64 bg-gray-100 shadow-lg z-30 p-6 flex flex-col gap-4">
          <button
            onClick={() => router.push('/login')}
            className="flex items-center gap-2 text-gray-800 hover:text-emerald-600"
          >
            <ArrowLeft size={20} />
            Voltar para Login
          </button>
          <button
            onClick={() => setMenuOpen(false)}
            className="text-sm text-gray-600 hover:underline mt-auto"
          >
            Fechar menu
          </button>
        </div>
      )}

      <div className="flex min-h-screen">
        <div className="w-1/2 bg-white p-8 pt-20 flex flex-col justify-between">
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

            <nav className="space-x-6 text-gray-700 mb-8">
              <button onClick={() => router.push('/produtos')}>Produtos</button>
              <button onClick={() => router.push('/exames')}>Exames</button>
              <button onClick={() => router.push('/chat')}>Chat</button>
              <button onClick={() => router.push('/avaliacoes')}>Avaliações</button>
              <button onClick={() => router.push('/pagamentos')}>Pagamentos</button>
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
              Somos mais que um PetShop: somos um espaço de amor, inclusão e cuidado especial.
              Acreditamos que todo animal, independente de suas limitações, merece carinho, respeito e qualidade de vida.
              Criamos este projeto para dar voz e atenção aos pets com deficiência — porque cada vida importa,
              cada patinha merece apoio.
            </p>

            <p className="text-xl text-center font-medium text-emerald-700 mb-4">
              Adote um desses heróis de quatro patas e mude uma vida para sempre!
            </p>

            <div className="mt-4 flex flex-col items-center gap-6">
              <div className="flex gap-6">
                {order.slice(0, 3).map((imageIndex) => (
                  <motion.div
                    key={imageIndex}
                    layout
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="flex flex-col items-center"
                  >
                    <img
                      src={images[imageIndex - 1]}
                      alt={`Animal ${imageIndex}`}
                      className="w-44 h-44 object-cover rounded-xl shadow-lg"
                    />
                    <button
                      onClick={() => handleAdoptClick(imageIndex)}
                      className="mt-2 bg-emerald-600 text-white text-sm px-4 py-1 rounded-lg hover:bg-emerald-700 transition"
                    >
                      Me Adote
                    </button>
                  </motion.div>
                ))}
              </div>
              <div className="flex gap-6">
                {order.slice(3).map((imageIndex) => (
                  <motion.div
                    key={imageIndex}
                    layout
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="flex flex-col items-center"
                  >
                    <img
                      src={images[imageIndex - 1]}
                      alt={`Animal ${imageIndex}`}
                      className="w-44 h-44 object-cover rounded-xl shadow-lg"
                    />
                    <button
                      onClick={() => handleAdoptClick(imageIndex)}
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

        <div className="w-1/2 flex items-center justify-center" style={{ backgroundColor: '#61a183' }}>
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
