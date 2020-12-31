# Project Outcault

Projeto em JS

## Installation

Para fazer o uso do projeto rode o comando:

```bash
yarn install
```

Logo em seguida rode:

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