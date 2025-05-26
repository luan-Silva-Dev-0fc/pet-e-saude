import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Contatos() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("auth") === "true";
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) return null;

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 p-8">
        <h1 className="text-3xl font-bold text-emerald-700 mb-4">
          Entre em Contato
        </h1>
        <p className="text-gray-700 mb-6">
          Estamos localizados no Edifício Manhattan, no coração da Aldeota,
          Fortaleza. Se você tiver dúvidas, sugestões ou quiser fazer parte do
          nosso projeto, entre em contato pelos canais abaixo:
        </p>

        <div className="space-y-4 text-gray-800">
          <p>
            <strong>Telefone:</strong> (85) 91234-5678
          </p>
          <p>
            <strong>Email:</strong> contato@petesaude.org.br
          </p>
          <p>
            <strong>Endereço:</strong> Edifício Manhattan, Avenida Santos
            Dumont, 1510 - Aldeota, Fortaleza - CE
          </p>
        </div>

        <div className="mt-8">
          <button
            onClick={() => router.push("/")}
            className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition"
          >
            Voltar à Home
          </button>
        </div>
      </div>

      <div className="w-full md:w-1/2 h-96 md:h-auto">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.616226256544!2d-46.65598108440661!3d-23.5841310685784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c7a4e458a1%3A0x2b61c24f8dc67e2e!2sEdif%C3%ADcio%20Manhattan%20-%20Aldeota!5e0!3m2!1spt-BR!2sbr!4v1716654321013!5m2!1spt-BR!2sbr"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}
