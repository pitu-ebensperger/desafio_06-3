import { readPosts, addPost, editPost,likePost, deletePost} from './consultas.js' // importo funciones de consultas.js
import express  from 'express' // importo express
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

const clientDist = path.join(__dirname, '..', 'frontend')
app.use(express.static(clientDist))


app.get('/api/posts', async (req, res) => {
    try {
        const posts = await readPosts();
        res.json(posts);
    } catch ({code, message}) {
        res.status(code).send(message);
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
    const { id } = req.params;
    const {titulo, img, descripcion} = req.body;
    try {
        await editPost(Number(id), titulo, img, descripcion);
        res.json({ message: 'Post editado' });
    } catch ({code, message}) {
        res.status(code).send(message);
    } 
});


app.put('/api/posts/like/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await likePost(Number(id));
        res.json(updated);
         } catch (e) {
            console.error('PUT /api/posts/like/:id error:', e); 
            res.status(500).json({ error: e.message });
         }
});



app.delete('/api/posts/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await deletePost(Number(id));
        res.json({ message: "Post eliminado" });
    } catch (e) {
        console.error('DELETE /api/posts/:id error:', e); 
        res.status(500).json({ error: e.message }); 
    }
});
                            
app.get(/.*/, (req, res) => {                               
  res.sendFile(path.join(clientDist, 'index.html'))             
});   

