# Gestão de Laudos Frontend

Frontend da aplicação de gestão de laudos forenses odontológicos.

## Tecnologias Utilizadas

- **Next.js**: Framework React para construção de SPAs e SSR.
- **Tailwind CSS**: Estilização rápida e responsiva via classes utilitárias.
- **TypeScript**: Superset de JavaScript com tipagem estática.
- **SWR**: Fetch de dados com cache automático e revalidação.
- **Supabase**: Autenticação e backend as a service.
- **Vercel**: Deploy contínuo para aplicações Next.js.

## 🚀 Como Rodar Localmente

1. **Clone o repositório**
   ```bash
   git clone https://github.com/lanalcantara/frontend-laudos.git
   cd frontend-laudos
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Inicie o servidor**
   npm run dev
      ou
   ```bash
   npm start
   ```
   
4. **Servidor rodando em**
   ```
   http://localhost:3000
   ```

   ## 📂 Estrutura de Pastas

```
/app                 # Roteamento e páginas
/components          # Componentes reutilizáveis
  /ui                # Interface (botões, inputs, etc.)
/hooks               # Hooks personalizados
/lib                 # Funções utilitárias e Supabase client
/public              # Arquivos estáticos (imagens, etc.)
/styles              # Estilos globais e Tailwind
.env.local           # Variáveis de ambiente
tailwind.config.ts   # Configuração do Tailwind
tsconfig.json        # Configuração do TypeScript
```

## Segurança
- Uso de `.env` para proteger dados sensíveis
- Middleware CORS configurado para controle de acesso

## Funcionalidades Principais
- Login, registro e autenticação de usuários
- Cadastro, edição e visualização de usuários
- Interface amigável e responsiva com Tailwind CSS
- Comunicação direta com backend via API REST
