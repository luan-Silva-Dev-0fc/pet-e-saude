# 🐾 Pet e Saúde

<p align="center">
  <img src="https://github.com/luan-Silva-Dev-0fc/pet-e-saude/blob/main/public/produtos/image.png?raw=true" width="900"/>
</p>

> **"Cuidar de quem nos faz feliz."**

O **Pet e Saúde** é uma aplicação completa de gestão pet, desenvolvida com foco em performance e experiência do usuário. O projeto utiliza **Next.js** para o frontend e **Firebase Cloud Functions** para um backend serverless robusto.

---

# 🛠️ Tecnologias

- **Frontend:** Next.js (App Router)  
- **Estilo:** Tailwind CSS  
- **Animações:** Framer Motion  
- **Backend:** Node.js 24  
- **Infraestrutura:** Google Cloud Functions (2nd Gen)  
- **Autenticação:** Firebase Authentication  
- **Banco de Dados:** Firestore  
- **UI e Ícones:** Lucide React & React Toastify  

---

# 📦 Estrutura do Projeto

O projeto é dividido em duas partes principais.

```
pet-e-saude
│
├── frontend
│   ├── app
│   ├── components
│   ├── public
│   └── styles
│
└── api-pet-e-saude
    ├── functions
    ├── controllers
    ├── routes
    └── services
```

---

# 🚀 Rodando o Projeto Localmente

## 1️⃣ Pré-requisitos

Instale:

- Node.js **18+**
- Firebase CLI

```bash
npm install -g firebase-tools
```

---

# 2️⃣ Rodando o Frontend

```bash
cd pet-e-saude-front
npm install
npm run dev
```

Abra no navegador:

```
http://localhost:3000
```

---

# 3️⃣ Rodando a API

```bash
cd api-pet-e-saude
npm install
firebase emulators:start
```

---

# 🔗 Endpoints da API

Base URL:

```
https://us-central1-pet-e-saude.cloudfunctions.net/api
```

| Método | Rota | Descrição |
|------|------|-----------|
| POST | /usuarios | Sincroniza usuário do Firebase Auth com o Firestore |
| GET | /usuarios/:uid | Retorna dados do usuário logado |

---

# 🔐 Segurança

A aplicação utiliza:

- **Firebase Authentication**
- **JWT Tokens**
- **Middleware de verificação de usuário**
- **Proteção de rotas da API**

---

# ☁️ Deploy

Frontend hospedado em:

**Vercel**

Backend hospedado em:

**Firebase Cloud Functions**

---

# 💙 Objetivo

Criar uma plataforma moderna para **gestão de saúde e cuidados de pets**, permitindo que tutores acompanhem:

- Vacinas  
- Histórico médico  
- Produtos  
- Informações de saúde  
- Alertas importantes  

Tudo de forma **simples, rápida e segura**.

---

# 👨‍💻 Autor

Desenvolvido por **Luan Silva**
