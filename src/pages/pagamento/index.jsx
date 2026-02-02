import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CreditCard, 
  QrCode, 
  ShieldCheck, 
  ChevronRight, 
  Copy, 
  CheckCircle2,
  Lock
} from "lucide-react";

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [copied, setCopied] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
  });

  const handleCardChange = (e) => {
    let { name, value } = e.target;
    if (name === "number") {
      value = value.replace(/\D/g, "").replace(/(\d{4})(?=\d)/g, "$1 ").slice(0, 19);
    }
    if (name === "expiry") {
      value = value.replace(/\D/g, "").replace(/(\d{2})(?=\d)/g, "$1/").slice(0, 5);
    }
    if (name === "cvc") {
      value = value.replace(/\D/g, "").slice(0, 3);
    }
    setCardDetails({ ...cardDetails, [name]: value });
  };

  const copyPix = () => {
    navigator.clipboard.writeText("00020126580014BR.GOV.BCB.PIX0136petesaude-keys-random-12345");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#f8faf9] flex items-center justify-center p-4 md:p-10 font-sans">
      <div className="max-w-5xl w-full grid lg:grid-cols-2 gap-8 bg-white p-2 rounded-[3rem] shadow-2xl shadow-emerald-900/10 overflow-hidden">
        
        {/* COLUNA ESQUERDA: INTERFACE DE PAGAMENTO */}
        <div className="p-8 md:p-12">
          <header className="mb-10">
            <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-widest mb-2">
              <ShieldCheck size={16} />
              Pagamento 100% Seguro
            </div>
            <h2 className="text-3xl font-black text-gray-900">Finalizar <span className="text-[#26885a]">Contribuição</span></h2>
          </header>

          {/* SELETOR DE MÉTODO */}
          <div className="flex gap-4 mb-8">
            <MethodTab 
              active={paymentMethod === "credit"} 
              onClick={() => setPaymentMethod("credit")}
              icon={<CreditCard size={20} />}
              label="Cartão"
            />
            <MethodTab 
              active={paymentMethod === "pix"} 
              onClick={() => setPaymentMethod("pix")}
              icon={<QrCode size={20} />}
              label="PIX"
            />
          </div>

          <AnimatePresence mode="wait">
            {paymentMethod === "credit" ? (
              <motion.div 
                key="credit"
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                className="space-y-4"
              >
                <div className="space-y-1">
                  <label className="text-xs font-black text-gray-400 uppercase ml-1">Número do Cartão</label>
                  <input 
                    name="number" 
                    placeholder="0000 0000 0000 0000"
                    value={cardDetails.number}
                    onChange={handleCardChange}
                    className="payment-input"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-black text-gray-400 uppercase ml-1">Nome Impresso</label>
                  <input 
                    name="name" 
                    placeholder="NOME COMO NO CARTÃO"
                    value={cardDetails.name}
                    onChange={handleCardChange}
                    className="payment-input uppercase"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-black text-gray-400 uppercase ml-1">Validade</label>
                    <input 
                      name="expiry" 
                      placeholder="MM/AA"
                      value={cardDetails.expiry}
                      onChange={handleCardChange}
                      className="payment-input"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-black text-gray-400 uppercase ml-1">CVV</label>
                    <input 
                      name="cvc" 
                      placeholder="123"
                      value={cardDetails.cvc}
                      onChange={handleCardChange}
                      className="payment-input"
                    />
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="pix"
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                className="text-center space-y-6 py-4"
              >
                <div className="bg-gray-50 p-6 rounded-[2rem] inline-block border-2 border-emerald-50">
                  <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=PetSaudePIX" alt="QR Code" className="w-40 h-40 mix-blend-multiply" />
                </div>
                <div className="space-y-3">
                  <p className="text-sm font-medium text-gray-500">Escaneie o código ou copie a chave abaixo:</p>
                  <div 
                    onClick={copyPix}
                    className="flex items-center justify-between bg-emerald-50 p-4 rounded-2xl cursor-pointer hover:bg-emerald-100 transition-all border border-emerald-100"
                  >
                    <span className="text-xs font-bold text-emerald-800 truncate mr-4">00020126580014BR.GOV.BCB.PIX...</span>
                    {copied ? <CheckCircle2 size={18} className="text-emerald-600" /> : <Copy size={18} className="text-emerald-600" />}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button className="w-full mt-10 bg-[#26885a] hover:bg-[#1e6b47] text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-emerald-100 transition-all flex items-center justify-center gap-2 group">
            Confirmar Pagamento
            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* COLUNA DIREITA: VISUALIZAÇÃO DO CARTÃO / RESUMO */}
        <div className="bg-[#1a4d35] p-8 md:p-12 rounded-[2.8rem] flex flex-col justify-center items-center relative overflow-hidden text-white">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-20 -mt-20" />
          
          <AnimatePresence>
            {paymentMethod === "credit" ? (
              <motion.div 
                initial={{ opacity: 0, rotateY: -20 }} animate={{ opacity: 1, rotateY: 0 }}
                className="w-full max-w-[350px] aspect-[1.58/1] bg-gradient-to-br from-emerald-400 to-emerald-600 p-6 rounded-2xl shadow-2xl relative flex flex-col justify-between overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-6 opacity-20">
                  <CreditCard size={100} />
                </div>
                <div className="flex justify-between items-start relative z-10">
                  <div className="w-12 h-10 bg-amber-400/80 rounded-md" /> {/* Chip */}
                  <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-4 brightness-0 invert" alt="Visa" />
                </div>
                <div className="relative z-10">
                  <p className="text-xl font-mono tracking-[0.2em] mb-4">
                    {cardDetails.number || "•••• •••• •••• ••••"}
                  </p>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest opacity-70">Titular</p>
                      <p className="text-sm font-bold truncate max-w-[180px]">{cardDetails.name || "NOME DO CLIENTE"}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] uppercase tracking-widest opacity-70">Expira</p>
                      <p className="text-sm font-bold">{cardDetails.expiry || "MM/AA"}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
                <div className="bg-white/10 p-6 rounded-full mb-6 inline-block">
                  <Lock size={40} className="text-emerald-300" />
                </div>
                <h3 className="text-2xl font-black mb-2">Ambiente Seguro</h3>
                <p className="text-emerald-100/70 text-sm leading-relaxed max-w-[250px]">
                  Sua doação vai direto para o fundo de saúde animal. Obrigado por nos ajudar!
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-12 w-full border-t border-white/10 pt-8 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="opacity-60 font-medium">Subtotal</span>
              <span className="font-black">R$ 150,00</span>
            </div>
            <div className="flex justify-between text-lg">
              <span className="opacity-60 font-medium">Total</span>
              <span className="font-black text-emerald-400">R$ 150,00</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .payment-input {
          width: 100%;
          padding: 1rem;
          background: #f9fafb;
          border: 2px solid #f3f4f6;
          border-radius: 1.25rem;
          font-weight: 600;
          color: #1f2937;
          transition: all 0.2s;
        }
        .payment-input:focus {
          border-color: #26885a;
          background: white;
          outline: none;
          box-shadow: 0 4px 12px rgba(38, 136, 90, 0.08);
        }
      `}</style>
    </div>
  );
};

const MethodTab = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-black transition-all ${
      active 
      ? "bg-emerald-600 text-white shadow-lg shadow-emerald-100 scale-105" 
      : "bg-gray-50 text-gray-400 hover:bg-gray-100"
    }`}
  >
    {icon}
    {label}
  </button>
);

export default PaymentPage;