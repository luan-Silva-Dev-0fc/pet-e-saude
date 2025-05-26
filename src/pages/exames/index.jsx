import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, FileText, CheckCircle, Clock } from "lucide-react";
import { useRouter } from "next/router"; // Importando useRouter

const exames = [
  {
    id: 1,
    nome: "Hemograma Completo",
    dataSolicitacao: "2025-05-10",
    dataExame: "2025-05-12",
    status: "Realizado",
    profissional: "Dra. Ana Paula Silva",
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
  },
  {
    id: 2,
    nome: "Raio-X do Tórax",
    dataSolicitacao: "2025-05-15",
    dataExame: "2025-05-20",
    status: "Agendado",
    profissional: "Dr. Carlos Mendes",
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
  },
  {
    id: 3,
    nome: "Glicemia em jejum",
    dataSolicitacao: "2025-05-22",
    dataExame: "2025-05-25",
    status: "Pendente",
    profissional: "Dra. Julia Nogueira",
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
  },
];

const statusIcon = {
  Realizado: <CheckCircle className="text-green-600" />,
  Agendado: <Clock className="text-yellow-500" />,
  Pendente: <Clock className="text-gray-500" />,
};

export default function InterfaceExames() {
  const router = useRouter(); // Usando o hook useRouter

  const handleVerResultado = (id) => {
    router.push(`/resultado/${id}`); // Redireciona para a página de resultado
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
