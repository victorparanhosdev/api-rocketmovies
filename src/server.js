require("express-async-errors")
const express = require("express")
const migrationsRun = require("./database/sqlite/migrations")
const routes = require("./routes")
const AppError = require("./utils/AppError")

migrationsRun()

const app = express()
app.use(express.json())
app.use(routes)

app.use((error, request, response, next ) =>{

    if(error instanceof AppError){
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        })
        
    }
    return response.status(500).json({
        status: "ERRO INTERNAL",
        message: "Erro do servidor"
    })

 


})

const porta = 3000;

app.listen(porta, ()=> console.log(`Servidor Funcionando na porta ${porta}`))