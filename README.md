# Random Node para n8n

Um custom node simples que gera números aleatórios usando a API do Random.org.

## O que faz

- Gera números aleatórios entre um valor mínimo e máximo
- Usa a API do Random.org 
- Funciona como um node de transformação no n8n

## Como rodar

### Opção 1: Tudo junto (n8n + interface web)

1. Clone o repo
```bash
git clone <seu-repo>
cd Projeto-n8n
```

2. Instala as dependências
```bash
npm install
```

3. Compila
```bash
npm run build
```

4. Sobe com Docker
```bash
docker-compose up -d
```

5. Acessa:
   - **n8n**: http://localhost:5678 (admin/adminpass)
   - **Interface web**: http://localhost:3000

### Opção 2: Só a interface web

```bash
npm install
npm run build
npm run start
```

Acessa http://localhost:3000

## Interface Web

O projeto também inclui uma interface web simples para testar o gerador de números aleatórios:

1. Roda o servidor:
```bash
npm run start
```

2. Acessa http://localhost:3000

3. Digita o valor mínimo e máximo
4. Clica em "Generate"
5. Vê o número aleatório gerado

## Testando se está funcionando

### Interface Web
1. Acessa http://localhost:3000
2. Digita min=1 e max=100
3. Clica "Generate"
4. Deve aparecer um número entre 1 e 100


### n8n
1. Acessa http://localhost:5678
2. Cria workflow
3. Adiciona node "Random"
4. Configura min=1, max=100
5. Executa


## Scripts

```bash
npm run build    # Compila
npm run start    # Roda a app
npm run dev      # Modo dev
```
