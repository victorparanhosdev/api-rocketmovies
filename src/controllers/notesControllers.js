const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class notesControllers {
    async create(request, response){
        const {title, description, rating, tags} = request.body;
        const user_id = request.user.id

        if(Number(rating) > 5 || Number(rating) < 0){
            throw new AppError("O rating(nota) só é entre 0 a 5")
        }

        const notas = await knex("notas").insert({
            title,
            description,
            rating: `${rating}/5`,
            user_id
        })

        let Tags
        if(tags === undefined){
            Tags = []
        }else{
            Tags = tags 
            const insertTags = Tags.map(tag => {
                return {
                    note_id: notas,
                    user_id,
                    name: tag
                }
            })
    
        await knex("tags").insert(insertTags);

        }
       
  

        return response.status(201).json()

    }
    async show(request, response){

        const user_id = request.user.id

        const user = await knex("users").where({user_id}).first()
        const notas = await knex("notas").where({user_id})
        const tags = await knex("tags").where({user_id}).orderBy("name")


        return response.json({
            id: id,
            nome: user.name,
            email: user.email,
            notas,
            tags
        })

    }
    async index(request, response){
    

        const { title, tags} = request.query
        const user_id = request.user.id
        let Notas;

        if(tags){

            const FilterTags = tags.split(",").map(tag => tag.trim())

            Notas = await knex("tags")
            .select(["notas.id", "notas.title", "notas.description", "notas.rating", "notas.user_id", ])
            .where("notas.user_id", user_id)
            .whereLike("notas.title", `%${title}%`)
            .whereIn("name", FilterTags).innerJoin("notas", "notas.id", "tags.note_id")


        }else{
            
            Notas = await knex("notas").where({user_id}).whereLike("title", `%${title}%`)

        }

        const userTags = await knex("tags").where({user_id})

        const notesWithTags = Notas.map(nota => {

            const notetags = userTags.filter(tag => tag.note_id === nota.id)


            return {
                ...nota, 
                tags: notetags                   
            }

            })
        

        return response.json(notesWithTags)

    }

    async delete(request, response){

        const user_id = request.user.id

        await knex("notas").where({user_id}).delete()
        return response.json()

    }



    
}


module.exports = notesControllers;