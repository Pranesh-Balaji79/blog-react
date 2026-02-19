function Dashboard() {
  const posts = JSON.parse(localStorage.getItem("posts")) || [];

  return (
    <div className="card p-4 shadow-sm">
      <h3 className="fw-bold mb-3">📊 Dashboard</h3>
      <h5>Total Posts: {posts.length}</h5>
    </div>
  );
}

export default Dashboard;
