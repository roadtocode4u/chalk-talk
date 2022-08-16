import './App.css';
import Home from './views/Home/Home'
import AskDoubt from './views/AskDoubt/AskDoubt'
import Dashboard from './views/Dashboard/Dashboard'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/askdoubt" element={<AskDoubt/>}/>
    <Route path="/dashboard" element={<Dashboard/>}/>
   </Routes>
   </BrowserRouter>
  );
}

export default App;
