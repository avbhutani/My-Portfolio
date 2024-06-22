import React from 'react'
import './Navbar.css'

const Navbar = ()=> {
    return (
        <>
        <nav id='header' class="navbar navbar-expand-lg navbar-dark bg-dark ">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav  ms-auto">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">About Me</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">My Skills</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Latest Projects</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Contact Me</a>
        </li>
      </ul>
    </div>
  </div>
</nav>

        </>
    )
}

export default Navbar