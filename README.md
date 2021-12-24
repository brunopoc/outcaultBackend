# Project Outcault

Projeto em JS

## Installation

1) Configurar as seguintes variaveis de ambiente para o projeto:

- Hash de caracteres usado pelo sistema de cadastrado da aplicação:
  SALT_KEY 

- Endereço do banco mongodb:
 DB_CONNECT

- Forma de storage da midia: 
 STORAGE_TYPE=local

- Numero de imagens por pagina:
IMAGE_RES_PER_PAGE

- Infos da AWS:
BUCKET_NAME
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
AWS_DEFAULT_REGION

2) Para fazer o uso do projeto rode o comando:

```bash
yarn install
```

3) Logo em seguida rode:

```bash
yarn dev
```

## Usage

O projeto segue o artigo do Medium como base: [Como organizar e estruturar projetos com node.js](https://medium.com/@diomalta/como-organizar-e-estruturar-projetos-com-node-js-4845be004899).

```bash
src
│   app.ts          # Classe app
│   server.ts       # Server para iniciar o app
└───api             
  └───controllers   # Funções da controllers do express route
  └───models        # Modelos do banco de dados
  └───services      # Regras de negócio
  └───subscribers   # Eventos async 
  └───repositories* # Query builders 
└───config          # Configuração das variaveis de ambiente
└───jobs            # Tarefas de rotinas
└───loaders         # Modulos para utilizado no app
└───utils           # Trechos de código pequeno
└───helpers         # Trechos de arquitetura de código
└───routes          # Definição de rotas express
└───@types          # Tipagem (d.ts) para Typescript
└───tests           # Testes da aplicação
```

## License
[MIT](https://choosealicense.com/licenses/mit/)