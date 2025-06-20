import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, FileText, CheckCircle, Clock } from "lucide-react";
import { useRouter } from "next/router";
import axios from "axios";

const statusIcon = {
  Realizado: <CheckCircle className="text-green-600" />,
  Agendado: <Clock className="text-yellow-500" />,
  Pendente: <Clock className="text-gray-500" />,
};

export default function InterfaceExames() {
  const router = useRouter();
  const [exames, setExames] = useState([]);

  useEffect(() => {
    const fetchExames = async () => {
      try {
        const response = await axios.get("http://localhost:4028/api/exames");
        const examesAdaptados = response.data.map((exame) => ({
          ...exame,
          animal: {
            nome: exame.animalnome,
            especie: "Desconhecida", 
            raca: "Desconhecida", 
            idade: "Desconhecida", 
            sexo: "Desconhecido", 
            foto: exame.animalfoto || "/default.jpg", 
          },
        }));
        setExames(examesAdaptados);
      } catch (error) {
        console.error("Erro ao buscar exames:", error);
      }
    };

    fetchExames();
  }, []);

  const handleVerResultado = (id) => {
    router.push(`/resultado/${id}`);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] p-6">
      <h1 className="text-3xl font-bold text-[#61a183] mb-6">Exames dos Animais</h1>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {exames.map((exame) => (
          <Card
            key={exame.id}
            className="rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition duration-300 bg-white"
          >
            <img
              src={exame.animal.foto} 
              alt={`Foto de ${exame.animal.nome}`}
              className="w-full h-48 object-cover rounded-t-2xl"
            />
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-[#61a183]">{exame.nome}</h2>
                {statusIcon[exame.status]}
              </div>
              <div className="text-sm text-gray-600">
                <strong>Animal:</strong> {exame.animal.nome} ({exame.animal.especie})
              </div>
              <div className="text-sm text-gray-600">
                <strong>Raça:</strong> {exame.animal.raca} | <strong>Sexo:</strong> {exame.animal.sexo} | <strong>Idade:</strong> {exame.animal.idade}
              </div>
              <div className="text-sm text-gray-600 flex items-center gap-2">
                <CalendarDays className="w-4 h-4" />
                <span>Solicitado: {exame.dataSolicitacao}</span>
              </div>
              <div className="text-sm text-gray-600 flex items-center gap-2">
                <CalendarDays className="w-4 h-4" />
                <span>Exame: {exame.dataExame}</span>
              </div>
              <div className="text-sm text-gray-600">
                <strong>Veterinário:</strong> {exame.profissional}
              </div>
              <div className="text-sm text-gray-600 italic">📝 {exame.observacoes}</div>
              {exame.resultadoDisponivel ? (
                <Button
                  onClick={() => handleVerResultado(exame.id)}
                  className="mt-3 w-full bg-[#61a183] hover:bg-[#51996f]"
                >
                  <FileText className="w-4 h-4 mr-2" /> Ver Resultado
                </Button>
              ) : (
                <Button disabled className="mt-3 w-full bg-gray-300 cursor-not-allowed">
                  <FileText className="w-4 h-4 mr-2" /> Resultado Indisponível
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
