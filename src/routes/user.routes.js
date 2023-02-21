const { Router } = require("express")
const UserControllers = require("../controllers/userControllers")
const userControllers = new UserControllers()

const userRoutes = Router()

userRoutes.post("/", userControllers.create)
userRoutes.put("/:id", userControllers.update)
userRoutes.delete("/:id", userControllers.delete)
userRoutes.get("/:id", userControllers.show)


module.exports = userRoutes;