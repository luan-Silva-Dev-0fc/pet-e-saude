import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, ShoppingBag, Star, ArrowRight, Tag } from "lucide-react";
import Link from "next/link";
import Head from "next/head";

export default function Produtos() {
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);

  // Simulação de Produtos via CDN/Imagens Externas
  const produtosSimulados = [
    {
      id: 1,
      nome: "Ração Premium Nature",
      preco: "R$ 189,90",
      desconto: "15% OFF",
      imagem: "https://images.unsplash.com/photo-1589924691106-073b69a59b86?auto=format&fit=crop&q=80&w=400",
      categoria: "Alimentação"
    },
    {
      id: 2,
      nome: "Cama Ortopédica Cloud",
      preco: "R$ 245,00",
      desconto: "Frete Grátis",
      imagem: "https://images.unsplash.com/photo-1591946614720-90a587da4a36?auto=format&fit=crop&q=80&w=400",
      categoria: "Acessórios"
    },
    {
      id: 3,
      nome: "Brinquedo Interativo Kong",
      preco: "R$ 79,00",
      desconto: "Leve 2 Pague 1",
      imagem: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&q=80&w=400",
      categoria: "Brinquedos"
    },
    {
      id: 4,
      nome: "Shampoo Hipoalergênico",
      preco: "R$ 45,90",
      desconto: "Novidade",
      imagem: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=400",
      categoria: "Higiene"
    }
  ];

  useEffect(() => {
    setTimeout(() => setLoading(false), 800);
  }, []);

  const addToCart = () => {
    setCartCount(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col md:flex-row overflow-hidden">
      <Head>
        <title>Loja Pet & Saúde | Os Melhores Produtos</title>
      </Head>

      {/* COLUNA DA ESQUERDA: LISTAGEM */}
      <div className="w-full md:w-3/5 lg:w-2/3 p-6 md:p-12 overflow-y-auto max-h-screen custom-scrollbar">
        <header className="flex justify-between items-end mb-12">
          <div>
            <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-widest mb-2">
              <ShoppingBag size={16} />
              Pet Shop Online
            </div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">
              Produtos <span className="text-[#26885a]">Essenciais</span>
            </h1>
          </div>

          {/* Carrinho Flutuante */}
          <div className="relative p-4 bg-gray-50 rounded-2xl group cursor-pointer">
            <ShoppingCart className="text-gray-800 group-hover:text-emerald-600 transition-colors" />
            <span className="absolute -top-2 -right-2 bg-[#26885a] text-white text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center border-4 border-white">
              {cartCount}
            </span>
          </div>
        </header>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-80 bg-gray-100 animate-pulse rounded-[2.5rem]" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {produtosSimulados.map((produto) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                key={produto.id}
                className="group relative bg-white border border-gray-100 rounded-[2.5rem] p-4 transition-all hover:shadow-2xl hover:shadow-emerald-900/5 hover:-translate-y-1"
              >
                {/* Badge de Desconto */}
                <div className="absolute top-6 left-6 z-10 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                  <Tag size={12} className="text-emerald-600" />
                  <span className="text-[10px] font-black text-gray-800 uppercase tracking-tighter">
                    {produto.desconto}
                  </span>
                </div>

                {/* Imagem do Produto */}
                <div className="aspect-square rounded-[2rem] overflow-hidden mb-6 bg-gray-50">
                  <img
                    src={produto.imagem}
                    alt={produto.nome}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>

                <div className="px-2 pb-2">
                  <div className="flex items-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star key={star} size={10} className="fill-amber-400 text-amber-400" />
                    ))}
                    <span className="text-[10px] text-gray-400 font-bold ml-1">(4.9)</span>
                  </div>
                  
                  <h3 className="text-lg font-black text-gray-800 mb-1 leading-tight group-hover:text-emerald-700 transition-colors">
                    {produto.nome}
                  </h3>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                    {produto.categoria}
                  </p>

                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-2xl font-black text-gray-900">{produto.preco}</span>
                    <Link href="/pagamento">
                      <button 
                        onClick={addToCart}
                        className="bg-emerald-600 text-white p-3 rounded-2xl hover:bg-emerald-700 transition-all active:scale-90"
                      >
                        <ArrowRight size={20} />
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* COLUNA DA DIREITA: DESTAQUE VISUAL */}
      <div 
        className="hidden md:flex flex-1 flex-col items-center justify-center p-12 relative overflow-hidden"
        style={{ backgroundColor: "#26885a" }}
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl -ml-10 -mb-10" />

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center"
        >
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/pet-care-illustration-download-in-svg-png-gif-file-formats--veterinary-shop-pack-healthcare-illustrations-4796213.png"
            alt="Ilustração Pet"
            className="w-full max-w-md mx-auto drop-shadow-2xl mb-8"
          />
          <h2 className="text-white text-3xl font-black mb-4 px-10 leading-tight">
            Tudo o que seu pet <span className="text-emerald-300">ama</span> em um só lugar.
          </h2>
          <p className="text-emerald-100/70 font-medium px-12">
            Produtos selecionados por veterinários para garantir a saúde e felicidade do seu melhor amigo.
          </p>
        </motion.div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #26885a;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}