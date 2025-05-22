import React from 'react';

export default function Home() {
  return (
    <div className="flex min-h-screen font-sans">
      
      <div className="w-1/2 bg-white px-12 py-10">
        
        <div className="flex items-center mb-6">
          <img
            src="/imagens/logo.png"
            alt="Logo"
            className="w-8 h-8 mr-3"
          />
          <input
            type="text"
            placeholder="Buscar Por Serviços"
            className="bg-yellow-300 text-white font-semibold px-4 py-2 rounded-full w-full focus:outline-none"
          />
        </div>

        
        <nav className="flex space-x-6 text-gray-700 text-sm mb-10">
          <a href="#" className="font-semibold">Produtos</a>
          <a href="#">Exames</a>
          <a href="#">Chat</a>
          <a href="#">Avaliações</a>
          <a href="#" className="text-gray-400">Pagamentos</a>
        </nav>

        
        <div>
          <h1 className="text-lg font-bold mb-4">Quem Somos</h1>
          <p className="text-gray-700 text-justify leading-relaxed">
            Somos mais que um PetShop: somos um espaço de amor, inclusão e cuidado especial. Acreditamos que todo animal, independente de suas limitações, merece carinho, respeito e qualidade de vida. Criamos este projeto para dar voz e atenção aos pets com deficiência — porque cada vida importa, cada patinha merece apoio.
          </p>
        </div>
      </div>


      <div className="w-1/2 bg-[#FFCC3A] flex items-center justify-center">
        <img
          src="/imagens/ilustracao-veterinario.png"
          alt="Ilustração de Veterinário"
          className="max-w-lg"
        />
      </div>
    </div>
  );
}
