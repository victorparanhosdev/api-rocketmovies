const express = require("express")
const migrationsRun = require("./database/sqlite/migrations")
const routes = require("./routes")
migrationsRun()

const app = express()
app.use(express.json())

app.use(routes)





const porta = 3000;

app.listen(porta, ()=> console.log(`Servidor Funcionando na porta ${porta}`))