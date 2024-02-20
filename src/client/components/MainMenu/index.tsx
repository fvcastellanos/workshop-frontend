import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { UserService } from '@/services/UserService';

const MainMenu = () => {

  const supabase = createClientComponentClient();
  const [user, setUser] = useState<User>();
  const router = useRouter();

  const userService = new UserService();

  supabase.auth.getUser()
  .then(response => {
    
    if (response.error) {
      console.log(response.error);
      return;
    }

    if (response.data.user) {

      setUser(response.data.user);
    }
  }).catch(error => {
    console.log(error);
  });

  const logoutUser = () => {

    userService.logout()
    .then(() => {

      router.refresh();
    }).catch(error => {
      console.log(error);
    });

    // supabase.auth.signOut()
    // .then(data => {

    //   if (data.error) {
    //     console.log(data.error);
    //     return;
    //   }

    //   document.location.href = '/';
    // })
    // .catch(error => {
    //   console.log(error);
    // });
  };
  
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Link href={"/"} passHref legacyBehavior>
          <Navbar.Brand>
            <img
                alt=""
                src="/img/logo.png"
                width="70"
                height="30"
                className="d-inline-block align-top"
              />{' '}
            
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link href={"/"} passHref legacyBehavior>
              <Nav.Link>Inicio</Nav.Link>
            </Link>
            <NavDropdown title="Catálogos" id="basic-nav-dropdown">

              <Link href={"/car-brands"} passHref legacyBehavior>
                <NavDropdown.Item>Marcas de Vehículos</NavDropdown.Item>
              </Link>
              <Link href={"/contacts"} passHref legacyBehavior>
                <NavDropdown.Item>Contactos</NavDropdown.Item>
              </Link>
              <Link href={"/products"} passHref legacyBehavior>
                <NavDropdown.Item>Productos</NavDropdown.Item>                
              </Link>
              <Link href={"/product-categories"} passHref legacyBehavior>
                <NavDropdown.Item>Categorías de Productos</NavDropdown.Item>
              </Link>
              <Link href={"/inventory-movement-types"} passHref legacyBehavior>
                <NavDropdown.Item>Tipos de Movimientos</NavDropdown.Item>
              </Link>

              {/* <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item> */}
            </NavDropdown>
            {/* <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}

            <Link href={"/work-orders"} passHref legacyBehavior>
              <Nav.Link>Ordenes</Nav.Link>
            </Link>

            <NavDropdown title="Movimientos" id="basic-nav-dropdown">
            <Link href={"/provider-invoices"} passHref legacyBehavior>
                <NavDropdown.Item>Facturas Proveedores</NavDropdown.Item>
              </Link>
              <Link href={"/inventory"} passHref legacyBehavior>
                <NavDropdown.Item>Inventario</NavDropdown.Item>
              </Link>
            </NavDropdown>


          </Nav>
          <Nav className='justify-content-end' style={{width: "100%"}}>
            <NavDropdown title={user?.email} id="nvProfile" className='ml-auto' >
              <NavDropdown.Item onClick={logoutUser}>LogOut</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>    
  );
}

export default MainMenu;
