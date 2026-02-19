import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PostForm from "./PostForm";

function PostList() {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("posts")) || [];
    setPosts(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  const addPost = (post) => setPosts([post, ...posts]);

  const updatePost = (updated) => {
    setPosts(posts.map(p => p.id === updated.id ? updated : p));
    setEditingPost(null);
  };

  const deletePost = (id) =>
    setPosts(posts.filter(p => p.id !== id));

  const filtered = posts.filter(post =>
    post.title.toLowerCase().includes(search.toLowerCase()) &&
    (category === "All" || post.category === category)
  );

  return (
    <>
      <PostForm
        addPost={addPost}
        updatePost={updatePost}
        editingPost={editingPost}
      />

      <div className="row mb-4">
        <div className="col-md-6 mb-2">
          <input
            className="form-control"
            placeholder="🔍 Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="col-md-6">
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>All</option>
            <option>General</option>
            <option>React</option>
            <option>JavaScript</option>
            <option>Web Dev</option>
          </select>
        </div>
      </div>

      {filtered.map(post => (
        <motion.div
          key={post.id}
          className="card mb-4 shadow border-0"
          whileHover={{ scale: 1.02 }}
        >
          {post.image && (
            <img
              src={post.image}
              className="card-img-top"
              style={{ height: 200, objectFit: "cover" }}
            />
          )}

          <div className="card-body">
            <span className="badge bg-primary mb-2">
              {post.category}
            </span>

            <h5 className="fw-bold">{post.title}</h5>
            <p>{post.content}</p>

            <small className="text-muted">{post.date}</small>

            <div className="mt-3">
              <button
                onClick={() => setEditingPost(post)}
                className="btn btn-warning btn-sm me-2"
              >
                Edit
              </button>

              <button
                onClick={() => deletePost(post.id)}
                className="btn btn-danger btn-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </>
  );
}

export default PostList;
