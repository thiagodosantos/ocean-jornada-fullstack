const express = require('express');
const { MongoClient } = require('mongodb');

const url = "mongodb://localhost:27017";
const dbName = "jornada-fullstack-ocean";

// Declaração da função main()
async function main() {
/* 
Realizar a conexão com o MongoClient
MongoClient -> MongoDatabase - MongoCollection
Conexões com o clinet podem levar um tempo para concluir.
Portanto, utilizamos o mecanismo de Promises do JavaScript,
que permitem aguardar esse tempo. Para isso, vamos usar o async/await.
*/

console.log("Conectando com o banco de dados!");

const client = await MongoClient.connect(url);
const db = client.db(dbName);
const collection = db.collection("pontuacoes");

console.log("Banco de dados conectado com sucesso!");

const app = express()

// Sinaliza para o express que estamos usando JSON no body das requisições
app.use(express.json());

app.get('/', function (req, res) {
  res.send('Hello World')
});

app.get("/pontuacoes", async function (req, res) {
  const itens = await collection
    .find()
    .sort({ pontos: -1}) //Ordenar a pontuação do maior para o menor
    .limit(10) //Limita a visualização para 10 primeiros scores
    .toArray();

  res.send(itens);
});

app.post("/pontuacoes", async function (req, res) {
  const item = req.body;
  
  // Adiciona item na lista
  // lista.push({
  //   "id": lista.length + 1,
  //   "nome": item.nome,
  //   "pontos": item.pontos
  // })
await collection.insertOne(item);
  res.send(item);
});

// const lista = [
// // As aspas nas chaves do objeto são opcionais.
//   {
//     "id": 1,
//     "nome": "Paulo",
//     "pontos": 90
//   },
//   {
//     "id": 2,
//     "nome": "Daniel",
//     "pontos": 52
//   },
//   {
//     "id": 3,
//     "nome": "Beatriz",
//     "pontos": 97
//   }
// ];

app.listen(3000)

}
// Comando para rodar o nodemon - "npm run dev"

main();