import { useState } from 'react';
import { Link } from "react-router-dom"
import logo from "../../img/logo.png"
import '../navbar/navbar.css'

export default function Navbar({ user }) {
  const [menu_motoboy, setmenu_motoboy] = useState(false)
  const [menu_client, setmenu_client] = useState(false)
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">

      <Link to={"/"} className="brand-link">
        <img className="logo" src={logo} alt="logo" />
      </Link>

      <div className="sidebar os-host os-theme-light os-host-overflow os-host-overflow-y os-host-resize-disabled os-host-transition os-host-overflow-x">

        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <img src={user.imagedocument ? user.imagedocument : "carregando"} className="img-circle elevation-2" alt={""}></img>
          </div>
          <div className="info">
            <a className="d-block">{user.name ? user.name.split(" ")[0] : "carregando"}</a>
          </div>
        </div>


        <nav className="mt-2">
          <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">

            <li className="nav-item ">
              <Link to={'/'} className="nav-link " >
                <i className="nav-icon fas fa-tachometer-alt"></i>
                <p>
                  Dashboard
                </p>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to={'/order_entry'} > <i className="nav-icon fas fa-th"></i>
                <p>
                  Entrada de pedidos
                </p>
              </Link>
            </li>

            <li className="nav-item">
              <a href="#" className="nav-link">
                <i className="nav-icon fas fa-chart-pie"></i>
                <p>
                  Informações de  Pedidos
                </p>
              </a>
            </li>

            <li className="nav-item">
              <Link className='nav-link' to={"/signup_users"}>
                <i className="nav-icon fas fa-user"></i>
                <p>
                  Usuarios
                </p>
              </Link>
            </li>

            <li className={menu_motoboy === true ? "nav-item menu-is-opening menu-open" : "nav-item"}>
              <a onClick={() => setmenu_motoboy(!menu_motoboy)} className="nav-link">
                <i className="fa fa-motorcycle m-1" aria-hidden="true"></i>
                <p>
                  Motoboys
                  <i className="fas fa-angle-left right"></i>
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <a href="pages/layout/top-nav.html" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Pedidos</p>
                  </a>
                </li>
                <li className="nav-item">
                  <Link to={'/motoboys'} className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Informações</p>
                  </Link>

                </li>

                <li className="nav-item">
                  <Link to={'/signup_motoboy'} className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Cadastrar motoboy</p>
                  </Link>
                </li>


              </ul>
            </li>

            <li className={menu_motoboy === true ? "nav-item menu-is-opening menu-open" : "nav-item"}>
              <a onClick={() => setmenu_client(!menu_client)} className="nav-link">
                <i className="fa fa-motorcycle m-1" aria-hidden="true"></i>
                <p>
                  Clientes
                  <i className="fas fa-angle-left right"></i>
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <a href="pages/layout/top-nav.html" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Dashboard</p>
                  </a>
                </li>
                <li className="nav-item">
                  <Link to={'/motoboys'} className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Informações</p>
                  </Link>

                </li>

                <li className="nav-item">
                  <Link to={'/signup_client'} className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Cadastrar cliente</p>
                  </Link>
                </li>


              </ul>
            </li>

            <li className="nav-item">
              <a href="#" className="nav-link">
                <i className="nav-icon fas fa-envelope"></i>
                <p>
                  Email

                </p>
              </a>
            </li>

          </ul>
        </nav>

      </div>

    </aside>
  )
}