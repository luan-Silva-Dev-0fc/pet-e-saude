import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

export default function DetalhesProduto() {
  const router = useRouter();
  const { id } = router.query;

  const [produto, setProduto] = useState(null);
  const [comentarios, setComentarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comentario, setComentario] = useState("");
  const [estrela, setEstrela] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchProduto = async () => {
      try {
        const response = await axios.get(`http://localhost:4028/api/detalhes/${id}`);
        setProduto(response.data);
        if (response.data.comentarios) {
          setComentarios(response.data.comentarios);
        }
      } catch (err) {
        setError("Produto não encontrado.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduto();
  }, [id]);

  const handleComentarioSubmit = async () => {
    if (comentario === "" || estrela === 0) {
      setModalMessage("Por favor, avalie o produto e adicione um comentário.");
      setModalOpen(true);
      return;
    }

    try {
      const response = await axios.post(`http://localhost:4028/api/avaliacoes/${id}`, {
        comentario,
        estrela,
      });

      setComentarios([...comentarios, { comentario, estrela }]);
      setModalMessage("Comentário enviado com sucesso!");
      setModalOpen(true);
      setComentario("");
      setEstrela(0);
    } catch (err) {
      setModalMessage("Erro ao enviar comentário. Tente novamente.");
      setModalOpen(true);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;
  if (!produto) return <p>Produto não encontrado</p>;

  return (
    <div className="min-h-screen bg-[#61a183] py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800">{produto.nome}</h1>
        <div className="mt-6 flex flex-col md:flex-row gap-6">
          <img
            src={produto.imagem}
            alt={produto.nome}
            width={300}
            height={300}
            className="rounded-lg mx-auto object-cover"
          />
          <div className="flex-1">
            <p className="text-2xl font-semibold text-gray-900">{produto.preco}</p>
            <p className="text-green-600 font-semibold mb-4">{produto.desconto}</p>
            <p className="mb-4">Aqui você pode colocar uma descrição mais detalhada sobre o produto.</p>
            <button className="bg-[#61a183] text-white px-6 py-2 rounded hover:bg-green-700 transition">
              Comprar
            </button>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Avalie o Produto</h2>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <button
                key={i}
                onClick={() => setEstrela(i)}
                className={`text-2xl ${i <= estrela ? "text-yellow-400" : "text-gray-300"}`}
              >
                ★
              </button>
            ))}
          </div>

          <textarea
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            placeholder="Escreva um comentário sobre o produto..."
            className="w-full border border-gray-300 rounded-md p-2 resize-none h-24 mt-4"
          />
          <button
            onClick={handleComentarioSubmit}
            className="mt-4 bg-[#61a183] text-white px-6 py-2 rounded hover:bg-green-700 transition"
          >
            Enviar Comentário
          </button>
        </div>

        <div className="mt-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Comentários</h3>
          <div className="space-y-4">
            {comentarios.map((comentario, index) => (
              <div key={index} className="border-b border-gray-300 pb-4">
                <p className="text-gray-800 font-semibold">Avaliação: {comentario.estrela} ★</p>
                <p>{comentario.comentario}</p>
              </div>
            ))}
          </div>
        </div>

        {modalOpen && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h3 className="text-lg font-semibold">{modalMessage}</h3>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={closeModal}
                  className="bg-[#61a183] text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
