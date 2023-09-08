const knex = require("../database/knex")
const AppError = require("../utils/AppError")
const DiskStorage = require("../providers/DiskStorage")
const diskStorage = new DiskStorage()
class userAvatarController {
    async create(request, response){

        const user_id = request.user.id
        const user = await knex("users").where({id: user_id}).first()
        

    }



}


module.exports = userAvatarController;