//css
import './App.css';
import './plugins/fontawesome-free/css/all.min.css'
import './css/adminlte.min.css'

//bibliotecas
import { BrowserRouter, Routes, Route } from "react-router-dom";

//componentes
import Signin from './pages/signin/signin.js';
import Home from './pages/home/Home.js';
import Orders from './pages/orders/orders.js';
import Signup_motoboy from './pages/Signup_motoboy/Signup_motoboy.js';
import Signup_users from './pages/Signup_users/Signup_users.js';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/Signin' element={<Signin />} />
          <Route path='/' element={<Home />} />
          <Route path='/order_entry' element={<Orders />} />
          <Route path='/signup_motoboy' element={<Signup_motoboy />} />
          <Route path='/Signup_users' element={<Signup_users />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
