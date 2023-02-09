const fs = require("fs")
const uuid = require("uuid")
const DataFile  = process.cwd()  + "/data/productData.json"


//process.cwd()  tusdaa
// __dirname  neg folder dotor  

exports.getAll = (req, res) => {
    fs.readFile(DataFile, "utf-8", (err, data)=>{
        if(err){
            return res.json({status: false, message: err})
        }
        return res.json({status: true, result: JSON.parse(data) })
    } )
}

exports.getOne= (req, res) => {
    const {id} = req.params;
    fs.readFile(DataFile, "utf-8", (err, data)=>{
        if(err){
            return res.json({status: false, message: err})
        }
        const parseData = data ? JSON.parse(data) :[]
        const a = parseData.filter((a)=> a.id == id)
        return res.json({status: true, result: a })
    } )
}

exports.create = (req, res) =>{
    const body = req.body
    fs.readFile(DataFile, "utf-8", (err, data)=>{
        if(err){
            return res.json({status: false, message: err})
        }
        const parseData = data ? JSON.parse(data) :[]
        const obj =  {
            "id":uuid.v4(), 
        "productName": body.productName,
        "category": body.category,
        "price": body.price,
        "salePrecent": body.salePrecent,
        "quantity": body.quantity,
        "brandId": body.brandId,
        "material": body.material,
        "color": body.color,
        "feature": body.feature,
        "create":body.create,
        "update": body.update,
        "img": body.img,
        "thumb": body.thumb
        }
        console.log(obj);
        parseData.push(obj)
        fs.writeFile(DataFile, JSON.stringify(parseData), (err)=>{
            if(err){
                return res.json({status: false, message: err})
            }
            return res.json({status: true, result : parseData})
        })
    } )
}


exports.delete = (req, res) =>{
    const {id} = req.query
    fs.readFile(DataFile, "utf-8", (err, data)=>{
        if(err){
            return res.json({status: false, message: err})
        }
        const pData = data ? JSON.parse(data) :[]
        const newObj = pData.filter((a)=> {return a.id != id})

        fs.writeFile(DataFile, JSON.stringify(newObj), (err)=>{
            if(err){
                return res.json({status: false, message: err})
            }
            res.json({status: true, result : newObj})
        })
    })
}

exports.put = (req, res)=>{
    const body = req.body
    fs.readFile(DataFile, "utf-8", (err, data)=>{
        if(err){
            return res.json({status: false, message: err})
        }

        const pData =data ? JSON.parse(data) :[]
        const newObj = pData.map((a)=> {
            if(a.id == body.id){
                return {...a,  "id": body.id, 
                "productName":body.productName,
                "category": body.category,
                "price": body.price,
                "salePrecent": body.salePrecent,
                "quantity": body.quantity,
                "brandId": body.brandId,
                "material": body.material,
                "color": body.color,
                "feature": body.feature,
                "create":{
                   "date": {"Year": body.create.date.Year, "Month":body.create.date.Month, "Day":body.create.date.Day}, 
                   "createdUserId":body.create.createdUserId
                },
                "update":{
                    "status": body.update.status, 
                    "date":{"Year":body.update.date.Year, "Month":body.update.date.Month, "Day":body.update.date.Day},
                    "updateUser": body.update.updateUser
                }, 
                "img": body.img,
                "thumb":body.thumb
                } 
            } else {
                return a
            }
            
        })

        fs.writeFile(DataFile, JSON.stringify(newObj), (err)=>{
            if(err){
                return res.json({status: false, message: err})
            }
            res.json({status: true, result : newObj})
        })
    })
}