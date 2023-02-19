const CreateUser = require("./createUsers")
const SQLiteConnection = require("../../sqlite")

async function migrationsRun () {
    const schemas = [CreateUser].join('');
    
    SQLiteConnection().then(db => db.exec(schemas)).catch(error => console.error(error))
}


module.exports = migrationsRun;