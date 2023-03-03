import { pool } from "../config/mysql_config.js";

export async  function getUsers( limit){
    if(limit){
        const [rows] = await pool.query(
            `select * from users limit ${limit}`
        );
        return rows;
    } else {
        const [rows] = await pool.query(
            `select * from  users order by id limit 1 `
        );
        return rows[0]
    }
}

export async function getUser(id){
    const [row] =  await pool.query(
        `select * from users where id = ${id}`
    ); 
    return row[0];
}

export async function createUser( id, name , user_type, email, password, phone, picture){
    const [result] = await pool.query(
        `insert into users values (?, ?, ?, ?, ?, ?, ?)`,
        [id, name , user_type, email, password, phone, picture]
    );
    return result;
}

export async function updateUser(id, updateDate){
    let [result] = "";
    for(let i = 0; i < Object.keys(updateDate).length ; i++){
        result = await pool.query(
            `update users set ${Object.keys(updateDate)[i]} = '${Object.values(updateDate)[i]}' where id = ${id}`
        )
    };
    return result;
}

export async function deleteUser(id){
    const [result] = await pool.query(
        `delete from users where id = "${id}"`
    );
    return result;
}