import React, { useState, useEffect } from 'react';
 
function GetHelloWorld() {
  const [message, setMessage] = useState('Loading...');
 
  useEffect(() => {
    fetch('http://127.0.0.1:5000/hello')
      .then(response => response.json())
      .then(data => setMessage(data.output))
      .catch(error => {
        console.error("Error fetching message:", error);
        setMessage("Could not fetch message.");
      });
  }, []);
 
  return (
    <div>
      <h2>API Message:</h2>
      <p>{message}</p>
    </div>
  );
}


 
export default GetHelloWorld;
