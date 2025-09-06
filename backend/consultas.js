import { Pool } from 'pg'
import 'dotenv/config'   

const pool = new Pool()  

const getDate = async () => {
const result = await pool.query("SELECT NOW()")
console.log(result)
}

const addPost = async (titulo, img, descripcion) => {
    const consulta = 'INSERT INTO posts (titulo, img, descripcion) VALUES ($1, $2, $3) RETURNING *';
    const values = [titulo, img, descripcion]; 
    const { rows } = await pool.query(consulta, values); 
    console.log('Post agregado');
    return rows[0]; 
}


const readPosts = async () => {
    const { rows } = await pool.query('SELECT * FROM posts ORDER BY id DESC');
    return rows;
}

const editPost = async (id, titulo, img, descripcion) => {
  const consulta = 'UPDATE posts SET titulo=$1, img=$2, descripcion=$3 WHERE id=$4 RETURNING *';
  const values = [titulo, img, descripcion, Number(id)];
  const { rows } = await pool.query(consulta, values); 
  console.log('Post editado');
  return rows[0]; 
};

const likePost = async (id) => {
    const consulta = 'UPDATE posts SET likes = likes + 1 WHERE id=$1 RETURNING *';
    const values = [Number(id)]; 
    const { rows } = await pool.query(consulta, values);
    console.log('Post likeado');
    return rows[0];
};

const deletePost = async (id) => {
    const consulta = 'DELETE FROM posts WHERE id=$1 RETURNING *';
    const values = [Number(id)]; 
    const { rows } = await pool.query(consulta, values);
console.log('Post eliminado');
    return rows[0]; 
};

export { getDate, readPosts, addPost, editPost, deletePost, likePost }
