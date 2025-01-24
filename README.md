# Zafaloon Filmmaker 

Zafaloon Filmmaker é uma aplicação web desenvolvida com **Next.js** para gerenciar posts de um dashboard integrado. Este projeto combina frontend moderno com funcionalidades de backend, autenticação robusta e uma interface estilizada com **Tailwind CSS** e **Shadcn UI**.

## 🚀 Funcionalidades

- **Autenticação**: Sistema de login com NextAuth e JWT.
- **Dashboard**: Interface intuitiva para gerenciar posts (criação, visualização e exclusão).
- **Integração com APIs**: Suporte para exibir dados de posts.
- **Estilização Moderna**: UI construída com Tailwind CSS e Shadcn UI.

## 🛠️ Tecnologias Utilizadas

### **Frontend**
- [Next.js](https://nextjs.org/) - Framework React para desenvolvimento web.
- [Tailwind CSS](https://tailwindcss.com/) - Estilização utilitária moderna.
- [Shadcn UI](https://shadcn.dev/) - Biblioteca de componentes para React.

### **Backend**
- [NextAuth.js](https://next-auth.js.org/) - Autenticação com suporte a JWT.
- [Supabase](https://supabase.io/) - Banco de dados como serviço.

## 📂 Estrutura do Projeto

```plaintext
/src
  |-- components  # Componentes reutilizáveis (UI, modais, etc.)
  |-- pages       # Páginas do Next.js (rota /api para endpoints backend)
  |-- styles      # Arquivos de estilos customizados
  |-- utils       # Funções auxiliares (e.g., autenticação, chamadas API)
```

## 🔧 Como Rodar o Projeto Localmente

### Pré-requisitos
- Node.js (versão 16 ou superior)
- Gerenciador de pacotes (npm ou yarn)
- Conta na [Supabase](https://supabase.io/)

### Passos

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/zafaloon-filmmaker.git
   cd zafaloon-filmmaker
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:
   - Crie um arquivo `.env.local` na raiz do projeto.
   - Adicione as seguintes variáveis:
     ```plaintext
     NEXTAUTH_SECRET=your_secret_key
     NEXTAUTH_URL=http://localhost:3000
     SUPABASE_URL=your_supabase_url
     SUPABASE_KEY=your_supabase_key
     ADMIN_USER=your_admin_username
     ADMIN_PASS=your_admin_password
     ```

4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

5. Acesse o projeto em [http://localhost:3000](http://localhost:3000).

## 🤝 Contribuições

Contribuições são bem-vindas! Para contribuir:
- Faça um fork deste repositório.
- Crie uma branch com sua feature ou correção de bug: `git checkout -b minha-feature`.
- Faça o commit das suas alterações: `git commit -m 'Minha nova feature'`.
- Envie para a branch principal: `git push origin minha-feature`.

## 📄 Licença

Este projeto está sob a licença MIT.

---

💡 **Dica**: Este projeto foi desenvolvido com foco no aprendizado de tecnologias modernas de desenvolvimento web. Sinta-se à vontade para adaptá-lo às suas necessidades e evoluir com novas funcionalidades.
