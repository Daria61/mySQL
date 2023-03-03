import { pool } from  "../config/mysql_config.js";

export  async function getCategories(){
    const [rows]= await pool.query(
        `select * from category`
    );
    return rows
}

export async function getCategory(id){
    const [row] = await pool.query(
        `select * from category where id = ${id}}`
    );
    return row[0]
}

export async function createCategory(id, name ){
    const [result] = await pool.query(
    `insert into category values (?, ?)`, 
    [id, name]
    );
    return result;
}

export async function updateCategory(id, data){
    let [result] = "";
    for(let i = 0 ; i < Object.keys(data).length; i++){

    }
}

export async function deleteCategory(id){
    const [result] = await pool.query(
        `delete from category where id= ${id}`
    );
    return result
}