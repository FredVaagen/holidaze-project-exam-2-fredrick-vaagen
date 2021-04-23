import React, { useState, useContext } from "react";
import Head from "next/head";
import Link from "next/link";
import { Container } from "react-bootstrap";
import FilterHdrIcon from "@material-ui/icons/FilterHdr";
import HotelIcon from "@material-ui/icons/Hotel";
import ExploreIcon from "@material-ui/icons/Explore";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import DashboardIcon from "@material-ui/icons/Dashboard";
import HomeIcon from '@material-ui/icons/Home';
import { logout } from "../../lib/auth";
import AppContext from "../../context/AppContext";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Footer from "../footer/Footer";
import MediaQuery from "./MediaQuery";

<MediaQuery />;

const Layout = (props) => {
  const title = "Holidaze Hotel Booking";
  const { user, setUser } = useContext(AppContext);
  const [show, setShow] = useState(false);
  const isBreakpoint = MediaQuery(991);

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {isBreakpoint ? (
        <>
          <Container fluid className="main">
            {props.children}
          </Container>
          <Navbar fixed="bottom" className="appbar" bg="light">
            <Container className="appbar-container">
            <Link href="/" passHref>
                <Nav.Link className="establishments-link">
                  <HomeIcon /> <p>Home</p>
                </Nav.Link>
              </Link>
              <Link href="/establishments" passHref>
                <Nav.Link className="establishments-link">
                  <HotelIcon /> <p>Places</p>
                </Nav.Link>
              </Link>
              <Link href="/contact" passHref>
                <Nav.Link>
                  <ExploreIcon />
                  <p>Explore</p>
                </Nav.Link>
              </Link>
              <Link href="/contact" passHref>
                <Nav.Link>
                  <ContactSupportIcon />
                  <p>Support</p>
                </Nav.Link>
              </Link>
              <Nav.Item>
                {user ? (
                  <Link href="/admin">
                    <a className="mr-3">
                      <DashboardIcon />
                    </a>
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
                      <ExitToAppIcon />
                    </a>
                  </Link>
                ) : (
                  <Link href="/login">
                    <a>
                      <AccountCircleIcon />
                      <p>Login</p>
                    </a>
                  </Link>
                )}
              </Nav.Item>
            </Container>
          </Navbar>
          <style global jsx>
            {`
              .appbar {
                text-align: center;
              }

              .appbar p {
                margin-top: 3px;
              }
            `}
          </style>
        </>
      ) : (
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
          ;
          <Container fluid className="main">
            {props.children}
          </Container>
        </>
      )}
      <Footer />
    </div>
  );
};

export default Layout;
