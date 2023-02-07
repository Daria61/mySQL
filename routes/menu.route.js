const express = require("express")

const router = express.Router()
const menu = require("../controllers/menu.controller.js")


router.get("/menu", menu.getAll);
router.post("/menu", menu.create)
router.get("/menu/:id", menu.getOne)
router.delete("/menu", menu.delete)
router.put("/menu", menu.put)
module.exports = router


