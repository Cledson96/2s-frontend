import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from './pages/signin/signin.js';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/Signin' element={<Signin />} />
          <Route path='/' element={<Signin />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
