import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await axios.get("http://localhost:4028/api/produtos");
        setProdutos(response.data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };
    fetchProdutos();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen bg-gray-100">
      <div className="p-10 bg-white overflow-y-auto">
        <h1 className="text-2xl font-bold mb-6">Veja Nossos Produtos</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {produtos.map((produto, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-xl shadow-md">
              <img
                src={produto.imagem}
                alt={produto.nome}
                width={200}
                height={200}
                className="mb-4 rounded-lg object-cover"
              />
              <p className="text-sm text-green-600 font-semibold">
                {produto.desconto}
              </p>
              <p className="text-black font-bold">{produto.nome}</p>
              <p className="text-lg text-black font-bold">{produto.preco}</p>
              <Link href="/pagamento">
                <button className="mt-2 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700">
                  Comprar
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div
        className="hidden md:flex items-center justify-center"
        style={{ backgroundColor: "#61a183" }}
      >
        <img
          src="/cat-and-dog-animate.svg"
          alt="Imagem SVG"
          width={500}
          height={500}
        />
      </div>
    </div>
  );
}
