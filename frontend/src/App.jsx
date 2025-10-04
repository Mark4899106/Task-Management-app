import Hooks from './components/Hooks';
import GetHelloWorld from './components/GetHelloWorld';
import GetTasks from './components/GetTasks';
import CreateTask from './components/CreateTask';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EditTasks from './components/EditTasks';

function App() {
  return (

<div>

<BrowserRouter>
        <Routes>
          <Route path="/edit/:id" element={<EditTasks />} />
        </Routes>
    </BrowserRouter>


<h1>My Hook Demo</h1>
<Hooks />
<GetHelloWorld></GetHelloWorld>
<GetTasks></GetTasks>
<CreateTask></CreateTask>
<EditTasks></EditTasks>
</div>

  );
}

export default App;

