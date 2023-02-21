const { Router } = require("express")
const NotesControllers = require("../controllers/notesControllers")
const notesControllers = new NotesControllers()

const notesRoutes = Router()

notesRoutes.post("/:user_id", notesControllers.create)
notesRoutes.get("/:id", notesControllers.show)
notesRoutes.get("/", notesControllers.index)
notesRoutes.delete("/:id", notesControllers.delete)


module.exports = notesRoutes;