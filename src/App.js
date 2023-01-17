import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from './pages/signin/signin.js';
import Home from './pages/home/Home.js';
import './plugins/fontawesome-free/css/all.min.css'
import './css/adminlte.min.css'


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/Signin' element={<Signin />} />
          <Route path='/' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
