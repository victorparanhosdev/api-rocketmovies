const { Router } = require("express")
const UserControllers = require("../controllers/userControllers")
const userControllers = new UserControllers()
const ensureAuthentication = require("../middleware/ensureAuthentication")
const UsersAvatarController = require("../controllers/userAvatarController");
const userAvatarController = new UsersAvatarController()
const upload = require("../config/upload")
const multer = require("multer")

const Multer = multer(upload.MULTER)
const userRoutes = Router()

userRoutes.post("/", userControllers.create)
userRoutes.put("/", ensureAuthentication, userControllers.update)
userRoutes.delete("/", ensureAuthentication, userControllers.delete)
userRoutes.patch("/avatar", ensureAuthentication, Multer.single("avatar") ,userAvatarController.create)


module.exports = userRoutes;