# Random Node para n8n

Um custom node que gera números aleatórios verdadeiros usando a API do Random.org.




## 🚀 Instalação

### 1. Clone o repositório
```bash
git clone https://github.com/Enzocasaes/Projeto-n8n
cd Projeto-n8n
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Compile o projeto
```bash
npm run build
```

## 🐳 Executando com Docker

### Opção 1: Ambiente completo (n8n + interface web)
```bash
docker-compose up -d
```

### Opção 2: Apenas a interface web
```bash
npm run start
```

## ⚙️ Configuração do Ambiente

### Variáveis de Ambiente

O projeto usa as seguintes variáveis (já configuradas no docker-compose.yml):

```yaml
# n8n
N8N_BASIC_AUTH_ACTIVE=true
N8N_BASIC_AUTH_USER=admin
N8N_BASIC_AUTH_PASSWORD=adminpass
N8N_CUSTOM_EXTENSIONS=/home/node/.n8n/custom

# PostgreSQL
POSTGRES_USER=n8n
POSTGRES_PASSWORD=n8npass
POSTGRES_DB=n8n
```

### Banco de Dados

- **PostgreSQL** configurado automaticamente via Docker
- **Porta**: 5432
- **Dados**: Persistidos no volume `postgres_data`

### Custom Node

- **Estrutura**: `.n8n/custom/Random/` 
- **Arquivos**: `Random.node.ts` + `random-icon.svg`
- **Montagem**: Volume Docker mapeia `.n8n/custom` para `/home/node/.n8n/custom`

### Portas Utilizadas

- **n8n**: http://localhost:5678
- **Interface web**: http://localhost:3000
- **PostgreSQL**: localhost:5432

## 🧪 Executando os Testes

### Teste da Interface Web
1. Acesse http://localhost:3000
2. Digite min=1 e max=100
3. Clique "Generate"
4. Deve aparecer um número entre 1 e 100


### Teste no n8n
1. Acesse http://localhost:5678
2. Login: admin/adminpass
3. Crie um novo workflow
4. Procure por "Random" na categoria Transform
5. Selecione a operação "True Random Number Generator"
6. Configure min=1, max=100
7. Execute o workflow

## 📖 Como Usar

### Interface Web
1. Acesse http://localhost:3000
2. Digite o valor mínimo e máximo
3. Clique em "Generate"
4. Veja o número aleatório gerado

### Custom Node no n8n
1. Acesse http://localhost:5678
2. Crie um novo workflow
3. Adicione o node "Random"
4. Selecione a operação "True Random Number Generator"
5. Configure os parâmetros Min e Max
6. Execute o workflow

## 🛠️ Scripts Disponíveis

```bash
npm run build          # Compila o TypeScript
npm run start          # Executa a aplicação
npm run dev            # Modo desenvolvimento com hot reload
npm run docker:up      # Sobe os containers
npm run docker:down    # Para os containers
npm run docker:logs    # Mostra os logs
npm run docker:restart # Reinicia os containers
```