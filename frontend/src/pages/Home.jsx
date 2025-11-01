import { useNavigate } from "react-router-dom";
function Home() {
    const navigate = useNavigate();
    return(
        <>
        <h1>Task Management app</h1>

        <br />
          <button className="Edit"onClick={() => navigate("/edit")}>Edit Task</button>
          <br />
          <br />
          <button className="View"onClick={() => navigate("/tasks")}>View tasks</button>
          <br />
          <br />
          <button className="Add"onClick={() => navigate("/create")}> Add task</button>
        </>
    ) ;
}
export default Home ;