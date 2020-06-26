import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const Layout = ({children}) => {
  return (
    <React.Fragment>
      <Navbar bg="dark" expand="lg" variant="dark">
        <Link to="/"><Navbar.Brand>ArqWeb</Navbar.Brand></Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link to="/users" className="nav-link">Usuarios</Link>
            <Link to="/categories" className="nav-link">Categorias</Link>
            <Link to="/courses" className="nav-link">Cursos</Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div className="mt-4"></div>
      {children}
    </React.Fragment>
  )
}