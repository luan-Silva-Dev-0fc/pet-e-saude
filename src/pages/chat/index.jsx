import { useState, useEffect, useRef } from "react";
import { PaperPlaneIcon } from "@radix-ui/react-icons";

function Message({ sender, text }) {
  const isUser = sender === "user";
  return (
    <div
      className={`p-4 rounded-xl max-w-[75%] break-words ${
        isUser
          ? "bg-blue-600 text-white self-end"
          : "bg-gray-100 text-gray-800 self-start italic"
      }`}
      style={{ wordWrap: "break-word" }}
    >
      {text}
    </div>
  );
}

export default function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [firstInteraction, setFirstInteraction] = useState(false);
  const messagesEndRef = useRef(null);
  
  // Scroll automático para última mensagem
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  const sendMessage = () => {
    if (!input.trim()) return;
    
    const newMessage = { sender: "user", text: input.trim() };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    
    if (!firstInteraction) {
      setFirstInteraction(true);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "Oi! Como posso te ajudar?" },
        ]);
      }, 500);
    } else {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "Recebi sua mensagem!" },
        ]);
      }, 1000);
    }
  };
  
  return (
    <div className="max-w-md mx-auto p-4 h-screen flex flex-col bg-gray-50">
      <div className="bg-white rounded-2xl shadow-lg p-4 flex-1 overflow-y-auto flex flex-col gap-3">
        {messages.map((msg, idx) => (
          <Message key={idx} sender={msg.sender} text={msg.text} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex items-center mt-4 gap-3">
        <input
          type="text"
          className="flex-1 p-3 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Digite sua mensagem aqui..."
          autoComplete="off"
          spellCheck={false}
        />
        <button
          onClick={sendMessage}
          aria-label="Enviar mensagem"
          className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white p-3 rounded-xl transition-colors duration-200"
          disabled={!input.trim()}
        >
          <PaperPlaneIcon />
        </button>
      </div>
    </div>
  );
}
