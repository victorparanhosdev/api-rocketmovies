const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class notesControllers {
    async create(request, response){
        const {title, description, rating, tags} = request.body;
        const{user_id} = request.params;

        if(Number(rating) > 5 || Number(rating) < 0){
            throw new AppError("O rating(nota) só é entre 0 a 5")
        }

        const notas = await knex("notas").insert({
            title,
            description,
            rating: `${rating}/5`,
            user_id: user_id
        })

        const insertTags = tags.map(tag => {
            return {
                note_id: notas,
                user_id,
                name: tag
            }
        })

        await knex("tags").insert(insertTags);

        response.status(201).json()

    }
    async show(request, response){

        const{user_id} = request.query;

        const notas = await knex("notas").where({user_id})


        response.json(notas)

    }

    async delete(request, response){

        const {id} = request.params;

        await knex("notas").where({user_id: id}).delete()
        response.json()

    }



    
}


module.exports = notesControllers;