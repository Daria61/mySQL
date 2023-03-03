import { pool } from "../config/mysql_config.js"

export async function getBrands(){
 const [rows] = await pool.query(
    `select * from brands`
 ); 
 return rows
}

export async function getBrand(id){
    const [row] = await pool.query(
        `select * from brands where id = ${id}`
    )
    return row[0]
}

export async function createBrand(id, name){
    const [result] =await pool.query(
        `insert into brands values (?, ?)`, [id, name]
    );
    return result
}

// export async function updateBrand(id, name){
//     let [result] ='';
//     for(let i = 0; i < Object.keys(name))
    
// }

export async function deleteBrand(id){
    const [result] = await pool.query(
        `delete from brands where id = ${id}`
    );
    return result;    
}

