# Gerenciador de Certificados — Vite + React + Supabase

Rápido guia para rodar localmente e configurar o Supabase.

1) Criar tabela no Supabase
- Abra o Editor SQL do seu projeto Supabase e execute `sql/create_table.sql`.

2) Configurar backend (MongoDB)
- Crie um cluster no MongoDB Atlas e obtenha a `MONGODB_URI`. Veja `backend/.env.example`.

3) Instalar dependências e rodar (frontend + backend)
```bash
cd certificados-vite
# instalar dependências do frontend
npm install

# instalar dependências do backend
cd backend
npm install

# rodar backend (em outra aba/terminal)
npm run dev

# voltar ao frontend
cd ..
npm run dev
```
```bash
cd certificados-vite
npm install
npm run dev
```

O app ficará disponível em `http://localhost:5173` (padrão Vite).

Observações importantes:
- O backend agora usa MongoDB com GridFS para armazenar arquivos. Não há mais dependência do Supabase.
- O endpoint do backend serve os arquivos em `/api/files/:id` e os certificados CRUD estão expostos em `/api/certificados`.
