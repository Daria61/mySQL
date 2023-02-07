const express = require("express")
const router = express.Router()
const staffs = require("../controllers/staffs.controller.js")

router.get("/staffs", staffs.getAll ); 
router.get("/staffs/:id", staffs.getOne);
router.post("/staffs", staffs.post)
router.delete("/staffs/:id", staffs.delete);
router.put("/staffs", staffs.put)

module.exports = router