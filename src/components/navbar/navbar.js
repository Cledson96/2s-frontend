import { useState } from 'react';
import logo from "../../img/logo.png"
import '../navbar/navbar.css'
export default function Navbar({ user }) {
  const [menu_motoboy, setmenu_motoboy] = useState(false)

  return (
    <aside class="main-sidebar sidebar-dark-primary elevation-4">
  
      <a href="/" class="brand-link">
       <img className="logo"src={logo} alt="logo"/>
      </a>

      {/* <!-- Sidebar --> */}
      <div class="sidebar os-host os-theme-light os-host-overflow os-host-overflow-y os-host-resize-disabled os-host-transition os-host-overflow-x">
        {/* <!-- Sidebar user panel (optional) --> */}
        <div class="user-panel mt-3 pb-3 mb-3 d-flex">
          <div class="image">
            <img src={user.imagedocument ? user.imagedocument : "carregando"} class="img-circle elevation-2" alt={""}></img>
          </div>
          <div class="info">
            <a class="d-block">{user.name ? user.name.split(" ")[0] : "carregando"}</a>
          </div>
        </div>

        {/* <!-- Sidebar Menu --> */}
        <nav class="mt-2">
          <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">

            <li class="nav-item menu-open">
              <a href="#" class="nav-link active">
                <i class="nav-icon fas fa-tachometer-alt"></i>
                <p>
                  Dashboard

                </p>
              </a>

            </li>
            <li class="nav-item">
              <a href="pages/widgets.html" class="nav-link">
                <i class="nav-icon fas fa-th"></i>
                <p>
                  Entrada de pedidos
                </p>
              </a>
            </li>

            <li class="nav-item">
              <a href="#" class="nav-link">
                <i class="nav-icon fas fa-chart-pie"></i>
                <p>
                  Informações de  Pedidos

                </p>
              </a>

            </li>
            <li class="nav-item">
              <a href="#" class="nav-link">
                <i class="nav-icon fas fa-user"></i>
                <p>
                  Usuarios

                </p>
              </a>

            </li>
            <li class={menu_motoboy === true ? "nav-item menu-is-opening menu-open" : "nav-item"}>
              <a onClick={() => setmenu_motoboy(!menu_motoboy)} class="nav-link">
                <i class="fa fa-motorcycle m-1" aria-hidden="true"></i>
                <p>
                  Motoboys
                  <i class="fas fa-angle-left right"></i>
                </p>
              </a>
              <ul class="nav nav-treeview">
                <li class="nav-item">
                  <a href="pages/layout/top-nav.html" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>Pedidos</p>
                  </a>
                </li>
                <li class="nav-item">
                  <a href="pages/layout/top-nav-sidebar.html" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>Informações</p>
                  </a>
                </li>

                <li class="nav-item">
                  <a href="pages/layout/top-nav-sidebar.html" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>Cadastrar motoboy</p>
                  </a>
                </li>


              </ul>
            </li>


            <li class="nav-item">
              <a href="#" class="nav-link">
                <i class="nav-icon fas fa-envelope"></i>
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