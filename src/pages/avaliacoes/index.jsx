'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import axios from 'axios';

export default function Avaliacoes() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await axios.get('http://localhost:4028/api/avaliacoes');
        setProdutos(response.data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    fetchProdutos();
  }, []);

  return (
    <div className="bg-[#61a183] min-h-screen px-4 sm:px-6 lg:px-20 py-6 text-white">
      <div className="flex items-center justify-between mb-6">
        <Link href="/" className="text-2xl font-bold">🐾 Logo</Link>
      </div>

      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-3xl font-bold text-center mb-8"
      >
        Produtos Mais Avaliados
      </motion.h1>

      <div className="flex flex-col gap-6 overflow-y-auto max-h-[75vh] pr-2">
        {produtos.map((produto, index) => (
          <div key={index} className="flex bg-white rounded-2xl text-black p-4 shadow-md gap-4 items-center">
            <img src={produto.imagem} alt={produto.nome} className="w-32 h-32 object-cover rounded-xl" />
            <div className="flex flex-col flex-1">
              <h2 className="text-lg font-semibold line-clamp-2 mb-1">{produto.nome}</h2>
              <p className="text-[#61a183] font-bold">{produto.preco}</p>
              <p className="text-sm text-gray-500">{produto.desconto}</p>
              <div className="mt-1 flex items-center gap-1">
                <span className="text-yellow-500">
                  {'★'.repeat(produto.estrelas)}{'☆'.repeat(5 - produto.estrelas)}
                </span>
                <span className="text-sm text-gray-600">(98)</span>
              </div>
              <Link
                href={`/detalhes/${produto.id || index}`}
                className="mt-2 w-fit bg-[#61a183] text-white py-1 px-4 rounded-xl hover:bg-green-700 transition"
              >
                Ver Produto
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
