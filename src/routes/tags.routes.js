const { Router } = require("express")
const TagsControllers = require("../controllers/tagsController")
const tagsControllers = new TagsControllers()

const tagsRoutes = Router()

tagsRoutes.get("/:user_id", tagsControllers.show)



module.exports = tagsRoutes;