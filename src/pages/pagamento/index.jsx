import React, { useState } from "react";
import { PaymentIcon } from "react-svg-credit-card-payment-icons";

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
  });

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleCardDetailsChange = (e) => {
    const { name, value } = e.target;

    if (name === "number") {
      // Remove tudo que não for número
      let formattedValue = value.replace(/\D/g, "");
      // Formata para grupos de 4 números
      formattedValue = formattedValue.replace(/(\d{4})(?=\d)/g, "$1 ");
      setCardDetails({ ...cardDetails, [name]: formattedValue });
    } else {
      setCardDetails({ ...cardDetails, [name]: value });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 via-green-500 to-green-600 flex justify-center items-center p-6">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg space-y-6">
        <h2 className="text-3xl font-semibold text-center text-gray-800">
          Escolha a Forma de Pagamento
        </h2>

        <div className="mb-4">
          <label className="block text-gray-800 text-lg mb-2">
            Forma de pagamento
          </label>
          <select
            onChange={handlePaymentMethodChange}
            value={paymentMethod}
            className="w-full p-3 border border-green-700 rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-green-500"
          >
            <option value="">Selecione uma opção</option>
            <option value="credit">Cartão de Crédito</option>
            <option value="debit">Cartão de Débito</option>
            <option value="pix">PIX</option>
          </select>
        </div>

        {paymentMethod === "credit" || paymentMethod === "debit" ? (
          <div>
            <div className="mb-4">
              <label className="block text-gray-800 text-lg mb-2">
                Número do Cartão
              </label>
              <input
                type="text"
                name="number"
                className="w-full p-3 border border-green-700 rounded-lg bg-white text-gray-800"
                placeholder="**** **** **** ****"
                value={cardDetails.number}
                onChange={handleCardDetailsChange}
                maxLength="19" // Limita o número de caracteres
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-800 text-lg mb-2">
                Nome no Cartão
              </label>
              <input
                type="text"
                name="name"
                className="w-full p-3 border border-green-700 rounded-lg bg-white text-gray-800"
                placeholder="Nome Completo"
                value={cardDetails.name}
                onChange={handleCardDetailsChange}
              />
            </div>
            <div className="mb-4 flex space-x-4">
              <div className="w-1/2">
                <label className="block text-gray-800 text-lg mb-2">
                  Data de Vencimento
                </label>
                <input
                  type="text"
                  name="expiry"
                  className="w-full p-3 border border-green-700 rounded-lg bg-white text-gray-800"
                  placeholder="MM/AA"
                  value={cardDetails.expiry}
                  onChange={handleCardDetailsChange}
                />
              </div>
              <div className="w-1/2">
                <label className="block text-gray-800 text-lg mb-2">CVV</label>
                <input
                  type="text"
                  name="cvc"
                  className="w-full p-3 border border-green-700 rounded-lg bg-white text-gray-800"
                  placeholder="***"
                  value={cardDetails.cvc}
                  onChange={handleCardDetailsChange}
                  maxLength="3" // Limita o CVV a 3 caracteres
                />
              </div>
            </div>
            <div className="mb-6 flex justify-between items-center">
              <div className="flex space-x-2">
                <PaymentIcon type="visa" width={30} />
                <PaymentIcon type="mastercard" width={30} />
                <PaymentIcon type="elo" width={30} />
              </div>
              <div className="text-sm text-gray-600">Bandeiras Aceitas</div>
            </div>
          </div>
        ) : null}

        {paymentMethod === "pix" ? (
          <div className="mb-4">
            <label className="block text-gray-800 text-lg mb-2">
              Chave PIX
            </label>
            <input
              type="text"
              className="w-full p-3 border border-green-700 rounded-lg bg-white text-gray-800"
              value={"Sua chave PIX aqui"}
              onChange={() => {}}
              placeholder="Informe sua chave PIX"
            />
            <div className="mt-4">
              <h3 className="text-gray-800 text-xl">QR Code do Pix</h3>

              <img
                src="/qr code.jpeg"
                alt="QR Code do PIX"
                className="w-full h-auto rounded-lg"
              />
            </div>
            <div className="mt-6 text-center text-gray-800">
              <p>
                "Sua contribuição pode transformar vidas. Ajude agora, o futuro
                depende de você!"
              </p>
            </div>
          </div>
        ) : null}

        <div className="text-center mt-6">
          <button
            className="w-full px-6 py-3 bg-green-600 text-white text-lg rounded-lg hover:bg-green-700 transition duration-300 ease-in-out"
            disabled={!paymentMethod}
          >
            Pagar Agora
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
