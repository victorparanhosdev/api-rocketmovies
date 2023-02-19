const SQLiteConnection = require("../database/sqlite")
const crypto = require("bcryptjs");

class userControllers {

async create(request, response){
    const database = await SQLiteConnection();

    const {name, email, password} = request.body;

    await database.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, password])

    response.json({name, email, password})

}

}


module.exports = userControllers;