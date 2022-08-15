import './App.css';
import Home from './View/Home/Home'
import AskDoubt from './View/AskDoubt/AskDoubt'
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
   </Routes>
   </BrowserRouter>
  );
}

export default App;
