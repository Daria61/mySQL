const express = require("express")

const router = express.Router()
const cate = require("../controllers/category.controller.js")

router.get("/category", cate.getAll)
router.get("/category/:id", cate.getOne)
router.delete("/category", cate.delete)
router.post("/category", cate.create)
module.exports = router