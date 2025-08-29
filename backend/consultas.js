import { Pool } from 'pg'
import 'dotenv/config'   

const pool = new Pool()  

const getDate = async () => {
const result = await pool.query("SELECT NOW()")
console.log(result)
}

const addPost = async (titulo, img, descripcion) => {
    const consulta = 'INSERT INTO posts (titulo, img, descripcion) VALUES ($1, $2, $3)';
    const values = [titulo, img, descripcion];
    const res = await pool.query(consulta, values);
    console.log('Post agregado');
}

const readPosts = async () => {
    const { rows } = await pool.query('SELECT * FROM posts');
    console.log(rows);
    return rows;
}

const editPost = async (id, titulo, img, descripcion) => {
    const consulta = 'UPDATE posts SET titulo=$1, img=$2, descripcion=$3 WHERE id=$4';
    const values = [titulo, img, descripcion, id];
    const result = await pool.query(consulta, values);
    console.log('Post editado');
};


export { getDate, readPosts, addPost, editPost }
