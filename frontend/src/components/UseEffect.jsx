import React, { useState, useEffect } from "react";
 
function UseEffectExample() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("Loading...");
 
  useEffect(() => {
    if (name.trim() === "") {
      setMessage("Please enter your name...");
    } else {
      setMessage(`Hello, ${name}!`);
    }
  }, [name]); // runs every time 'name' changes
 
  return (
    <div>
      <input
        type="text"
        placeholder="Type your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <h1>{message}</h1>
    </div>
  )
}
 
export default UseEffectExample;
 