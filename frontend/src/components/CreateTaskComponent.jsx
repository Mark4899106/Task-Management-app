import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function CreateTaskComponent({ onTaskCreated }){
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!title.trim()) {
      setError('Task title cannot be empty.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title }),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccess(`Task "${data.title}" created successfully!`);
        setTitle('');
        if (onTaskCreated) {
          onTaskCreated(data); // Notify parent to refresh task list
        }
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to create task');
      }
    } catch (err) {
      setError('Error: Could not connect to the server.');
    }
    return (
<div className="p-4">
<h2 className="text-xl font-bold mb-4">Create New Task</h2>
<form onSubmit={handleSubmit} className="space-y-4">
<input 
type="text"
value={title}
onChange={(e) => setTitle(e.target.value)}
placeholder="Enter task title"
className="border rounded p-2 w-full"
/>
<button
type="submit"
className="bg-blue-500 text-white px-4 py-2 rounded"
>
Add Task
</button>
</form>
{title && <p className="mt-2 text-green-600">{title}</p>}
</div>
);  
}

return (
  <div className="bg-white p-4 rounded shadow">
    <h2 className="text-xl font-semibold mb-4">Create New Task</h2>

    {error && <p className="text-red-600 mb-2">{error}</p>}
    {success && <p className="text-green-600 mb-2">{success}</p>}

    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task title"
        className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        Add Task
      </button>
    </form>
    <br />
          <button className="View"onClick={() => navigate("/tasks")}>View tasks</button>
          <br />
          <br />
          <button className="Home"onClick={() => navigate("/")}>Home</button>
  </div>
);
  };






export default CreateTaskComponent;
