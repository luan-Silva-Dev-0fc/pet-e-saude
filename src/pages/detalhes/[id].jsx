import { useRouter } from 'next/router';
import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';

const produtos = [
  { nome: 'Cadeira De 2 Rodas Cachorro Tamanho G Rogwheel Cão Pet', preco: 'R$ 150', desconto: '39% OFF', imagem: '/produtos/cadeira-rodas.jpg' },
  { nome: 'Shampoo Banho de Carinho Petz para Cães 500ml', preco: 'R$ 19,90', desconto: '10% OFF', imagem: '/produtos/shampoo.jpg' },
  { nome: 'Bani 3 Pipeta Gatos Antipulgas, Vermes e Sarna Guarumo Até 2,5 Kg', preco: 'R$ 60,07', desconto: '39% OFF', imagem: '/produtos/pipeta-gato.jpg' },
  { nome: 'Suplemento Avert Condroplex LB com 60 Comprimidos', preco: 'R$ 23,90', desconto: '10% OFF', imagem: '/produtos/suplemento.jpg' },
  { nome: 'Condroton Vetnil 500mg', preco: 'R$ 22,90', desconto: '39% OFF', imagem: '/produtos/condroton.jpg' },
  { nome: 'ADVOCATE GATOS - para gatos de 4kg até 8kg - pipeta com 0,8ml', preco: 'R$ 23,90', desconto: '10% OFF', imagem: '/produtos/advocate.jpg' },
  { nome: 'Credeli Antipulgas e Carrapatos para Gatos Elanco | Comprimido 12mg', preco: 'R$ 23,90', desconto: '39% OFF', imagem: '/produtos/credeli.jpg' },
  { nome: 'Remédio Anti Sarna Para Cachorro Gato E Coelho Saniran 30ml', preco: 'R$ 21,40', desconto: '10% OFF', imagem: '/produtos/sarna.jpg' },
];

export default function DetalhesProduto() {
  const router = useRouter();
  const { id } = router.query;
  const [estrelas, setEstrelas] = useState(0);
  const [comentario, setComentario] = useState('');

  if (!id || id >= produtos.length) {
    return <p className="p-10">Produto não encontrado</p>;
  }

  const produto = produtos[id];

  return (
    <div className="min-h-screen bg-[#61a183] py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800">{produto.nome}</h1>
        <div className="mt-6 flex flex-col md:flex-row gap-6">
          <Image
            src={produto.imagem}
            alt={produto.nome}
            width={300}
            height={300}
            className="rounded-lg mx-auto"
          />
          <div className="flex-1">
            <p className="text-2xl font-semibold text-gray-900">{produto.preco}</p>
            <p className="text-green-600 font-semibold mb-4">{produto.desconto}</p>
            <p className="mb-4">Aqui você pode colocar uma descrição mais detalhada sobre o produto.</p>

            <Link href="/pagamento">
              <button className="bg-[#61a183] text-white px-6 py-2 rounded hover:bg-green-700 transition">
                Comprar
              </button>
            </Link>

            {/* Avaliação */}
            <div className="mt-6">
              <p className="font-semibold text-gray-700 mb-2">Avalie o produto:</p>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((estrela) => (
                  <button
                    key={estrela}
                    onClick={() => setEstrelas(estrela)}
                    className={`text-2xl ${
                      estrela <= estrelas ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            {/* Comentário */}
            <div className="mt-6">
              <p className="font-semibold text-gray-700 mb-2">Deixe um comentário:</p>
              <textarea
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
                placeholder="Escreva aqui o que achou do produto..."
                className="w-full border border-gray-300 rounded-md p-2 resize-none h-24"
              />
              <button className="mt-2 bg-[#61a183] text-white px-4 py-2 rounded hover:bg-green-700 transition">
                Enviar Comentário
              </button>
            </div>
          </div>
        </div>

        {/* Produtos Recomendados */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-[#61a183] mb-4">Outros produtos recomendados</h2>
          <div className="overflow-x-auto">
            <div className="flex gap-6">
              {produtos
                .filter((_, idx) => idx != id)
                .map((p, idx) => (
                  <Link key={idx} href={`/detalhes/${idx}`} className="min-w-[200px] bg-white rounded-lg shadow-md p-4 flex-shrink-0 border border-gray-200 hover:shadow-xl transition">
                    <Image
                      src={p.imagem}
                      alt={p.nome}
                      width={150}
                      height={150}
                      className="rounded-md mx-auto"
                    />
                    <p className="text-sm font-bold text-gray-800 mt-3">{p.nome.slice(0, 50)}...</p>
                    <p className="text-[#61a183] font-semibold mt-1">{p.preco}</p>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
