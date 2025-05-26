import React from "react";
import { useRouter } from "next/router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

const exames = [
  {
    id: 1,
    nome: "Hemograma Completo",
    resultadoDisponivel: true,
    animal: {
      nome: "Toby",
      especie: "Cachorro",
      raca: "SRD",
      idade: "4 anos",
      sexo: "Macho",
      foto: "/animais/animal1.jpg",
    },
    observacoes: "Jejum de 12h antes do exame.",
    resultado: "Resultado normal, sem alterações significativas.",
  },
  {
    id: 2,
    nome: "Raio-X do Tórax",
    resultadoDisponivel: false,
    animal: {
      nome: "Luna",
      especie: "Cadela",
      raca: "Border Collie",
      idade: "2 anos",
      sexo: "Fêmea",
      foto: "/animais/animal2.jpg",
    },
    observacoes: "Evitar alimentação 6h antes do exame.",
    resultado: null,
  },
  {
    id: 3,
    nome: "Glicemia em jejum",
    resultadoDisponivel: false,
    animal: {
      nome: "Mel",
      especie: "Cadela",
      raca: "Maltês",
      idade: "1 ano",
      sexo: "Fêmea",
      foto: "/animais/animal3.jpg",
    },
    observacoes: "Manter em jejum por 8h.",
    resultado: null,
  },
];

export default function ResultadoExame() {
  const router = useRouter();
  const { id } = router.query;
  const exame = exames.find((exame) => exame.id === parseInt(id));

  if (!exame) {
    return <div>Exame não encontrado.</div>;
  }

  const voltarParaLista = () => {
    router.push("/exames");
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] p-6">
      <h1 className="text-3xl font-bold text-[#61a183] mb-6">Resultado do Exame</h1>
      <Card className="rounded-2xl shadow-md border border-gray-200 bg-white">
        <img
          src={exame.animal.foto}
          alt={`Foto de ${exame.animal.nome}`}
          className="w-full h-48 object-cover rounded-t-2xl"
        />
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-[#61a183]">{exame.nome}</h2>
          </div>
          <div className="text-sm text-gray-600">
            <strong>Animal:</strong> {exame.animal.nome} ({exame.animal.especie})
          </div>
          <div className="text-sm text-gray-600">
            <strong>Raça:</strong> {exame.animal.raca} | <strong>Sexo:</strong> {exame.animal.sexo} | <strong>Idade:</strong> {exame.animal.idade}
          </div>
          <div className="text-sm text-gray-600 italic">📝 {exame.observacoes}</div>
          {exame.resultadoDisponivel ? (
            <div className="text-sm text-gray-600 mt-3">
              <strong>Resultado:</strong> {exame.resultado}
            </div>
          ) : (
            <div className="text-sm mt-3 text-red-500">
              Resultado ainda não disponível.
            </div>
          )}
          <Button onClick={voltarParaLista} className="mt-4 w-full bg-[#61a183] hover:bg-[#51996f]">
            <FileText className="w-4 h-4 mr-2" /> Voltar à lista de exames
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
