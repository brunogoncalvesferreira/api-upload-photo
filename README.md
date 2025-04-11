# API upload de fotos

### Como rodar 

Backend

Pré-requisitos Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas: Git, Node.js é o Docker. Além disto é bom ter um editor para trabalhar com o código como VSCode.

Rodando Backend (servidor)

```bash

# No terminal, clone o repositório
git clone https://github.com/brunogoncalvesferreira/api-upload-photo.git

# Acesse a pasta do projeto clonado
cd api-upload-photo

# Instale as dependências
npm install

# Compilar Typescript para Javascript
npm run dev:build

# Executar banco de dados com docker 
sudo docker compose up -d

# Rodar backend obs: Código dentro da pasta dist que executará.
npm run start

```