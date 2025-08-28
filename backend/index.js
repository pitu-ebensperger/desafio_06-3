import { getDate, readPosts, addPost, editPost} from './consultas.js' // importo funciones de consultas.js
import express  from 'express' // importo express
import fs from 'fs' // importo filesystem
import cors from 'cors'  // importo cors
import path from 'path' // importo path
import { fileURLToPath } from 'url'


const __filename = fileURLToPath(import.meta.url)  //*Para usar ESmodules
const __dirname  = path.dirname(__filename)

const app = express() 
app.use(cors()) 
app.use(express.json()) // uso express.json para recibir datos en formato JSON

const PORT = 3000 // defino puerto 
app.listen(PORT, () => console.log("Servidor encendido"))

const clientDist = path.join(__dirname, '..', 'frontend', 'dist')
app.use(express.static(clientDist))
                            
app.get(/.*/, (req, res) => {                               
  res.sendFile(path.join(clientDist, 'index.html'))             
});   

app.get('/api/posts', async (req, res) => {
    const posts = await readPosts();
    res.json(posts);
});

app.post('/api/post', async (req, res) => {
    const { titulo, img, descripcion } = req.body;
    await addPost(titulo, img, descripcion);
    res.json({ message: 'Post agregado' });
});

app.put('api/posts/:id', async (req, res) => {
    const { id } = req.params;
    const {titulo, img, descripcion} = req.body;
    await editPost(id, titulo, img, descripcion);
    res.json({ message: 'Post editado' });
});
