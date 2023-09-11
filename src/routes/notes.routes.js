const { Router } = require("express")
const NotesControllers = require("../controllers/notesControllers")
const notesControllers = new NotesControllers()
const ensureAuthentication = require("../middleware/ensureAuthentication")
const notesRoutes = Router()

notesRoutes.use(ensureAuthentication)

notesRoutes.post("/", notesControllers.create)
notesRoutes.get("/:id", notesControllers.show)
notesRoutes.get("/", notesControllers.index)
notesRoutes.delete("/:id", notesControllers.delete)


module.exports = notesRoutes;