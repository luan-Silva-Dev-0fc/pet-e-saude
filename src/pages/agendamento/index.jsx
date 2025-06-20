import { useState } from "react";
import Head from "next/head";
import axios from "axios";

export default function Agendamento() {
  const [pet, setPet] = useState("");
  const [dataHora, setDataHora] = useState("");
  const [tipoConsulta, setTipoConsulta] = useState("");
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [agendado, setAgendado] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(null);

  const handleAgendar = async () => {
    if (pet && dataHora && tipoConsulta && nome && telefone) {
      setLoading(true);
      try {
        await axios.post("http://localhost:4028/api/agendamentos", {
          pet,
          dataHora,
          tipoConsulta,
          nome,
          telefone,
          ligadoAExame: tipoConsulta === "exame"
        });
        setAgendado(true);
        setShowModal("sucesso");
      } catch (error) {
        console.error("Erro ao agendar:", error);
        setShowModal("erro");
      } finally {
        setLoading(false);
      }
    } else {
      setShowModal("erro");
    }
  };

  const Modal = ({ mensagem }) => (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl text-center space-y-4 max-w-sm w-full">
        <p className="text-[#61a183] font-semibold">{mensagem}</p>
        <button
          onClick={() => setShowModal(null)}
          className="bg-[#61a183] text-white px-4 py-2 rounded hover:bg-[#51906f]"
        >
          OK
        </button>
      </div>
    </div>
  );

  return (
    <>
      <Head>
        <title>Agendamento de Consulta | Apete Saúde</title>
        <meta name="description" content="Agende uma consulta para seu pet com a Apete Saúde." />
      </Head>

      {showModal === "sucesso" && <Modal mensagem="Agendamento feito com sucesso!" />}
      {showModal === "erro" && <Modal mensagem="Por favor, preencha todos os campos." />}

      <div className="bg-[#f5f7fa] min-h-screen flex flex-col">
        <div className="max-w-4xl mx-auto py-12 px-6">
          <h1 className="text-3xl font-bold text-[#61a183] text-center mb-8">
            Agendamento de Consulta
          </h1>

          {!agendado ? (
            <div className="bg-white p-8 rounded-xl shadow-lg space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold">Selecione o Pet</label>
                <select
                  className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
                  value={pet}
                  onChange={(e) => setPet(e.target.value)}
                >
                  <option value="">Escolha um pet</option>
                  <option value="dog">Cachorro</option>
                  <option value="cat">Gato</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold">Tipo de Consulta</label>
                <select
                  className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
                  value={tipoConsulta}
                  onChange={(e) => setTipoConsulta(e.target.value)}
                >
                  <option value="">Escolha o tipo de consulta</option>
                  <option value="consulta">Consulta Inicial</option>
                  <option value="exame">Exame</option>
                  <option value="vacina">Vacinação</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold">Data e Hora</label>
                <input
                  type="datetime-local"
                  className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
                  value={dataHora}
                  onChange={(e) => setDataHora(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold">Seu Nome</label>
                <input
                  type="text"
                  className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold">Seu Telefone</label>
                <input
                  type="text"
                  className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                />
              </div>

              <div className="flex justify-center">
                <button
                  onClick={handleAgendar}
                  className={`bg-[#61a183] text-white px-6 py-3 rounded-lg hover:bg-[#51906f] transition duration-200 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                  disabled={loading}
                >
                  {loading ? "Agendando..." : "Agendar Consulta"}
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white p-8 rounded-xl shadow-lg space-y-6">
              <h2 className="text-xl font-bold text-[#61a183] text-center mb-6">
                Resumo do Agendamento
              </h2>
              <div>
                <p className="font-semibold text-gray-700">
                  Pet: {pet === "dog" ? "Cachorro - Fido" : "Gato - Nino"}
                </p>
                <p className="font-semibold text-gray-700">Tipo de Consulta: {tipoConsulta}</p>
                <p className="font-semibold text-gray-700">Data e Hora: {dataHora}</p>
                <p className="font-semibold text-gray-700">Nome: {nome}</p>
                <p className="font-semibold text-gray-700">Telefone: {telefone}</p>
              </div>
              <div className="flex justify-center">
                <button
                  onClick={() => setAgendado(false)}
                  className="bg-[#61a183] text-white px-6 py-3 rounded-lg hover:bg-[#51906f] transition duration-200"
                > {/* tudo pronto */}
                  Confirmar Agendamento
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
