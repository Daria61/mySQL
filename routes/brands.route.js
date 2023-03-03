import express  from "express"
import { getBrand, getBrands, deleteBrand, createBrand } from "../service/brand_service.js"


const router = express.Router()

router.get("/brands", async (req, res)=>{
    const result = await getBrands()
    res.status(200).send(result)
})

router.get("/brand", async (req, res)=>{
    const { query } = req;
    const result = await getBrand(query.id)
    res.status(200).send(result)
})

router.post("/brand", async (req, res)=>{
    const { body } = req;
    const id = null
    const {name} = body
    const result = await createBrand(id, name )
    res.status(200).send(result)
})

router.delete("/brand", async (req, res)=>{
    const { query } = req;
    const result = await deleteBrand(query.id)
    res.status(200).send(result);
})

router.put("/brand", async (req, res)=>{
    const { query , body} = req;
    // const result = await updateBrand()
})

export default router