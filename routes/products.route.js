const express = require("express")

const router = express.Router()
const products = require("../controllers/products.controller.js")

router.get("/products", products.getAll)
router.delete("/products", products.delete)
router.get("/products/:id", products.getOne)
router.put("/products",  products.put)
router.post("/products", products.create)

module.exports = router