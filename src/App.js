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
import Orders_out from './pages/orders_out/orders_out.js';
import Signup_motoboy from './pages/Signup_motoboy/Signup_motoboy.js';
import Signup_clients from './pages/Signup_clients/Signup_clients.js';
import Signup_users from './pages/Signup_users/Signup_users.js';
import Motoboys from './pages/Motoboys/Motoboys.js';
import Clients from './pages/Clients/Clients.js';
import Motoboys_orders from './pages/Motoboys_orders/Motoboys_orders.js';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/Signin' element={<Signin />} />
          <Route path='/' element={<Home />} />
          <Route path='/order_entry' element={<Orders />} />
          <Route path='/order_out' element={<Orders_out />} />
          <Route path='/signup_motoboy' element={<Signup_motoboy />} />
          <Route path='/Signup_users' element={<Signup_users />} />
          <Route path='/Signup_client' element={<Signup_clients />} />
          <Route path='/motoboys' element={<Motoboys />} />
          <Route path='/clients' element={<Clients />} />
          <Route path='/motoboys_orders' element={<Motoboys_orders />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
