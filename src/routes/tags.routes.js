const { Router } = require("express")
const TagsControllers = require("../controllers/tagsController")
const tagsControllers = new TagsControllers()

const tagsRoutes = Router()

tagsRoutes.get("/:id", tagsControllers.show)



module.exports = tagsRoutes;