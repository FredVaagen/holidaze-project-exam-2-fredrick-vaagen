import React, { useContext } from "react";
import Head from "next/head";
import Link from "next/link";
import { Container} from "react-bootstrap";
import { logout } from "../../lib/auth";
import AppContext from "../../context/AppContext";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Footer from "../footer/Footer";

const Layout = (props) => {
    const title = "Holidaze" ;
    const { user, setUser } = useContext(AppContext);

    return (
      <div>
        <Head>
          <title>{title}</title>
          <meta charSet="utf-8" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Navbar expand="md">
        <Navbar.Brand href="/">Holidaze</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="m-auto">
          <Link href="/establishments" passHref><Nav.Link className="establishments-link">Places to stay</Nav.Link></Link>
          <Link href="/contact" passHref><Nav.Link>Explore the city</Nav.Link></Link>
          <Link href="/contact" passHref><Nav.Link>Contact us</Nav.Link></Link>
          </Nav>
          <Nav className="mr login">
            <Nav.Item>
             {user ? (
               <Link href="/admin">
                 <a className="mr-3">
                   Admin Dashboard
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
                    }}
                  >
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
        <style global jsx >{`

       ////////////// Overriding a bunch of Bootstrap CSS for NAVIGATION and a tags /////////////////
          
          @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300&display=swap');

          * {
          font-family: 'Roboto', sans-serif;
          font-weight: 300;
          
          }

          .main {
            display: flex;
            flex-direction: column;
            flex: 1 0; 
            height: 100vh;
           
          }

          .navbar {
            background: black;
            height: 90px;
            
          }
          .navbar-brand  {
            color: white !important;
          }

          a {
            text-decoration: none;
            color: white;
            transistion: .3s;
          }
          a:hover {
            text-decoration: none;
            color: white;
            transform: scale(1.11);
            cursor: pointer;
          }

          .navbar-light .navbar-nav .nav-link {
            color: white;
            
        }
        .navbar-light:hover .navbar-nav:hover .nav-link:hover {
            color: white;    
        }

        .navbar-light .navbar-nav .active>.nav-link, .navbar-light .navbar-nav .nav-link.active, .navbar-light .navbar-nav .nav-link.show, .navbar-light .navbar-nav .show>.nav-link {
          color: white !important;
      }

      .navbar-collapse collapse show {
        background: black;
        z-index: 5;
      }

      .navbar-light .navbar-nav .nav-link {
        margin-right: 2rem;     
        margin-left: 2rem;      
      }


      .navbar-toggler {
        color: red !important;
        background: white !important;
        margin-bottom: 10px;
        font-size: 1rem;
      }

      #basic-navbar-nav {
        background: black;
        width: 100%;
        text-align: center;
        margin-top: 1rem;
        z-index: 3;
      }

      #basic-navbar-nav a {
        margin-top: 1px;
        z-index: 1;  
      }

      @media only screen and (max-width: 800px){

        .login-link {
          padding: 1rem;
          margin-left: -10px;
          margin-top: 2rem;
        }


        }

      }
    
      `}
    </style>
        <Container fluid className="main">{props.children}</Container>
        <Footer />
      </div>
    );
  };
  
  export default Layout;
  // import Router from 'next/router'
  // <div onClick={() => Router.back()} className="ml-3">Back</div>

  







