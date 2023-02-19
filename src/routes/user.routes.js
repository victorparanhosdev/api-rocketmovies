const { Router } = require("express")
const UserControllers = require("../controllers/userControllers")
const userControllers = new UserControllers()

const userRoutes = Router()

userRoutes.post("/", userControllers.create)



module.exports = userRoutes;