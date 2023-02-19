const SQLiteConnection = require("../database/sqlite")
const bcrypt = require("bcryptjs");
const AppError = require("../utils/AppError");
const { use } = require("../routes");

class userControllers {

async create(request, response){
   
    const database = await SQLiteConnection();
    const {name, email, password} = request.body;

    const Email = email.toString().toLowerCase();
    const checkEmail = await database.get("SELECT * FROM users WHERE email = (?)", [Email])

    if(!password){
        throw new AppError("Senha Obrigatória")
    }
    if(!name){
        throw new AppError("Nome é Obrigatório")
    }
    if(!email){
        throw new AppError("Email é Obrigatório")
    }
    
    if(checkEmail){
        throw new AppError("Email já está em uso")
    }

    
    const crypto = await bcrypt.hash(password, 8)
    await database.run("INSERT INTO users (name, email, password, updated_at) VALUES (?, ?, ?, NULL)", [name, Email, crypto])

    response.status(201).json({
        message: "Cadastro Realizado com sucesso",
        Nome: name,
        Email: Email
    })

}

async update(request, response){
    
    const {name, email, password} = request.body;
    const {id} = request.params;
    const database = await SQLiteConnection();
    //const crypto = await bcrypt.hash(password, 8)  
    let Email;  

    if(email == undefined){
        Email = email
    }else {
        Email = email.toLowerCase()
    }
    
    const user = await database.get("SELECT * FROM users WHERE id = ?", [id])


    if(!user){
        throw new AppError(`Não existe esse usuário de numero ${id}!`)
    }

    const checkEmail = await database.get("SELECT * FROM users WHERE email = (?)", [Email])
   

    if(checkEmail && user.email === Email) {
        throw new AppError("Este email é do seu proprio Usuario")
    }

    if(checkEmail && user.id !== id){
        throw new AppError("Este email já existe cadastrado em outro usuário")
    }

    
    if(email === undefined || null){
        user.email = user.email
    }else {
        user.email = email.toLowerCase()
    }
   


    
    await database.run(`UPDATE users SET 
    name = ?,
    email = ?,
    updated_at = DATETIME('now', 'localtime')
    WHERE id = ?`, [name, user.email, id]);
  

   return response.send("atualizado com sucesso")

}

async delete(request, response){
    const database = await SQLiteConnection();
    const {id} = request.params;
    
    const user = await database.get("SELECT * FROM users WHERE id = ?", [id])

    if(!user){
        throw new AppError(`O usuario ${id} não existe!`)
    }

    await database.run("DELETE FROM users WHERE id = ?", [id])
        response.json({
            usuario: id,
            message: "deletado com sucesso"
        });
      

}

async show(request, response) {
    const database = await SQLiteConnection();
    const {id, name} = request.query

    const user = await database.get("SELECT * FROM users WHERE id = ?", [id])


    if(!user){
       throw new AppError(`O usuario ${id} não existe!`)
    }

    response.json({name: user.name, email: user.email})

}

}


module.exports = userControllers;