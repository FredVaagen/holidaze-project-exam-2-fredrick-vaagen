import { useContext } from "react";
import Link from "next/link";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
// ICONS
import FilterHdrIcon from "@material-ui/icons/FilterHdr";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import HotelIcon from "@material-ui/icons/Hotel";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import { logout } from "../../lib/auth";
import AppContext from "../../context/AppContext";

function DesktopNavigation() {
  const { user, setUser } = useContext(AppContext);
  return (
    <Container fluid>
      <Navbar>
        <Navbar.Brand href="/">
          <FilterHdrIcon />
          Holidaze
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="m-auto">
            <Link href="/establishments" passHref>
              <Nav.Link>
                <HotelIcon /> Find a place to stay
              </Nav.Link>
            </Link>
            <Link href="/contact" passHref>
              <Nav.Link>
                <ContactSupportIcon />
                Contact us
              </Nav.Link>
            </Link>
          </Nav>
          <Nav className="mr login">
            <Nav.Item>
              {user ? (
                <Link href="/admin" passHref>
                  <Nav.Link>
                    <DashboardIcon />
                    Dashboard
                  </Nav.Link>
                </Link>
              ) : (
                <></>
              )}
            </Nav.Item>
            <Nav.Item className="login-link">
              {user ? (
                <Link href="/" passHref>
                  <Nav.Link
                    className="logout"
                    onClick={() => {
                      logout();
                      setUser(null);
                    }}>
                    <ExitToAppIcon /> Logout
                  </Nav.Link>
                </Link>
              ) : (
                <Link href="/login" passHref>
                  <Nav.Link>
                    <AccountCircleIcon /> Sign in
                  </Nav.Link>
                </Link>
              )}
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <style global jsx>
        {`
          .navbar .navbar-nav .nav-link {
            padding-right: 3rem;
            font-size: 12px;
            color: black;
            opacity: 0.8;
            transition: 0.3s;
            font-family: "Roboto", sans-serif;
            font-weight: 300;
          }

          .navbar .navbar-nav .nav-link:hover {
            padding-right: 3rem;
            font-size: 12px;
            color: black;
            opacity: 0.8;
            transform: scale(1.05);
          }

          .navbar svg {
            margin-right: 5px;
          }

          .login .nav-link {
            font-family: "Roboto", sans-serif;
            font-weight: 300;
            font-size: 12px;
          }
        `}
      </style>
    </Container>
  );
}

export default DesktopNavigation;
