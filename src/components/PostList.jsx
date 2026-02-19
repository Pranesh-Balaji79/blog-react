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
    setPosts(posts.map(p => (p.id === updated.id ? updated : p)));
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
      {/* HERO */}
      <div className="hero-pro">
        <h1 className="display-5 fw-bold mb-2">Blog</h1>
        <p className="text-muted mb-4">
          Inspirational blog designs for inspiration
        </p>

        <div className="search-hero">
          <input
            className="form-control form-control-lg"
            placeholder="Search blog posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* CATEGORY CHIPS */}
      <div className="category-row">
        {["All", "General", "React", "JavaScript", "Web Dev"].map(cat => (
          <button
            key={cat}
            className={`chip ${category === cat ? "chip-active" : ""}`}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* FEATURED */}
      {posts.length > 0 && (
        <div className="featured-card card border-0">
          {posts[0].image && (
            <img
              src={posts[0].image}
              className="card-img-top"
              style={{ height: 260, objectFit: "cover" }}
            />
          )}
          <div className="card-body">
            <span className="badge bg-primary mb-2">
              {posts[0].category}
            </span>
            <h4 className="fw-bold">{posts[0].title}</h4>
            <p className="text-muted">{posts[0].content}</p>
          </div>
        </div>
      )}

      <PostForm
        addPost={addPost}
        updatePost={updatePost}
        editingPost={editingPost}
      />

      {filtered.length === 0 && (
        <div className="empty-state">
          <h5>No posts found</h5>
          <p>Start by creating your first post ✨</p>
        </div>
      )}

      <div className="post-grid">
        {filtered.map(post => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="card h-100 shadow-sm">
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
                <p className="text-muted small">{post.content}</p>
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
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}

export default PostList;
