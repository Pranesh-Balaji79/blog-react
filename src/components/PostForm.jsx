import { useState, useEffect } from "react";

function PostForm({ addPost, updatePost, editingPost }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("General");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (editingPost) {
      setTitle(editingPost.title);
      setContent(editingPost.content);
      setCategory(editingPost.category || "General");
      setImage(editingPost.image || "");
    }
  }, [editingPost]);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const post = {
      id: editingPost ? editingPost.id : Date.now(),
      title,
      content,
      category,
      image,
      date: new Date().toLocaleDateString()
    };

    editingPost ? updatePost(post) : addPost(post);

    setTitle("");
    setContent("");
    setImage("");
  };

  return (
    <form className="card p-4 mb-4 shadow-sm" onSubmit={handleSubmit}>
      <h5 className="fw-bold mb-3">✨ Create Post</h5>

      <input
        className="form-control mb-2"
        placeholder="Post title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        className="form-control mb-2"
        rows="3"
        placeholder="Write something..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />

      <select
        className="form-select mb-2"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option>General</option>
        <option>React</option>
        <option>JavaScript</option>
        <option>Web Dev</option>
      </select>

      <input
        type="file"
        className="form-control mb-3"
        accept="image/*"
        onChange={handleImage}
      />

      <button className="btn btn-primary">Publish</button>
    </form>
  );
}

export default PostForm;
