const { Router } = require("express")
const UserControllers = require("../controllers/userControllers")
const userControllers = new UserControllers()
const ensureAuthentication = require("../middleware/ensureAuthentication")
const userRoutes = Router()

userRoutes.post("/", userControllers.create)
userRoutes.put("/", ensureAuthentication, userControllers.update)
userRoutes.delete("/", ensureAuthentication, userControllers.delete)



module.exports = userRoutes;