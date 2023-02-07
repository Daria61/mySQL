const express = require("express")

const router = express.Router()
const brands = require("../controllers/brand.controller.js")

router.get("/brands", brands.getAll)
router.get("/brands/:id", brands.getOne)
router.delete("/brands", brands.delete)
router.post("/brands", brands.create)
module.exports = router