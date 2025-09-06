import TrashIcon from "./icons/TrashIcon";
import HeartIcon from "./icons/HeartIcon";
import '../index.css'

export default function CardPost({ post, deletePostById, likePostById }) {
  return (
    <article className="card mb-4">
      <img
        src={post.img}
        alt=""
        className="card-img-top"
      />
      <div className="card-body">
        <h5>{post.titulo}</h5>
        <p>{post.descripcion}</p>
        <div className="d-flex mt-3 justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <button className="btn-icon" onClick={() => likePostById(post.id)}>
                <HeartIcon/>
              </button>
            <span className="ms-2">{post.likes}</span>
          </div>
          <button className="btn-icon" onClick={() => deletePostById(post.id)}>
            <TrashIcon />
          </button>
          </div>
        </div>
    </article>
  );
}
