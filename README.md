# ETEC Exercícios API 📚💻

## Descrição 📝

Este projeto é uma API REST desenvolvida para facilitar a correção de exercícios dos alunos da ETEC Irmã Augustina. A API conecta-se com o GitHub para obter informações como nome, username, avatar e repositórios chamados `exercicios-pwI`, e renderiza essas informações no front-end de forma atraente e interativa. O objetivo é centralizar os dados dos alunos em um único lugar, proporcionando mais eficiência e organização para os professores na correção.

## Funcionalidades ⚙️

- Conexão com o GitHub para buscar dados dos alunos. 🔗
- Mapeamento dos exercícios realizados pelos alunos da ETEC. 📍
- Interface atrativa para facilitar a visualização e correção dos exercícios. 🎨
- Uso de ícones e design visual para tornar a experiência agradável. ✨

## Variáveis de Ambiente 🌱

Crie um arquivo `.env` na raiz do projeto com as variáveis de ambiente necessárias:

```bash
DATABASE_URL="banco://user:password@host:port/etec"
PORT=3000
GITHUB_CLIENT_ID=seu-client-id-aqui
GITHUB_CLIENT_SECRET=seu-client-secret-aqui
```

### Variáveis

- `DATABASE_URL`: URL de conexão com o banco de dados. 🗄️
- `PORT`: A porta onde a API será executada. 🔌
- `GITHUB_CLIENT_ID`: O Client ID do seu aplicativo no GitHub. 🔑
- `GITHUB_CLIENT_SECRET`: O Client Secret do seu aplicativo no GitHub. 🔒

## Como Rodar 🚀

1. Clone este repositório:

   ```bash
   git clone https://github.com/seu-usuario/exercicios-pwI-backend.git
   ```

2. Instale as dependências:

   ```bash
   cd exercicios-pwI-backend
   npm install
   ```

3. Crie e configure o arquivo `.env` com suas credenciais.

4. Inicie o servidor:

   ```bash
   npm start
   ```

5. Acesse a API na URL `http://localhost:3000`. 🌐

## Tecnologias Utilizadas ⚡

- Node.js
- Express.js
- GitHub API
- MongoDB (ou qualquer outro banco de dados configurado)

## Contribuições 🤝

Contribuições são bem-vindas! Caso queira melhorar ou sugerir algo, fique à vontade para abrir um pull request ou uma issue.

---

>>>>>>> 6b53b92 (:tada: first commit)
