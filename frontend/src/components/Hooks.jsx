import React, { useState } from "react";
 
function Hooks() {

  const [count, setCount] = useState(0); // start with 0
 
  return (
<div>
<p>Count: {count}</p>
<button onClick={() => setCount(count + 1)}>Increase</button>

</div>

  );

} 

function Hooks() {
  const [count, setCount] = useState(0);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-2">Counter</h2>
      <p className="text-lg">Count: {count}</p>
      <button
        onClick={() => setCount(count + 1)}
        className="mt-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
      >
        Increase
      </button>
    </div>
  );
}

export default Hooks;                                                           

 