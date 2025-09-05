// Reemplazar por la URL de la API
const BASE_URL = "http://localhost:3000/api";
const POSTS_URL = `${BASE_URL}/posts`; 

export const getPosts = async () => {
  const response = await fetch(POSTS_URL);
  const data = await response.json();
  return data;
};

export const addPost = async (post) => {
  const response = await fetch(POSTS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
  const data = await response.json();
  return data;
};



export const deletePost = async (id) => {
    const res = await fetch(`${POSTS_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) { 
    const msg = `HTTP ${res.status}`; 
    throw new Error(msg); 
  }
  return true; 
};

export const likePost = async (id) => {
  const res = await fetch(`${POSTS_URL}/like/${id}`, {
    method: "PUT",
  });
   if (!res.ok) { 
    const msg = `HTTP ${res.status}`;
    throw new Error(msg);
  }
  return true;
};