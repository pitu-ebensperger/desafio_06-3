import { successToast, errorToast } from "./utils/toast.jsx";
import { useEffect, useState } from "react";

import {
  getPosts,
  addPost,
  deletePost,
  likePost,
} from "./services/postService";

import AddPost from "./components/AddPost";
import CardPost from "./components/CardPost";

export default function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts()
      .then((data) => {
        setPosts(data); 
      })
      .catch(() => {
        errorToast("Error al obtener los posts");
      });
  }, []); 

  const createPost = async (post) => {
  try { 
    const data = await addPost(post); 
    if (data?.id != null) { 
      setPosts((prev) => [data, ...prev]); 
    } else { 
      const fresh = await getPosts(); 
      setPosts(fresh); 
    } 
    successToast("Post creado correctamente");
  } catch (e) { 
    const msg = e?.message || "Error desconocido"; 
    errorToast(`Error al crear el post: ${msg}`);
  } 
};

  const deletePostById = (id) => {
    deletePost(id)
    .then(() => {
      setPosts((prev) => prev.filter((post) => post.id !== id)); 
      successToast("Post eliminado correctamente");
       })
      .catch(() => {
        errorToast("Error al eliminar el post");
      });
  };

  const likePostById = (id) => {
    likePost(id).then((updated) => {
      setPosts((prev) =>
        prev.map((post) =>
          post.id === id ? updated : post 
        )
      );
    })
    .catch(() => {
      errorToast("Error al dar like");
    });
};

  return (
    <div className="container mt-5">
      <h1 className="text-center"> Like Me </h1>
      <main className="row">
        <section className="col-12 col-md-4 mt-5">
          <div className="card bg-primary text-white">
            <div className="card-body">
              <h2>Add Post</h2>
              <AddPost createPost={createPost} /> 
            </div>
          </div>
        </section>
       <section className="col-12 col-md-8 mt-5 gallery">
          {posts.map((post, i) => (
            <CardPost
              key={post?.id ?? `temp-${i}-${post?.titulo ?? 'sin-titulo'}`} //*NEW*
              post={post}
              deletePostById={deletePostById}
              likePostById={likePostById}
            />
          ))}

          {posts.length === 0 && (
            <div className="card">
              <div className="card-body">
                <h2>No hay posts</h2>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
