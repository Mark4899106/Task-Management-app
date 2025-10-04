// GetTasks.jsx
import React, { useEffect, useState } from 'react';

function GetTasks() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');

  // Replace this with your actual token (ideally store in localStorage or context)
  const token = localStorage.getItem('access_token'); // or a hardcoded string for now

  useEffect(() => {
    fetch('http://127.0.0.1:5000/tasks', {
      headers: {
        Authorization: `Bearer ${token}`, // Add JWT token to request
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch tasks. Are you logged in?');
        }
        return response.json();
      })
      .then(data => {
        setTasks(data);
      })
      .catch(err => {
        console.error('Error:', err);
        setError(err.message);
      });
  }, []);

  return (
    <div>
      <h2>Tasks:</h2>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <ul>
          {tasks.map(task => (
            <li key={task.id}>{task.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default GetTasks;