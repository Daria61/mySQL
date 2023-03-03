import express from "express";
import{
    getUser,
    getUsers,
    deleteUser,
    createUser,
    updateUser
} from "../service/user_service.js";

const router = express.Router();

router.get("/users", async (req, res)=> {
    const { query } = req; 
    const result = await getUsers(query.limit);
    res.status(200).send(result);
})

router.get("/user", async (req, res)=>{
    const { query } = req;
    console.log(query.id);
    const result = await getUser(query.id);
    res.status(200).send(result);
})

router.post("/user", async (req, res)=>{
    const { body } = req; 
    const id = null
    
    const { name, user_type , email, password, phone, picture } = body; 
    const result = await createUser(
        id , 
        name, 
        user_type, 
        email, 
        password,
        phone, 
        picture
    ); 
    res.status(200).send(result);
})

router.post("/user/login", async (req, res)=> {
    const { query } = req;
    const result = await getUser(query.id)
        res.status(200).send(result)
})

router.delete("/user", async (req, res)=>{
    const { query } = req; 
    const result = await deleteUser( query.id);
    res.status(200).send(result);
})

router.put("/user", async (req, res)=> {
    const { query, body } = req;
    const result = await updateUser( query.id, body);
    res.status(200).send(result)
})



export default router