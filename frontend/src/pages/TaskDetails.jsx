import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
 
function TaskDetails() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`http://localhost:5000/tasks/${id}`)
      .then((res) => res.json())
      .then((task) => {
        // Check if the fetched data is valid
        if (!task || Object.keys(task).length === 0 || !task.title) {
          throw new Error("Task not found");
        }
 
        setTitle(task.title);
        setStatus(task.status);
        setMessage(""); // clear any previous error
      })
      .catch(() => {
        setMessage("Error fetching task details");
        setTitle("");
        setStatus("");
      });
  }, [id]);
 
  return (
    <div className="container mt-4">
      <h2>Task Details</h2>
 
      {message ? (
        // 🧭 Show error message
        <p style={{ color: "red", fontWeight: "bold" }}>{message}</p>
      ) : (
        // ✅ Show task info only when there’s no error
        <>
          <p>
            You're viewing details for task ID: <strong>{id}</strong> <br />
            Status: <strong>{status}</strong> <br />
            Name: <strong>{title}</strong>
          </p>
 
          <br />
          <button className="Edit"onClick={() => navigate("/edit")}>Edit Task</button>
          <br />
          <br />
          <button className="Delete"onClick={() => navigate(`/delete/${id}`)}>Delete task</button>
        </>
      )}
 
    </div>
  );
}
 
export default TaskDetails;