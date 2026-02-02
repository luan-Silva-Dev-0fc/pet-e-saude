import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, 
  Bot, 
  User, 
  ShoppingBag, 
  CreditCard, 
  HelpCircle, 
  Phone, 
  Calendar,
  Sparkles
} from "lucide-react";

export default function ChatInterface() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Oi! Sou o assistente da Pet & Saúde. 😊 Como posso ajudar você hoje?", type: "text" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [step, setStep] = useState("start"); // start, choice, redirected
  const scrollRef = useRef(null);

  // Auto-scroll para a última mensagem
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const addMessage = (sender, text) => {
    setMessages(prev => [...prev, { sender, text, type: "text" }]);
  };

  const simulateBotResponse = async (userText) => {
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsTyping(false);

    const lowerText = userText.toLowerCase();

    if (step === "start") {
      if (lowerText.includes("sim") || lowerText.includes("claro")) {
        addMessage("bot", "Ótima escolha! Vou te levar para o nosso painel de agendamentos em instantes... 🐾");
        setStep("redirected");
        setTimeout(() => window.location.href = "/agendamento", 2000);
      } else {
        addMessage("bot", "Sem problemas! Tenho essas outras opções para você. O que deseja ver?");
        setStep("choice");
      }
    } else if (step === "choice") {
      const options = {
        "1": { msg: "Abrindo catálogo de produtos... 🔍", url: "/produtos" },
        "2": { msg: "Consultando formas de pagamento... 💳", url: "/pagamento" },
        "3": { msg: "Acessando central de ajuda... ❓", url: "/ajuda" },
        "4": { msg: "Conectando com suporte... 📞", url: "/contatos" }
      };

      if (options[userText]) {
        addMessage("bot", options[userText].msg);
        setTimeout(() => window.location.href = options[userText].url, 1500);
      } else {
        addMessage("bot", "Por favor, digite apenas o número da opção (1 a 4).");
      }
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input;
    addMessage("user", userMsg);
    setInput("");
    simulateBotResponse(userMsg);
  };

  return (
    <div className="flex flex-col h-screen bg-[#f8faf9] font-sans">
      {/* HEADER DO CHAT */}
      <header className="bg-white border-b border-gray-100 p-4 flex items-center gap-3 shadow-sm">
        <div className="relative">
          <div className="bg-[#26885a] p-2 rounded-2xl shadow-lg shadow-emerald-100">
            <Bot className="text-white" size={24} />
          </div>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></div>
        </div>
        <div>
          <h2 className="text-lg font-black text-gray-800 leading-none">PetBot</h2>
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Online agora</span>
        </div>
      </header>

      {/* ÁREA DE MENSAGENS */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} items-end gap-2`}
            >
              {msg.sender === "bot" && (
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[#26885a] mb-1 shadow-sm">
                  <Bot size={16} />
                </div>
              )}
              
              <div className={`max-w-[80%] p-4 rounded-[1.5rem] text-sm font-medium shadow-sm leading-relaxed ${
                msg.sender === "user" 
                  ? "bg-[#26885a] text-white rounded-br-none" 
                  : "bg-white text-gray-700 rounded-bl-none border border-gray-100"
              }`}>
                {msg.text}
              </div>

              {msg.sender === "user" && (
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-[#26885a] mb-1 shadow-sm">
                  <User size={16} />
                </div>
              )}
            </motion.div>
          ))}

          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2 items-center text-gray-400 ml-10">
              <div className="flex gap-1 bg-white p-3 rounded-2xl border border-gray-100 shadow-sm">
                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* COMPONENTE DE OPÇÕES VISUAIS */}
        {step === "choice" && !isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-2 gap-2 ml-10">
            <QuickOption icon={<ShoppingBag size={14}/>} label="1. Produtos" onClick={() => setInput("1")} />
            <QuickOption icon={<CreditCard size={14}/>} label="2. Pagamento" onClick={() => setInput("2")} />
            <QuickOption icon={<HelpCircle size={14}/>} label="3. Ajuda" onClick={() => setInput("3")} />
            <QuickOption icon={<Phone size={14}/>} label="4. Contato" onClick={() => setInput("4")} />
          </motion.div>
        )}
      </div>

      {/* INPUT AREA */}
      <div className="p-4 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto relative flex items-center gap-2">
          <div className="absolute left-4 text-emerald-500">
            <Sparkles size={18} />
          </div>
          <input
            type="text"
            className="flex-1 pl-12 pr-14 py-4 bg-gray-50 border-2 border-transparent rounded-[2rem] focus:bg-white focus:border-[#26885a] outline-none transition-all font-medium text-gray-700 placeholder:text-gray-400"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Pergunte algo ao PetBot..."
          />
          <button
            onClick={handleSend}
            className="absolute right-2 p-3 bg-[#26885a] text-white rounded-full hover:bg-[#1e6b47] transition-all shadow-lg active:scale-90"
          >
            <Send size={18} />
          </button>
        </div>
        <p className="text-[10px] text-center text-gray-400 mt-2 font-bold uppercase tracking-widest">Powered by Pet & Saúde AI</p>
      </div>
    </div>
  );
}

function QuickOption({ icon, label, onClick }) {
  return (
    <button 
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:border-[#26885a] hover:text-[#26885a] transition-all shadow-sm active:scale-95"
    >
      {icon}
      {label}
    </button>
  );
}