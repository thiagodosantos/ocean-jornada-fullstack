const express = require('express')
const app = express()

// Sinaliza para o express que estamos usando JSON no body das requisições
app.use(express.json());

app.get('/', function (req, res) {
  res.send('Hello World')
});

app.get("/pontuacoes", function (req, res) {
  res.send(lista);
});

app.post("/pontuacoes", function (req, res) {
  const item = req.body;
  
  // Adiciona item na lista
  lista.push({
    "id": lista.length + 1,
    "nome": item.nome,
    "pontos": item.pontos
  })

  res.send("Item criado com sucesso!");
});

const lista = [
// As aspas nas chaves do objeto são opcionais.
  {
    "id": 1,
    "nome": "Paulo",
    "pontos": 90
  },
  {
    "id": 2,
    "nome": "Daniel",
    "pontos": 52
  },
  {
    "id": 3,
    "nome": "Beatriz",
    "pontos": 97
  }
];

app.listen(3000)

// Comando para rodar o nodemon - "npm run dev"