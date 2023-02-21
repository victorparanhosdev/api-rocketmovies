const knex = require("../database/knex")

class tagsControllers {
    async show(request, response){
    const {user_id} = request.params;

    const tags = await knex("tags").where({user_id})
  

    response.json(tags)

      
    }



}


module.exports = tagsControllers;