const { jwt } = require("../config/auth")
const AppError = require("../utils/AppError")
const {verify} = require("jsonwebtoken")


function ensureAuthentication(request, response, next){
    const AuthHeader = request.headers.authorization

    if(!AuthHeader){
        throw AppError("Usuário não autenticado", 401)
    }

    const [, token] = AuthHeader.split(" ")

    try{
        const {sub: user_id} = verify(token, jwt.secret)
        request.user = {
            id: Number(user_id)
        }
        return next()

    }catch(error){
        throw new AppError("JWT TOKEN Invalido", 401)
    }
    
  

}


module.exports = ensureAuthentication