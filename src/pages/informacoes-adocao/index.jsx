import { useState } from 'react';
import { useRouter } from 'next/router';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function InformacoesAdocao() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true); 
  };

  const closeModal = () => {
    setShowModal(false);
    router.push('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#61a183' }}>
      <div className="bg-white p-8 rounded-xl shadow-xl max-w-lg w-full relative">
        <button
          onClick={() => router.back()}
          className="mb-4 flex items-center text-gray-600 hover:text-emerald-700"
        >
          <ArrowLeft className="mr-2" size={20} />
          Voltar
        </button>

        <motion.h1
          className="text-2xl font-bold text-center text-emerald-700 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Informações para Adoção
        </motion.h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input type="text" placeholder="Nome completo" required className="border rounded-lg p-2" />
          <input type="email" placeholder="E-mail para contato" required className="border rounded-lg p-2" />
          <input type="tel" placeholder="Telefone" required className="border rounded-lg p-2" />
          <input type="text" placeholder="Cidade e Estado" required className="border rounded-lg p-2" />
          <textarea
            placeholder="Por que você quer adotar esse animal?"
            rows={4}
            required
            className="border rounded-lg p-2 resize-none"
          />
          <textarea
            placeholder="Como é o ambiente onde o animal irá viver?"
            rows={4}
            required
            className="border rounded-lg p-2 resize-none"
          />
          <button type="submit" className="bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700">
            Enviar Formulário
          </button>
        </form>
      </div>

      
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            className="bg-white rounded-lg p-6 max-w-sm text-center shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-semibold text-emerald-700 mb-2">Sucesso!</h2>
            <p className="text-gray-700 mb-4">
              Seu formulário foi enviado com sucesso. Entraremos em contato em breve!
            </p>
            <button
              onClick={closeModal}
              className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700"
            >
              Ok
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
