const { Router } = require("express")
const UserControllers = require("../controllers/userControllers")
const userControllers = new UserControllers()
const ensureAuthentication = require("../middleware/ensureAuthentication")
const UsersAvatarController = require("../controllers/userAvatarController");
const userAvatarController = new UsersAvatarController()
const userRoutes = Router()

userRoutes.post("/", userControllers.create)
userRoutes.put("/", ensureAuthentication, userControllers.update)
userRoutes.delete("/", ensureAuthentication, userControllers.delete)
userRoutes.patch("/avatar", ensureAuthentication, userAvatarController.create)


module.exports = userRoutes;