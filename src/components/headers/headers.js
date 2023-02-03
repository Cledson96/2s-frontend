import { Link } from "react-router-dom"
import { useState } from 'react';


export default function Headers({setnavbar,navbar }) {


  const [fullscreen, setfullscreen] = useState(false)

  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light"  style={navbar==false?{marginLeft: 0}:{marginleft: "0px"}}>

      <ul className="navbar-nav">
        <li className="nav-item">
          <a onClick={()=>(setnavbar(!navbar))} className="nav-link" data-widget="pushmenu"  role="button"><i className="fas fa-bars"></i></a>
        </li>
        <li className="nav-item d-none d-sm-inline-block">

          <Link className="nav-link" to={'/'} >Home</Link>

        </li>
      </ul>


      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
        {fullscreen === false ?
            <a onClick={() => {document.body.requestFullscreen();setfullscreen(true)}} className="nav-link" data-widget="fullscreen1" role="button">
              <i className="fas fa-expand-arrows-alt"></i>
            </a>
            :
            <a onClick={() => {document.exitFullscreen();setfullscreen(false)}} className="nav-link" data-widget="fullscreen2" role="button">
              <i className="fas fa-expand-arrows-alt"></i>
            </a>
          }

        </li>
        <li className="nav-item">
          <a className="nav-link" data-widget="control-sidebar" data-slide="true" href="#" role="button">
            <i className="fas fa-th-large"></i>
          </a>
        </li>
      </ul>
    </nav>

  )
}