import React, { useEffect, useState } from 'react';

function EditTaskComponent() {
  const [tasks, setTasks] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('pending');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch all tasks initially
  useEffect(() => {
    fetch('http://127.0.0.1:5000/tasks')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load tasks');
        return res.json();
      })
      .then((data) => setTasks(data))
      .catch((err) => {
        console.error(err);
        setError('Could not load tasks.');
      });
  }, []);

  // When a task is selected, fetch its full data (with status)
  useEffect(() => {
    if (!selectedId) return;

    fetch(`http://127.0.0.1:5000/tasks/${selectedId}`)
      .then((res) => {
        if (!res.ok) throw new Error('Task not found');
        return res.json();
      })
      .then((data) => {
        setTitle(data.title);
        setStatus(data.status || 'pending');
        setError('');
        setSuccess('');
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to load selected task.');
      });
  }, [selectedId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!selectedId || !title.trim()) {
      setError('Please select a task and enter a title.');
      return;
    }

    try {
      const res = await fetch(`http://127.0.0.1:5000/tasks/${selectedId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, status }),
      });

      if (res.ok) {
        setSuccess('Task updated successfully!');
      } else {
        const errorData = await res.json();
        setError(errorData.error || 'Failed to update task.');
      }
    } catch (err) {
      console.error(err);
      setError('Could not connect to the server.');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Edit Task</h2>

      {error && <p className="text-red-600 mb-2">{error}</p>}
      {success && <p className="text-green-600 mb-2">{success}</p>}

      <div className="mb-4">
        <label className="block mb-1 font-medium">Select a Task:</label>
        <select
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
          className="border p-2 w-full"
        >
          <option value="">-- Choose a task --</option>
          {tasks.map((task) => (
            <option key={task.id} value={task.id}>
              {task.title}
            </option>
          ))}
        </select>
      </div>

      {selectedId && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full"
            placeholder="Task title"
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border p-2 w-full"
          >
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Update Task
          </button>
        </form>
      )}
      <br />
          <button className="View"onClick={() => navigate("/tasks")}>View tasks</button>
          <br />
          <br />
          <button className="Home"onClick={() => navigate("/")}>Home</button>
    </div>
  );
}


export default EditTaskComponent;
