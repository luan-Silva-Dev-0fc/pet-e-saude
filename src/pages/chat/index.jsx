import { useState } from "react";

export default function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [firstInteraction, setFirstInteraction] = useState(false);

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessage = { sender: "user", text: input };
    setMessages(prev => [...prev, newMessage]);
    setInput("");

    if (!firstInteraction) {
      setFirstInteraction(true);
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          { sender: "bot", text: "Oi! Como posso te ajudar?" }
        ]);
      }, 500);
    } else {
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          { sender: "bot", text: "Recebi sua mensagem!" }
        ]);
      }, 1000);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 h-screen flex flex-col bg-[#f5f7fa] font-sans">
      <div className="bg-white rounded-3xl shadow-md p-4 flex-1 overflow-y-auto space-y-3">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded-2xl max-w-[75%] text-sm leading-relaxed ${
              msg.sender === "user"
                ? "bg-[#61a183] text-white self-end"
                : "bg-gray-100 text-gray-800 self-start"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="flex items-center mt-4 gap-2">
        <input
          type="text"
          className="flex-1 p-3 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#61a183]"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendMessage()}
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
