<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# API de Aluguel de Carros

## Descrição

Esta é uma API RESTful para um sistema de aluguel de carros desenvolvida com o framework NestJS. A API permite o gerenciamento de usuários, carros e aluguéis, com autenticação JWT e upload de imagens para os carros.

## Tecnologias Utilizadas

- NestJS
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT para autenticação
- Cloudinary para armazenamento de imagens
- Validação de dados com class-validator

## Configuração do Projeto

### Pré-requisitos

- Node.js
- pnpm
- PostgreSQL

### Instalação

```bash
$ pnpm install
```

### Configuração do Ambiente

Crie um arquivo `.env` baseado no arquivo `env.exemple` e configure as variáveis de ambiente necessárias:

```
DATABASE_URL="postgresql://usuario:senha@localhost:5432/rent_car"
JWT_SECRET="sua_chave_secreta"
PORT=3000
CLOUDINARY_CLOUD_NAME="seu_cloud_name"
CLOUDINARY_API_KEY="sua_api_key"
CLOUDINARY_API_SECRET="seu_api_secret"
```

### Executando as Migrações

```bash
$ npx prisma migrate dev
```

## Executando o Projeto

```bash
# desenvolvimento
$ pnpm run start

# modo de observação
$ pnpm run start:dev

# modo de produção
$ pnpm run start:prod
```

## Endpoints da API

### Autenticação

#### Registro de Usuário

```
POST /auth/register
```

Corpo da requisição:
```json
{
  "name": "Nome do Usuário",
  "email": "usuario@email.com",
  "password": "senha123"
}
```

#### Login

```
POST /auth/login
```

Corpo da requisição:
```json
{
  "email": "usuario@email.com",
  "password": "senha123"
}
```

Resposta:
```json
{
  "access_token": "jwt_token"
}
```

### Carros

#### Listar Todos os Carros

```
GET /cars
```

#### Obter Carro por ID

```
GET /cars/:id
```

#### Criar Novo Carro (Requer Autenticação)

```
POST /cars
```

Corpo da requisição (multipart/form-data):
```
name: "Nome do Carro"
model: "Modelo do Carro"
price: 100
year: 2023
image: [arquivo de imagem]
```

#### Atualizar Carro (Requer Autenticação)

```
PATCH /cars/:id
```

#### Excluir Carro (Requer Autenticação)

```
DELETE /cars/:id
```

### Aluguéis

#### Listar Todos os Aluguéis (Requer Autenticação)

```
GET /rents
```

#### Criar Novo Aluguel (Requer Autenticação)

```
POST /rents
```

Corpo da requisição:
```json
{
  "carId": "id_do_carro",
  "startAt": "2023-07-01T00:00:00.000Z"
}
```

## Estrutura do Banco de Dados

A API utiliza três modelos principais:

### Usuários (User)
- id: UUID
- email: String (único)
- name: String
- password: String (hash)
- role: Enum (USER, ADMIN)
- createdAt: DateTime
- updatedAt: DateTime

### Carros (Car)
- id: UUID
- name: String
- model: String
- image: String (opcional)
- price: Integer
- year: Integer
- available: Boolean
- userId: String (referência ao dono do carro)
- createdAt: DateTime
- updatedAt: DateTime

### Aluguéis (Rent)
- id: UUID
- carId: String (referência ao carro)
- userId: String (referência ao usuário)
- startAt: DateTime (data de início do aluguel)
- endAt: DateTime (data de devolução, opcional)
- createdAt: DateTime
- updatedAt: DateTime

## Executando Testes

```bash
# testes unitários
$ pnpm run test

# testes e2e
$ pnpm run test:e2e

# cobertura de testes
$ pnpm run test:cov
```

## Segurança

A API utiliza autenticação JWT para proteger rotas sensíveis. Todas as senhas são armazenadas com hash usando bcryptjs.

## CORS

A API está configurada para aceitar requisições do frontend em `http://localhost:5173`.

## Licença

Este projeto está licenciado sob a licença MIT.
