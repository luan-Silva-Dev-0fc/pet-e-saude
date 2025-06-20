import { useState } from "react";
import axios from "axios";
import { X } from "lucide-react";

export default function Denuncia() {
  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    descricao: "",
    endereco: "",
  });

  const [denuncias, setDenuncias] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4028/api/denuncias", formData);
      alert("Denúncia registrada com sucesso!");
      setFormData({ nome: "", telefone: "", descricao: "", endereco: "" });
    } catch (error) {
      console.error("Erro ao registrar a denúncia:", error);
    }
  };

  const handleShowDenuncias = async () => {
    try {
      const response = await axios.get("http://localhost:4028/api/denuncias");
      setDenuncias(response.data);
      setShowModal(true);
    } catch (error) {
      console.error("Erro ao carregar as denúncias:", error);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 flex flex-col items-center justify-start bg-gradient-to-br from-[#61a183] to-emerald-900">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-2xl p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-[#61a183]">Denunciar Maus-Tratos</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            placeholder="Seu nome"
            required
            className="border p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#61a183]"
          />
          <input
            type="tel"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
            placeholder="Telefone"
            required
            className="border p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#61a183]"
          />
          <textarea
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            placeholder="Descrição da denúncia"
            required
            rows={4}
            className="border p-3 rounded-xl shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#61a183]"
          />
          <input
            type="text"
            name="endereco"
            value={formData.endereco}
            onChange={handleChange}
            placeholder="Endereço onde ocorreu o fato"
            required
            className="border p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#61a183]"
          />
          <button
            type="submit"
            className="bg-[#61a183] text-white py-3 rounded-xl hover:bg-emerald-700 transition"
          >
            Registrar Denúncia
          </button>
        </form>

        <button
          onClick={handleShowDenuncias}
          className="mt-2 bg-white border border-[#61a183] text-[#61a183] py-2 rounded-xl hover:bg-[#61a183] hover:text-white transition"
        >
          Ver Suas Denúncias
        </button>
      </div>

      {/* Modal de denúncias */}
      {showModal && (
        <div className="fixed bottom-4 right-4 bg-white w-96 max-h-[80vh] overflow-y-auto rounded-2xl shadow-2xl border border-gray-300 z-50">
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="text-lg font-semibold text-[#61a183]">Suas Denúncias</h3>
            <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-red-600">
              <X size={20} />
            </button>
          </div>
          <ul className="p-4 space-y-4">
            {denuncias.length === 0 ? (
              <p className="text-center text-gray-500">Nenhuma denúncia registrada.</p>
            ) : (
              denuncias.map((denuncia) => (
                <li key={denuncia.id} className="bg-gray-50 p-3 rounded-lg border">
                  <p><strong>👤 Nome:</strong> {denuncia.nome}</p>
                  <p><strong>📞 Telefone:</strong> {denuncia.telefone}</p>
                  <p><strong>📍 Endereço:</strong> {denuncia.endereco}</p>
                  <p><strong>📝 Descrição:</strong> {denuncia.descricao}</p>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
