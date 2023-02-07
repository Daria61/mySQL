const { log } = require("console")
const fs = require("fs")
const mainData = process.cwd() + "/data/usersData.json"
const uuid = require("uuid")

exports.getAll =(req,res)=>{
    fs.readFile(mainData, "utf-8", (err, data)=>{
        if(err){
            return res.json({status: false, message: err})
        }
        return res.json({status: true , result: JSON.parse(data)})
    })
}

exports.getOne = (req, res) =>{
    const {id} = req.params;

    console.log(req.params);
    fs.readFile(mainData, "utf-8", (err, data)=>{
        if(err){
            return res.json({status: false, message: err})
        }
        const Pdata = data? JSON.parse(data) :[]
        const b = Pdata.filter((a)=> a.id == id)
        return res.json({status: true, result :b})
    })
}

exports.create = (req, res)=>{
    const {name, email, password, phone, lastLoginDate ,likes} = req.body
    fs.readFile(mainData, "utf-8", (err, data)=>{
        if(err){
            return res.json({status: false, message: err})
        }
        const pData = data? JSON.parse(data): []
        const obj = {
            id: uuid.v4(),
            name,
            email,
            password,
            phone,
            "lastLoginDate": {
              "Year": "",
              "Month": "",
              "Day": ""
            },
            "likes": likes
        }
        pData.push(obj)
        fs.writeFile(mainData, JSON.stringify(pData), (err)=>{
            if(err){
                return res.json({status: false, message: err})
            }

            return res.json({status: true, result: pData})
        })
    })
}


exports.delete=(req, res)=>{
    const {id} = req.params
    fs.readFile(mainData, "utf-8", (err, data)=>{
        if(err){
            return res.json({status: false, message: err})
        }
        console.log(data);
        const parseData = data?  JSON.parse(data): []
        const filt = parseData.filter((a)=> {return a.id != id})
        console.log(filt);
        fs.writeFile(mainData, JSON.stringify(filt), (err)=>{
            if(err){
                return res.json({status: false, message: err})
            }
            return res.json({status: true, result : filt})
        })
    })
}

exports.put=(req, res)=>{
    const {id,name, email, password, phone, lastLoginDate ,likes } = req.body
    fs.readFile(mainData, "utf-8", (err, data)=>{
        if(err){
            return res.json({status: false, message: err})
        }
        
        const parseD = data? JSON.parse(data) :[]

        const newObj = parseD.map((a)=>{
            if(a.id == id ){
                return {...a,
                    name,
                    email,
                    password,
                    phone,
                    "lastLoginDate": {
                      "Year": lastLoginDate.Year,
                      "Month": lastLoginDate.Month,
                      "Day": lastLoginDate.Day
                    },
                    "likes": likes }
            }else{
                return a
            }
        })

        fs.writeFile(mainData, JSON.stringify(newObj), (err)=>{
            if(err){
                return res.json({status: false, message: err})
            }
            return res.json({status: true, result : newObj})
        })
    })
}