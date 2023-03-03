import { pool } from "../config/mysql_config.js"

export async function getProducts(){
    const [rows] = await pool.query(
        `select * from products`
    );
    return rows
}

export async function getProduct(id){
    const [row]= await pool.query(
        `select * from products where id=${id}`
    );
    return row[0]
}

export async function createProduct( id, name ,price, quantity, color, material, sale, brand, feature, created_date, created_user_id, update_date, update_user_id ){
    const [result] = await pool.query(
        `insert into products values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,)`, [
            id, name , price, quantity, color, material, sale, brand , feature, created_date, created_user_id, update_date, update_user_id
        ]
    )
    return result
}

