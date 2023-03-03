const express = require("express")
const router = express.Router()
const web = require("../controllers/web.controller.js")

router.get("/design", web.get)
router.put("/design", web.put)

module.exports = router