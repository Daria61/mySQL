import express from "express"
import cors from  "cors" 
import bodyParser from "body-parser"

import userRouter from "./routes/user.route.js"
import brandsRouter from "./routes/brands.route.js"
import cateRouter from "./routes/category.route.js"

const app = express()
const port = 8080

app.use(cors())
app.use(bodyParser.json())



// const cateRouter = require("./routes/category.route.js")
// const productsRouter = require("./routes/products.route.js")
// const brandsRouter = require("./routes/brands.route.js")
// const webRouter = require("./routes/web.route.js")

app.use("/api", userRouter)
app.use("/api", cateRouter)
// app.use("/api", productsRouter)
app.use("/api", brandsRouter)
// app.use("/api", webRouter)

app.get("/api", (req,  res )=>{
    res.json({message: "Welcome to Rest API"})
})

app.listen(port,()=>{
    console.log("Server is running on " , port);
})