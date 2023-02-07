const express = require("express");
const cors = require("cors")
const app = express()
const port = 8080
const fs = require("fs")

app.use(cors())
app.use(express.json())


const menuRouter = require("./routes/menu.route.js")
const cateRouter = require("./routes/category.route.js")
const productsRouter = require("./routes/products.route.js")
const userRouter = require('./routes/user.route.js')
const staffsRouter = require("./routes/staffs.route.js")
const brandsRouter = require("./routes/brands.route.js")

app.use("/api", menuRouter)
app.use("/api", cateRouter)
app.use("/api", productsRouter)
app.use("/api", userRouter)
app.use("/api", staffsRouter)
app.use("/api", brandsRouter)

app.get("/api", (req,  res )=>{
    res.json({message: "Welcome to Rest API"})
})

app.listen(port,()=>{
    console.log("Server is running on " + port);
})