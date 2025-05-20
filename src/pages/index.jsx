import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

export default function QuemSomos() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('auth') === 'true';
    if (!isLoggedIn) {
      router.push('/login');
    } else {
      setLoading(false);
    }
  }, [router]);
  
  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/produtos?search=${searchQuery}`);
  };
  
  if (loading) return null;
  
  return (
    <div className="flex h-screen">
      <div className="w-1/2 bg-white p-8 flex flex-col">
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

        <p className="text-gray-800 leading-relaxed">
          Somos mais que um PetShop: somos um espaço de amor, inclusão e cuidado especial.
          Acreditamos que todo animal, independente de suas limitações, merece carinho, respeito e qualidade de vida.
          Criamos este projeto para dar voz e atenção aos pets com deficiência — porque cada vida importa,
          cada patinha merece apoio.
        </p>
      </div>

      <div className="w-1/2" style={{ backgroundColor: '#61a183' }}>
        <div className="flex items-center justify-center h-full">
          <img
            src="/logo da barra direita home.svg"
            alt="Ilustração"
            width={390}
            height={390}
            className="max-w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
}
