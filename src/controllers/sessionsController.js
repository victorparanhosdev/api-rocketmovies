const knex = require("../database/knex")
const {sign} = require("jsonwebtoken")
const auth = require("../config/auth")
const AppError = require("../utils/AppError")
const {compare} = require("bcryptjs")

class sessionsControllers {
    async create(request, response){
        const {email, password} = request.body

        const user = await knex("users").where({email}).first()
        if(!user){
            throw new AppError("E-mail e/ou Senha Incorreta", 401)
        }
  
        const CheckPassowrd = await compare(password, user.password)

        if(!CheckPassowrd){
            throw new AppError("E-mail e/ou Senha Incorreta", 401)
        }
        const {expiresIn, secret} = auth.jwt

        const token = sign({}, secret, {
            subject: String(user.id),
            expiresIn
        });

        

        return response.json({user, token})
    }



}


module.exports = sessionsControllers;