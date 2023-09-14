require("express-async-errors")
require("dotenv/config")
const express = require("express")
const migrationsRun = require("./database/sqlite/migrations")
const routes = require("./routes")
const AppError = require("./utils/AppError")
const cors = require("cors")
const uploadConfig = require("./config/upload")
migrationsRun()

const app = express()

app.use(cors())
app.use(express.json())
app.use("/files", express.static(uploadConfig.UPLOADS))
app.use(routes)

app.use((error, request, response, next ) =>{

    if(error instanceof AppError){
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        })
        
    }
    console.log(error)
    
    return response.status(500).json({
        status: "ERRO",
        message: "Erro internal servidor"
    })

 


})

const porta = 3000;

app.listen(porta, ()=> console.log(`Servidor Funcionando na porta ${porta}`))