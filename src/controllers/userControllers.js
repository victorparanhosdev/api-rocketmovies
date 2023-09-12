const SQLiteConnection = require("../database/sqlite")
const AppError = require("../utils/AppError");
const {hash, compare} = require("bcryptjs");
const knex = require("../database/knex")

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

    
    const crypto = await hash(password, 8)
    await database.run("INSERT INTO users (name, email, password, updated_at) VALUES (?, ?, ?, NULL)", [name, Email, crypto])

    return response.status(201).json()

}

async update(request, response){
    
    const {name, email, password, old_password} = request.body;
    const user_id = request.user.id;
    const database = await SQLiteConnection(); 
    
    const user = await database.get("SELECT * FROM users WHERE id = ?", [user_id])
  

    if(!user){
        throw new AppError(`Usuário não existe!`)
    }

    const CheckEmail = await database.get("SELECT * FROM users WHERE email = ?", [email])

    if(CheckEmail && user.id !== user_id){
        throw new AppError("Email ja existe em outro usuário")
    }
    
    if(password && !old_password){
        throw new AppError("É necesario digitar a senha antiga")
    }

    if(password && old_password){
        const chekPassword = await compare(old_password, user.password)
        if(!chekPassword){
            throw new AppError("Senha incorreta")
        }

        user.password = await hash(password, 8)
    }

    user.email =  email ?? user.email
    user.name = name ?? user.name
    
    await database.run(`UPDATE users SET 
    name = ?,
    email = ?,
    password = ?,
    updated_at = strftime('%d-%m-%Y %H:%M:%S', 'now', 'localtime')
    WHERE id = ?`, [user.name, user.email, user.password, user_id]);
  

   return response.json({user})

}

async delete(request, response){
    const database = await SQLiteConnection();
    const user_id = request.user.id;
    
    const user = await database.get("SELECT * FROM users WHERE id = ?", [user_id])

    if(!user){
        throw new AppError(`O usuario não existe!`)
    }

    await database.run("DELETE FROM users WHERE id = ?", [user_id])
        response.json({
            message: "deletado com sucesso"
        });
      

}



}


module.exports = userControllers;