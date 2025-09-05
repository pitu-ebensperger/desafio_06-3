import { successToast, errorToast } from "./utils/toast";
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
        setPosts((prev) => [...prev, data]);
        successToast("Post creado correctamente");
      })
      .catch((err) => {
        errorToast("Error al obtener los posts");
      });
  }, []);

  const createPost = (post) => {
    addPost(post)
      .then((data) => {
        if (data?.id != null) {                        
          setPosts((prev) => [data, ...prev]);        
        } else {
          return getPosts().then((fresh) => setPosts(fresh));
        }
      })
      .then(() => {
        successToast("Post creado correctamente");    
      })
      .catch((err) => {
        const msg = err?.message || "Error desconocido";
        errorToast(`Error al crear el post: ${msg}`);
      });
  };

  const deletePostById = (id) => {
    deletePost(id)
    .then(() => {
      setPosts((prev) => prev.filter((post) => post.id !== id)); 
      successToast("Post eliminado correctamente");
       })
      .catch(() => {
        errorToast("Error al eliminar el post"); //*NEW* (missing catch UX)
      });
  };

  const likePostById = (id) => {
    likePost(id).then(() => {
      const newPosts = posts.map((post) => {
        if (post.id === id) {
          return {
            ...post,
            likes: post.likes + 1,
          };
        }
        return post;
      });
      setPosts(newPosts);
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
       <section className="col-12 col-md-8 mt-5">
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
