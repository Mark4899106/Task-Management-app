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
export default Hooks;                                                           

 