import express from "express"
import {  getCategories
    // ,getCategory, deleteCategory, createCategoty
} from "../service/category_service"
const router = express.Router();


router.get("/categories", async (req, res)=>{
    const result = await getCategories()
    res.status(200).send(result)
})

router.get("/category", async (req, res)=>{
    const {query} = req
    const result = await getCategory(query.id)
    res.status(200).send(result)
})

router.post("/category", async (req, res)=>{
    const {body} = req
    const id = null
    const { name } = body
    const result = await createCategory(id, name)
    res.status(200).send(result) 
})

router.delete("/category", async (req, res)=>{
    const {query} = req;
    const result = await deleteCategory(query.id)
    res.status(200).send(result)
})

export default router;