import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Heart, 
  Info, 
  MapPin, 
  Calendar, 
  ShieldCheck,
  Share2
} from 'lucide-react';
import Head from 'next/head';

export default function AnimalDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [isLiked, setIsLiked] = useState(false);

  const animals = [
    { id: 1, nome: 'Toby', idade: '2 anos', tag: 'Especial', descricao: 'Cãozinho muito carinhoso e alegre, apesar da sua limitação em uma das suas patas.', imagem: '/animais/animal1.jpg' },
    { id: 2, nome: 'Luna', idade: '3 anos', tag: 'Super Dócil', descricao: 'Cadela especial que adora brincar e receber carinho, possui limitação nas suas patas traseiras.', imagem: '/animais/animal2.jpg' },
    { id: 3, nome: 'Mel', idade: '1 ano', tag: 'Inteligente', descricao: 'Cadela cega de um olho, muito inteligente e dócil.', imagem: '/animais/animal3.jpg' },
    { id: 4, nome: 'Nina', idade: '4 anos', tag: 'Amorosa', descricao: 'Cadela com uma pata traseira menor, mas cheia de amor para dar.', imagem: '/animais/animal4.jpeg' },
    { id: 5, nome: 'Nyx', idade: '6 meses', tag: 'Filhote', descricao: 'Gata carinhosa brincalhona, com limitação nas suas patas traseiras.', imagem: '/animais/animal5.jpg' },
    { id: 6, nome: 'Suki', idade: '5 anos', tag: 'Esperta', descricao: 'Cachorro com paralisia parcial, muito brincalhão e esperto.', imagem: '/animais/animal6.jpeg' },
  ];

  const animal = animals.find((a) => a.id === Number(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!animal) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="bg-gray-100 p-4 rounded-full inline-block mb-4">
          <Info size={40} className="text-gray-400" />
        </div>
        <p className="text-gray-500 font-bold text-xl">Pet não encontrado.</p>
        <button onClick={() => router.back()} className="mt-4 text-[#26885a] font-bold underline">Voltar para a lista</button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white md:bg-[#f8faf9] font-sans pb-12">
      <Head>
        <title>{animal.nome} | Detalhes da Adoção</title>
      </Head>

      {/* HEADER DE NAVEGAÇÃO */}
      <nav className="fixed top-0 inset-x-0 h-20 px-6 flex items-center justify-between z-30 bg-white/80 backdrop-blur-md md:bg-transparent">
        <button 
          onClick={() => router.back()}
          className="p-3 bg-white shadow-lg rounded-2xl text-gray-700 hover:text-[#26885a] transition-all active:scale-95"
        >
          <ArrowLeft size={24} />
        </button>
        <div className="flex gap-2">
          <button className="p-3 bg-white shadow-lg rounded-2xl text-gray-700 hover:text-blue-500 transition-all">
            <Share2 size={24} />
          </button>
          <button 
            onClick={() => setIsLiked(!isLiked)}
            className={`p-3 bg-white shadow-lg rounded-2xl transition-all active:scale-95 ${isLiked ? 'text-red-500' : 'text-gray-700'}`}
          >
            <Heart size={24} fill={isLiked ? "currentColor" : "none"} />
          </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto md:pt-24 flex flex-col md:flex-row gap-8 md:px-6">
        
        {/* GALERIA DE IMAGEM */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full md:w-1/2 relative h-[50vh] md:h-[600px]"
        >
          <img
            src={animal.imagem}
            alt={animal.nome}
            className="w-full h-full object-cover md:rounded-[3rem] shadow-2xl shadow-emerald-900/10"
          />
          <div className="absolute bottom-6 left-6 flex gap-2">
            <span className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest text-[#26885a] shadow-lg">
              {animal.tag}
            </span>
          </div>
        </motion.div>

        {/* INFORMAÇÕES */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 bg-white md:bg-transparent p-8 md:p-0 -mt-10 md:mt-0 rounded-t-[3rem] md:rounded-none z-10"
        >
          <div className="mb-6">
            <div className="flex items-center gap-2 text-[#26885a] font-bold text-sm mb-2">
              <MapPin size={16} />
              <span>Disponível em Fortaleza, CE</span>
            </div>
            <h1 className="text-5xl font-black text-gray-900 mb-2">{animal.nome}</h1>
            <div className="flex gap-4 items-center">
              <div className="flex items-center gap-1.5 text-gray-500 font-bold">
                <Calendar size={18} className="text-emerald-500" />
                <span>{animal.idade}</span>
              </div>
              <div className="h-1.5 w-1.5 rounded-full bg-gray-300" />
              <div className="text-gray-500 font-bold uppercase text-sm tracking-tighter">Vacinado & Vermifugado</div>
            </div>
          </div>

          <div className="space-y-6 mb-10">
            <h3 className="text-xl font-black text-gray-800">Sobre o {animal.nome}</h3>
            <p className="text-lg text-gray-600 leading-relaxed font-medium">
              {animal.descricao} Este pequeno herói está esperando por um lar onde possa receber 
              toda a atenção e carinho que merece. Ele se adapta muito bem a outros animais 
              e é extremamente grato por cada gesto de cuidado.
            </p>
          </div>

          {/* CARDS DE BENEFÍCIOS */}
          <div className="grid grid-cols-2 gap-4 mb-10">
            <div className="bg-emerald-50 p-4 rounded-3xl border border-emerald-100">
              <ShieldCheck className="text-[#26885a] mb-2" />
              <p className="text-sm font-black text-[#1e6b47]">Adoção Segura</p>
              <p className="text-xs text-emerald-700/70 font-bold uppercase">Suporte Vitalício</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-3xl border border-blue-100">
              <Heart className="text-blue-500 mb-2" />
              <p className="text-sm font-black text-blue-800">Cuidado Especial</p>
              <p className="text-xs text-blue-700/70 font-bold uppercase">Acompanhamento Vet</p>
            </div>
          </div>

          {/* CTA FIXO NO MOBILE */}
          <div className="fixed md:static bottom-0 inset-x-0 p-6 md:p-0 bg-white/80 md:bg-transparent backdrop-blur-lg border-t md:border-none z-20">
            <button
              onClick={() => router.push('/informacoes-adocao')}
              className="w-full bg-[#26885a] hover:bg-[#1e6b47] text-white font-black py-5 rounded-[2rem] text-xl shadow-xl shadow-emerald-100 flex items-center justify-center gap-3 transition-all active:scale-95"
            >
              Quero Adotar o {animal.nome}
              <Heart size={24} fill="white" />
            </button>
            <p className="text-center text-gray-400 text-xs font-bold mt-4 md:text-left uppercase tracking-widest">
              Ao clicar, você inicia o processo de triagem
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}