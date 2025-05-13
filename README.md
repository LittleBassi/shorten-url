# 📎 SHORTEN URL

Projeto para encurtamento de URLs, iniciado em **12/05/2025**.

---

## 🚀 Como rodar o projeto

1. **Instale as dependências**:

   ```bash
   yarn
   ```

2. **Configure as variáveis de ambiente**:

   Crie um arquivo `.env` com base no `.env.example` e ajuste os valores conforme suas credenciais.

3. **Execute as migrations**:

   ```bash
   yarn migration run
   ```

4. **Inicie o projeto**:

   ```bash
   yarn start
   ```

5. **Acesse a documentação via Swagger**:

   ```
   http://localhost:${PORT}/docs
   ```

   Substitua `${PORT}` pela porta configurada no seu projeto. Caso o projeto esteja em outro ambiente, ajuste a URL conforme necessário.

---

## 💡 Considerações sobre o projeto

1. **Relacionamento entre usuário e URL**  
   Atualmente, ao tentar cadastrar uma URL já existente, é retornada a URL encurtada previamente cadastrada. Porém, o usuário que tenta fazer isso não poderá alterar ou excluir essa URL, pois ela pertence a outro usuário.  
   👉 Sugestão: criar uma tabela de relacionamento N:N entre usuários e URLs, para permitir esse controle com mais granularidade.

2. **Organização do Swagger**  
   A documentação Swagger foi implementada diretamente nas controllers, o que deixou o código mais poluído.  
   👉 Sugestão: extrair a configuração para arquivos separados, melhorando a legibilidade.

3. **Resgate do usuário logado**  
   As informações do usuário logado estão sendo recuperadas manualmente a partir da requisição em diversos pontos do código.  
   👉 Sugestão: criar um decorator customizado para obter o usuário logado, evitando repetição de código.
