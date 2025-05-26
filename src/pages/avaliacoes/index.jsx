'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const produtos = [
  { nome: 'Cadeira De 2 Rodas Cachorro Tamanho G Rogwheel Cão Pet', preco: 'R$ 150', desconto: '39% OFF', imagem: '/produtos/cadeira-rodas.jpg', estrelas: 5 },
  { nome: 'Shampoo Banho de Carinho Petz para Cães 500ml', preco: 'R$ 19,90', desconto: '10% OFF', imagem: '/produtos/MP23715892_1.jpg', estrelas: 4 },
  { nome: 'Bani 3 Pipeta Gatos Antipulgas, Vermes e Sarna Guarumo Até 2,5 Kg', preco: 'R$ 60,07', desconto: '39% OFF', imagem: '/produtos/ea9d6baa769159a00384636c64578fe64a3f5aa4.jpg', estrelas: 3 },
  { nome: 'Suplemento Avert Condroplex LB com 60 Comprimidos', preco: 'R$ 23,90', desconto: '10% OFF', imagem: '/produtos/condroplex-lb-60-comp-caes-avert-Principal.jpg', estrelas: 4 },
  { nome: 'Condroton Vetnil 500mg', preco: 'R$ 22,90', desconto: '39% OFF', imagem: '/produtos/condroplex-500-para-caes-Principal.jpg', estrelas: 5 },
  { nome: 'ADVOCATE GATOS - para gatos de 4kg até 8kg - pipeta com 0,8ml', preco: 'R$ 23,90', desconto: '10% OFF', imagem: '/produtos/1069914-368-368.jpg', estrelas: 4 },
  { nome: 'Credeli Antipulgas e Carrapatos para Gatos Elanco | Comprimido 12mg', preco: 'R$ 23,90', desconto: '39% OFF', imagem: '/produtos/172347-800-auto.jpg', estrelas: 3 },
  { nome: 'Remédio Anti Sarna Para Cachorro Gato E Coelho Saniran 30ml', preco: 'R$ 21,40', desconto: '10% OFF', imagem: '/produtos/D_NQ_NP_957674-MLB75839205344_042024-O-remedio-anti-sarna-para-cachorro-gato-e-coelho-sarniran-30ml.jpg', estrelas: 4 },
];

export default function Avaliacoes() {
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
                href={`/detalhes/${index}`}
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
