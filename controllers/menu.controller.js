const fs = require("fs")
const uuid = require("uuid")
const DataFile  = process.cwd()  + "/data/menu.json"


//process.cwd()  tusdaa
// __dirname  neg folder dotor  

exports.getAll = (req, res) => {
    fs.readFile(DataFile, "utf-8", (err, data)=>{
        if(err){
            return res.json({status: false, message: err})
        }
        return res.json({status: true, value: JSON.parse(data) })
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
    const {menuName, link} = req.body
    fs.readFile(DataFile, "utf-8", (err, data)=>{
        if(err){
            return res.json({status: false, message: err})
        }
        const parseData = data ? JSON.parse(data) :[]
        const obj = {id: uuid.v4(), menuName, link }
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
            return res.json({status: true, result : newObj})
        })
    })
}

exports.put = (req, res)=>{
    const {menuName, link, id} = req.body
    fs.readFile(DataFile, "utf-8", (err, data)=>{
        if(err){
            return res.json({status: false, message: err})
        }
        const pData =data ? JSON.parse(data) :[]
        const newObj = pData.map((a)=> {
            if(a.id == id){
                return {...a, menuName, link}
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