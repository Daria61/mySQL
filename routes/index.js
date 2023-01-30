const express = require("express");
const cors = require("cors")
const app = express()
const port = 8080
const fs = require("fs")

app.use(cors())
app.use(express.json())



// app.get("/", (req, res)=>{
//     res.json({status: true, result: Data })
// })


/// Product section
app.get("/products", (req, res)=>{
    fs.readFile("./productData.json", "utf-8", (err, data)=>{
        if(err){
            res.json({status: false, message :err})
        }
        const Data = data ? JSON.parse(data) : []
        res.json({status: true, result:Data })
    })
})

app.get("/product", (req, res)=>{
    const {id} = req.query
    if(!id){
        res.json({status: false, message: "param not found"})
    }

    fs.readFile("./productData.json", "utf-8", (err, data)=>{
        if(err){
            res.json({status: false, message :err})
        }
        const Data = data ? JSON.parse(data) : []
        res.json({status: true, result:Data })
    })

    const newArr = Data.filter((a)=> a.id == id);
    if(newArr.length == 0){
         res.json({status: false, message:"product not found"})
        } else {
            res.json({status:true, result: newArr})
    }
})

app.delete("/product", (req, res)=>{
    const {id} = req.query
    if(!id){
        res.json({status: false, message: "param not found"})
    }
    const newArr = Data.ProductData.filter((a)=> a.id != id);
    res.json({status:true, result: newArr})
})

app.post("/product", (req, res)=>{
    const { NewPro } = req.body;
    const { img } = req.body.NewPro
    const { thumb } = req.body.NewPro
    
    if(thumb.length === 0){
        res.json({status: false, message: "Thumb file is empty"})
    }

    img.map((a)=>{
        if(a.img.length === 0){
            res.json({status: false, message: "Img file is empty"})
        }
    })

    Data.ProductData.push(NewPro)
    res.json({status: true, result: Data.ProductData})
})



/// User section
app.get("/users", (req, res)=>{
    if(!Data.Users){
        res.json({status: false, message: "Not found"})
    }
    res.json({status: true, result: Data.Users})
})

app.get("/user", (req, res)=>{
    const {id} = req.query
    const b = Data.Users.filter((a)=> a.id == id)
    if(b.length){
        res.json({status:true, result: b})
    }else{
        res.json({status: false, message: "User not found"})
    }
})

app.post("/user", (req, res)=>{
    const {user} = req.body
    Data.Users.push(user)
    res.json({status:true, result: Data.Users})
})

app.delete("/user", (req, res)=>{
    const {id} = req.query
    if(!id){
        res.json({status: false, message: "param not found"})
    }
    const newArr = Data.Users.filter((a)=> a.id != id);
    res.json({status:true, result: newArr})
})




// category

app.get('/category', (req, res)=>{
    res.json({status: true, result: Data.CategoryId})
})




//brand

app.get("/brand", (req, res)=>{
    res.json({status: true, result: Data.BrandId})
})




// admin 
app.get('/admin', (req, res)=>{
    res.json({status: true, result: Data.AdminUsers})
})



// web site update
app.get('/webdesign', (req, res)=>{
    res.json({status: true, result: Data.WebDesignData})
})



// menu CRUD 
// app.get('./menuedit', (req, res )=>{
//     res.json({status: true , result :})
// })

app.listen(port,()=>{
    console.log("Server is running on " + port);
})