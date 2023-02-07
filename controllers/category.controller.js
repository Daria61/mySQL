const fs = require("fs")
const uuid = require("uuid")
const CateData = process.cwd() + "/data/category.json"


exports.getAll = (req, res) =>{
    fs.readFile(CateData, "utf-8" , (err, data)=>{
        if(err){
            return res.json({status: false , message: err})
        }
        return res.json({status: true, result : JSON.parse(data)} )
    })
}

exports.getOne = (req, res)=>{
    const { id } = req.params
    fs.readFile(CateData, "utf-8", (err,data)=>{
        if(err){
           return res.json({status: false, message: err})
        }
        const parseD =data ? JSON.parse(data) :[]
        const a = parseD.filter((a)=> a.id == id)
        return res.json({status: true, result :a})
    })
}


exports.delete = (req, res)=>{
    const { id } = req.query
    fs.readFile(CateData, "utf-8", (err, data)=>{
        if(err){
            return res.json({status: false, message: err})
        }
       const a = data ? JSON.parse(data) :[]
       const c = a.filter((a)=> a.id != id)

       fs.writeFile(CateData, JSON.stringify(c), (err)=>{
        if(err){
            return res.json({status: false, message: err})
        }
        return res.json({status: true, result: c})
       })

    })
}

exports.create = (req, res)=>{
    const {category} = req.body
    fs.readFile(CateData, "utf-8", (err, data)=>{
        if(err){
            return res.json({status: false, message: err})
        }
        const a = data ? JSON.parse(data) :[]
        const newObj = {
            id : uuid.v4(),
            category
        }
        a.push(newObj)
        fs.writeFile(CateData, JSON.stringify(a), (err)=>{
            if(err){
                return res.json({status: false, message: err})
            }
            return res.json({status: true, result: a})
        })

    })
}
// exports.put =(req, res)=>{
//     const {category} = req.body
//     fs.readFile(CateData)
// }