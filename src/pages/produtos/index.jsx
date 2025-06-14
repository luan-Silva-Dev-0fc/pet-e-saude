import Image from "next/image";
import Link from "next/link";

const produtos = [
  {
    nome: "Cadeira De 2 Rodas Cachorro Tamanho G Rogwheel Cão Pet",
    preco: "R$ 150",
    desconto: "39% OFF",
    imagem: "/produtos/cadeira-rodas.jpg",
  },
  {
    nome: "Shampoo Banho de Carinho Petz para Cães 500ml",
    preco: "R$ 19,90",
    desconto: "10% OFF",
    imagem: "/produtos/MP23715892_1.jpg",
  },
  {
    nome: "Bani 3 Pipeta Gatos Antipulgas, Vermes e Sarna Guarumo Até 2,5 Kg",
    preco: "R$ 60,07",
    desconto: "39% OFF",
    imagem: "/produtos/ea9d6baa769159a00384636c64578fe64a3f5aa4.jpg",
  },
  {
    nome: "Suplemento Avert Condroplex LB com 60 Comprimidos",
    preco: "R$ 23,90",
    desconto: "10% OFF",
    imagem: "/produtos/condroplex-lb-60-comp-caes-avert-Principal.jpg",
  },
  {
    nome: "Condroton Vetnil 500mg",
    preco: "R$ 22,90",
    desconto: "39% OFF",
    imagem: "/produtos/condroplex-500-para-caes-Principal.jpg",
  },
  {
    nome: "ADVOCATE GATOS - para gatos de 4kg até 8kg - pipeta com 0,8ml",
    preco: "R$ 23,90",
    desconto: "10% OFF",
    imagem: "/produtos/1069914-368-368.jpg",
  },
  {
    nome: "Credeli Antipulgas e Carrapatos para Gatos Elanco | Comprimido 12mg",
    preco: "R$ 23,90",
    desconto: "39% OFF",
    imagem: "/produtos/172347-800-auto.jpg",
  },
  {
    nome: "Remédio Anti Sarna Para Cachorro Gato E Coelho Saniran 30ml",
    preco: "R$ 21,40",
    desconto: "10% OFF",
    imagem:
      "/produtos/D_NQ_NP_957674-MLB75839205344_042024-O-remedio-anti-sarna-para-cachorro-gato-e-coelho-sarniran-30ml.jpg",
  },
];

export default function Produtos() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen bg-gray-100">
      <div className="p-10 bg-white overflow-y-auto">
        <h1 className="text-2xl font-bold mb-6">Veja Nossos Produtos</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {produtos.map((produto, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-xl shadow-md">
              <Image
                src={produto.imagem}
                alt={produto.nome}
                width={200}
                height={200}
                className="mb-4 rounded-lg"
              />
              <p className="text-sm text-green-600 font-semibold">
                {produto.desconto}
              </p>
              <p className="text-black font-bold">{produto.nome}</p>
              <p className="text-lg text-black font-bold">{produto.preco}</p>
              <Link href={`/detalhes/${index}`}>
                <button className="mt-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
                  Ver Detalhes
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
        <Image
          src="/cat-and-dog-animate.svg"
          alt="Imagem SVG"
          width={500}
          height={500}
        />
      </div>
    </div>
  );
}
