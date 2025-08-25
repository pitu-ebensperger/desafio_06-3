const express = require('express') // importo express
const app = express() // ejecuto express para ob
const fs = require ('fs') // importo filesystem
const cors = require('cors') // importo cors
const path = require('path'); // importo path

const PORT = 3000 // defino puerto 
app.listen(PORT, function(err){ // levanto servidor
    if (err) { console.error("Error levantando el servidor"); return; }
    console.log("Servidor encendido en el puerto", PORT)
})

app.use(cors()) 
app.use(express.json()) // uso express.json para recibir datos en formato JSON

const { Pool } = require('pg')

const pool = new Pool({
host: 'localhost',
user: 'postgres',
password: 'postgres',
database: 'likeme',
allowExitOnIdle: true
})

const getDate = async () => {
const result = await pool.query("SELECT NOW()")
console.log(result)
}


const addPost = async (post, presupuesto) => {
const consulta = "INSERT INTO posts values (DEFAULT, $1, $2)"
const values = [id, titulo, img, descripcion, likes]
const result = await pool.query(consulta, values)
console.log("post agregado")
}


const getPosts = async () => {
const { rows } = await pool.query("SELECT * FROM posts")
console.log(rows)
return rows
}
getPosts()


module.exports = { addPost, getPosts }