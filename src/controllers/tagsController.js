const knex = require("../database/knex")
const SQLiteConnection = require("../database/sqlite")

class tagsControllers {
    async show(request, response){
    const {id} = request.params;
    const tags = await knex("tags").where({user_id: id}).orderBy('note_id')
    const notas= await knex("notas").where({user_id: id}).orderBy('id')
    const database = await SQLiteConnection()



    const user = await database.get("SELECT * FROM users WHERE id = ?", [id])
    response.json({
        id: id,
        nome: user.name,
        email: user.email,
        notas,
        tags
    })

      
    }



}


module.exports = tagsControllers;