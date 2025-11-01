
        
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EditTask from './pages/EditTask';
import CreateTask from './pages/CreateTask';
import DeleteTask from './pages/DeleteTask';
import GetTask from './pages/GetTask';
import TaskDetails from './pages/TaskDetails';
import Home from './pages/Home';




function App() {
  return (

<div>

<BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edit" element={<EditTask />} />
          <Route path="/create" element={<CreateTask />} />
          <Route path="/delete/:id" element={<DeleteTask />} />
          <Route path="/tasks" element={<GetTask />} />
          <Route path="/tasks/:id" element={<TaskDetails />} />
          
        </Routes>
        
    </BrowserRouter>




</div>

  );
}



export default App;


