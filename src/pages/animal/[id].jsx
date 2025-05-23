import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function AnimalDetail() {
  const router = useRouter();
  const { id } = router.query;

  const animals = [
    {
      id: 1,
      nome: 'Toby',
      descricao: 'Cãozinho muito carinhoso e alegre, apesar da sua limitação em uma das suas patas.',
      imagem: '/animais/animal1.jpg',
    },
    {
      id: 2,
      nome: 'Luna',
      descricao: 'Cadela especial que adora brincar e receber carinho, possui limitação nas suas patas traseiras.',
      imagem: '/animais/animal2.jpg',
    },
    {
      id: 3,
      nome: 'Mel',
      descricao: 'Cadela cega de um olho, muito inteligente e dócil.',
      imagem: '/animais/animal3.jpg',
    },
    {
      id: 4,
      nome: 'Nina',
      descricao: 'Cadela com uma pata , mas cheia de amor para dar.',
      imagem: '/animais/animal4.jpeg',
    },
    {
      id: 5,
      nome: 'Nyx',
      descricao: 'Gata carinhosa brincalhona, com limitação nas suas patas traseiras.',
      imagem: '/animais/animal5.jpg',
    },
    {
      id: 6,
      nome: '',
      descricao: 'Cachorro com paralisia parcial, muito brincalhão e esperto.',
      imagem: '/animais/animal6.jpeg',
    },
  ];

  const animal = animals.find((a) => a.id === Number(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!animal) return <p className="text-center mt-10">Animal não encontrado.</p>;

  const handleAdoptClick = () => {
    router.push('/informacoes-adocao');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-8">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full text-center">
        <img
          src={animal.imagem}
          alt={animal.nome}
          className="w-64 h-64 object-cover rounded-xl mx-auto mb-4"
        />
        <h1 className="text-2xl font-bold mb-2">{animal.nome}</h1>
        <p className="text-gray-700">{animal.descricao}</p>
        <button
          onClick={handleAdoptClick}
          className="mt-4 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700"
        >
          Quero Adotar
        </button>
      </div>
    </div>
  );
}
