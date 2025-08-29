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


app.get('/api/posts', async (req, res) => {
    try {
         const posts = await readPosts();
        res.json(posts);
    } catch (e) {
        console.error('GET /api/posts error:', e); 
        res.status(500).json({ error: e.message }); 
    } 
});

app.post('/api/posts', async (req, res) => {
    try{
        const { titulo, img, descripcion } = req.body;
        await addPost(titulo, img, descripcion);
        res.json({ message: 'Post agregado' });
    } catch (e) {
        console.error('POST /api/posts error:', e); 
        res.status(500).json({ error: e.message }); 
    }
});

app.put('/api/posts/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const {titulo, img, descripcion} = req.body;
        await editPost(Number(id), titulo, img, descripcion);
       res.json({ message: 'Post editado' });
    } catch (e) {
        console.error('PUT /api/posts/:id error:', e); 
        res.status(500).json({ error: e.message }); 
    }
});

                            
app.get(/.*/, (req, res) => {                               
  res.sendFile(path.join(clientDist, 'index.html'))             
});   