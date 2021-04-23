import React, { useState, useContext } from "react";
import Link from "next/link";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import FilterHdrIcon from "@material-ui/icons/FilterHdr";
import { logout } from "../../../lib/auth";
import AppContext from "../../../context/AppContext"

function DesktopNavigation() {
    const { user, setUser } = useContext(AppContext);
    return (
        <>
        <Navbar expand="md">
        <Navbar.Brand href="/">
          <FilterHdrIcon />
          Holidaze
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="m-auto">
            <Link href="/establishments" passHref>
              <Nav.Link className="establishments-link">
                Places to stay
              </Nav.Link>
            </Link>
            <Link href="/contact" passHref>
              <Nav.Link>Explore the city</Nav.Link>
            </Link>
            <Link href="/contact" passHref>
              <Nav.Link>Contact us</Nav.Link>
            </Link>
          </Nav>
          <Nav className="mr login">
            <Nav.Item>
              {user ? (
                <Link href="/admin">
                  <a className="mr-3">Admin Dashboard</a>
                </Link>
              ) : (
                <></>
              )}
            </Nav.Item>
            <Nav.Item className="login-link">
              {user ? (
                <Link href="/">
                  <a
                    onClick={() => {
                      logout();
                      setUser(null);
                    }}>
                    Logout
                  </a>
                </Link>
              ) : (
                <Link href="/login">
                  <a>Sign in</a>
                </Link>
              )}
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      
<style global jsx>
{`

////////////// Overriding a bunch of Bootstrap CSS for NAVIGATION and a tags /////////////////



.main {
display: flex;
flex-direction: column;
flex: 1 0; 
height: 100vh;
}

.MuiSvgIcon-root  {
color: black;
}
@media only screen and (max-width: 900px){

.main {
height: auto;
}
}
.navbar {
background: white;
height: 90px;
}
.navbar-brand  {
color: black !important;
}

a {
text-decoration: none;
color: black !important;
transistion: .3s;
}
a:hover {
text-decoration: none;
color: black !important;
transform: scale(1.11);
cursor: pointer;
}

.navbar-light .navbar-nav .nav-link {
color: black !important;

}
.navbar-light:hover .navbar-nav:hover .nav-link:hover {
color: black !important;    
}

.navbar-light .navbar-nav .active>.nav-link, .navbar-light .navbar-nav .nav-link.active, .navbar-light .navbar-nav .nav-link.show, .navbar-light .navbar-nav .show>.nav-link {
color: black !important;
}

.navbar-collapse collapse show {
background: white;
z-index: 5;
}

.navbar-light .navbar-nav .nav-link {
margin-right: 2rem;     
margin-left: 2rem;      
}


.navbar-toggler {

background: white !important;
margin-bottom: 10px;
font-size: 1rem;
}

#basic-navbar-nav {
background: white;
width: 100%;
text-align: center;
margin-top: 1rem;
z-index: 3;
}

#basic-navbar-nav a {
margin-top: 1px;
z-index: 1;  
}

.back-arrow:hover {
cursor: pointer;
}

.btn-primary:not(:disabled):not(.disabled):active {
background: black;
color: white;
box-shadow: 0 0 0 0.2rem rgb( 0 0 0 / 50%);
}



@media only screen and (max-width: 800px){

.login-link {
padding: 1rem;
margin-left: -10px;

}

}

}

`}
</style>
      </>
 )    
}

export default DesktopNavigation






