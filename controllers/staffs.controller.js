const express = require("express")
const fs = require("fs")
const uuid = require("uuid")
const staffsData = process.cwd() + "/data/staffs.json"

exports.getAll=(req, res)=>{
    fs.readFile(staffsData, "utf-8", (err, data)=>{
        if(err){
            return res.json({status: false , message: err})
        }

        return res.json({status: true, result : JSON.parse(data)})
    })
}

exports.getOne = (req, res)=>{
    const {id} = req.params
    fs.readFile(staffsData, "utf-8", (err, data)=>{
        if(err){
            return res.json({status: false , message: err})
        }
        const newData = data? JSON.parse(data): [];
        const a =  newData.filter((a)=>  a.id == id)
        return res.json({status: true, result: a})
    })
}


exports.post = (req, res) =>{
    const body= req.body
    fs.readFile(staffsData, "utf-8", (err, data)=>{
        if(err){
            return res.json({status: false , message: err})
        }
        const newobj ={
            "id":uuid.v4(), 
            "name": body.name, 
            "email": body.email,
            "password" : body.password, 
            "phone": body.phone,
            "img": body.img
        }
        const PData = data? JSON.parse(data) : []
        PData.push(newobj)

        fs.writeFile(staffsData, JSON.stringify(PData), (err)=>{
            if(err){
                return res.json({status: false , message: err})
            }
            return res.json({status: true, result: PData})
        })

    })
}

exports.delete =(req,res)=>{
    const {id}= req.params
    fs.readFile(staffsData, "utf-8", (err, data)=>{
        if(err){
            return res.json({status: false, message: err})
        }

        const parData = data? JSON.parse(data):[]
        const a = parData.filter((a)=>{return a.id != id})

        fs.writeFile(staffsData, JSON.stringify(a), (err)=>{
            if(err){
                return res.json({status: false , message: err})
            }

            return res.json({status: true , result : a})
        })

    })
}

exports.put =(req, res)=>{
    const {id, email, password, name, phone} = req.body
    fs.readFile(staffsData, "utf-8", (err, data)=>{
        if(err){
            return res.json({status: false, message: err})
        }

        const newData = data? JSON.parse(data): []

        const c = newData.map((a)=>{
            if(a.id == id){
                return{...a, 
                    email,
                    password,
                    phone, 
                    name
                }
            }else{
                return a
            }
        })

        fs.writeFile(staffsData, JSON.stringify(c), (err)=>{
            if(err){
                return res.json({status: false, message: err})
            }
            return res.json({status: true, result: c})
        })
    })
}