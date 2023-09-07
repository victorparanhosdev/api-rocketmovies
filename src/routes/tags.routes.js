const { Router } = require("express")
const TagsControllers = require("../controllers/tagsController")
const tagsControllers = new TagsControllers()
const ensureAuthentication = require("../middleware/ensureAuthentication")
const tagsRoutes = Router()

tagsRoutes.get("/", ensureAuthentication, tagsControllers.show)



module.exports = tagsRoutes;