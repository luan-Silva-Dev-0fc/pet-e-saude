import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

export default function HelpInterface() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { label: "Introdução ao Serviço", href: "#intro" },
    { label: "Cadastro e Login", href: "#cadastro" },
    { label: "Produtos", href: "#produtos" },
    { label: "Formas de Pagamento", href: "#pagamento" },
    { label: "Exames e Cuidados", href: "#exames" },
    { label: "Entrega e Devoluções", href: "#entrega" },
    { label: "FAQ", href: "#faq" },
    { label: "Contato", href: "#contato" },
  ];

  return (
    <div className="flex flex-col h-screen bg-[#f5f7fa] font-sans">
      <header className="bg-white shadow-md px-4 py-3 flex items-center justify-between">
        <a href="/" className="text-xl font-bold text-[#61a183]">
          Apete Saúde
        </a>
        <nav className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-gray-700 hover:text-[#61a183]"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>
      </header>

      {menuOpen && (
        <div className="md:hidden bg-white shadow-md px-4 py-2 space-y-2">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="block text-gray-700 hover:text-[#61a183]"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-4 py-3">
        <div className="bg-white rounded-3xl shadow-md p-6">
          <section id="intro">
            <h2 className="text-2xl font-bold text-[#61a183]">Introdução ao Serviço</h2>
            <p className="mt-2 text-gray-700">
              Apete Saúde oferece uma plataforma para cuidados de saúde e produtos para o seu pet. Navegue pelos diferentes
              serviços e produtos que temos para oferecer, incluindo controle de saúde, compras e mais.
            </p>
          </section>

          <section id="cadastro" className="mt-6">
            <h2 className="text-2xl font-bold text-[#61a183]">Cadastro e Login</h2>
            <p className="mt-2 text-gray-700">
              Para criar uma conta, basta acessar a seção de cadastro e preencher as informações necessárias. Se você
              esqueceu a senha, clique em "Esqueci minha senha" e siga as instruções.
            </p>
          </section>

          <section id="produtos" className="mt-6">
            <h2 className="text-2xl font-bold text-[#61a183]">Produtos</h2>
            <p className="mt-2 text-gray-700">
              Nós oferecemos uma grande variedade de produtos para seu pet. Desde alimentos até medicamentos e acessórios.
              Use os filtros para encontrar o produto ideal para seu pet.
            </p>
          </section>

          <section id="pagamento" className="mt-6">
            <h2 className="text-2xl font-bold text-[#61a183]">Formas de Pagamento</h2>
            <p className="mt-2 text-gray-700">
              Aceitamos diversas formas de pagamento, incluindo cartão de crédito, boleto, e PIX. Todas as transações são
              seguras.
            </p>
          </section>

          <section id="exames" className="mt-6">
            <h2 className="text-2xl font-bold text-[#61a183]">Exames e Cuidados</h2>
            <p className="mt-2 text-gray-700">
              Agende exames para seu pet facilmente. Acompanhe a saúde do seu pet e mantenha o controle de suas vacinas e
              tratamentos.
            </p>
          </section>

          <section id="entrega" className="mt-6">
            <h2 className="text-2xl font-bold text-[#61a183]">Entrega e Devoluções</h2>
            <p className="mt-2 text-gray-700">
              Nós entregamos em várias regiões. Caso haja algum problema com seu pedido, oferecemos uma política de
              devolução e troca.
            </p>
          </section>

          <section id="faq" className="mt-6">
            <h2 className="text-2xl font-bold text-[#61a183]">FAQ</h2>
            <ul className="mt-2 text-gray-700 space-y-2">
              <li>
                <strong>Pergunta:</strong> Como criar uma conta?
                <p className="ml-4">Clique em "Cadastrar" na página inicial e preencha os dados.</p>
              </li>
              <li>
                <strong>Pergunta:</strong> Como fazer o pagamento de um produto?
                <p className="ml-4">Escolha a forma de pagamento desejada no checkout.</p>
              </li>
            </ul>
          </section>

          <section id="contato" className="mt-6">
            <h2 className="text-2xl font-bold text-[#61a183]">Contato</h2>
            <p className="mt-2 text-gray-700">
              Se você precisar de ajuda, entre em contato com nossa equipe pelo formulário abaixo ou pelo e-mail
              <strong>contato@apetesaude.com</strong>.
            </p>
            <form className="mt-4">
              <input
                type="text"
                placeholder="Seu nome"
                className="p-2 w-full mb-2 border border-gray-300 rounded"
              />
              <textarea
                placeholder="Sua mensagem"
                className="p-2 w-full mb-2 border border-gray-300 rounded"
                rows="4"
              />
              <button
                type="submit"
                className="bg-[#61a183] text-white px-4 py-2 rounded-full"
              >
                Enviar
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
