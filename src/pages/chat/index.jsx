import { useState } from "react";

export default function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [firstInteraction, setFirstInteraction] = useState(false);
  const [consultationAsked, setConsultationAsked] = useState(false);

  const typeMessage = (message, callback) => {
    let i = 0;
    const interval = setInterval(() => {
      setMessages((prev) => [
        ...prev.slice(0, prev.length - 1),
        { sender: "bot", text: message.slice(0, i + 1) },
      ]);
      i++;
      if (i === message.length) {
        clearInterval(interval);
        callback();
      }
    }, 100);
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    if (!firstInteraction) {
      setFirstInteraction(true);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: "Oi! Olá, tudo bom? Seja bem-vindo ao Apete Saúde. 😊",
          },
          {
            sender: "bot",
            text: "Como posso te ajudar? Gostaria de marcar uma consulta para seu pet? Digite 'sim' ou 'não'.",
          },
        ]);
      }, 500);
    } else if (!consultationAsked) {
      if (input.toLowerCase() === "sim") {
        setConsultationAsked(true);
        typeMessage(
          "Você será redirecionado para a página de agendamento de consulta... 🐾",
          () => {
            window.location.href = "/agendamento";
          }
        );
      } else if (input.toLowerCase() === "não") {
        typeMessage("Tudo bem! Como posso ajudar de outra forma? 😃", () => {
          setMessages((prev) => [
            ...prev,
            {
              sender: "bot",
              text: "Escolha uma opção digitando o número correspondente:",
            },
            {
              sender: "bot",
              text: "1️⃣ Ver Produtos\n2️⃣ Formas de Pagamento\n3️⃣ Ajuda\n4️⃣ Contato",
            },
          ]);
        });
      } else {
        typeMessage("Por favor, digite 'sim' ou 'não'.", () => {});
      }
    } else {
      if (input === "1") {
        typeMessage("Você será redirecionado para a página de Produtos... 🔍", () => {
          window.location.href = "/produtos";
        });
      } else if (input === "2") {
        typeMessage("Você será redirecionado para a página de Formas de Pagamento... 💳", () => {
          window.location.href = "/pagamento";
        });
      } else if (input === "3") {
        typeMessage("Você será redirecionado para a página de Ajuda... ❓", () => {
          window.location.href = "/ajuda";
        });
      } else if (input === "4") {
        typeMessage("Você será redirecionado para a página de Contato... 📞", () => {
          window.location.href = "/contatos";
        });
      } else {
        typeMessage("Opção inválida. Por favor, digite um número de 1 a 4.", () => {});
      }
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#f5f7fa] font-sans">
      <div className="flex-1 overflow-y-auto px-4 py-3">
        <div className="bg-white rounded-3xl shadow-lg p-4 flex flex-col space-y-3 h-full">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl max-w-[80%] text-sm leading-relaxed ${
                msg.sender === "user"
                  ? "bg-[#61a183] text-white self-end shadow-md"
                  : "bg-[#f0f0f0] text-gray-800 self-start shadow-lg"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 py-3 bg-white flex items-center space-x-2 border-t-2 border-[#61a183]">
        <input
          type="text"
          className="flex-1 p-3 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#61a183] placeholder:text-gray-400"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Digite sua mensagem..."
        />
        <button
          onClick={sendMessage}
          className="bg-[#61a183] hover:bg-[#51906f] text-white p-3 rounded-full transition-colors duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.5 12l15-6m0 0L15 21l-3.75-7.5m8.25-7.5L10.5 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
