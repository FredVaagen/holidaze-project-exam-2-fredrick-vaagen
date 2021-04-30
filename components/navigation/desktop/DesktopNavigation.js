import React, { useContext } from "react";
import Link from "next/link";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import FilterHdrIcon from "@material-ui/icons/FilterHdr";
import ExploreIcon from "@material-ui/icons/Explore";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import HotelIcon from "@material-ui/icons/Hotel";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import { logout } from "../../../lib/auth";
import AppContext from "../../../context/AppContext";

function DesktopNavigation() {
  const { user, setUser } = useContext(AppContext);
  return (
    <Container fluid>
      <Navbar expand="md">
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
                <ExploreIcon /> Explore the city
              </Nav.Link>
            </Link>
            <Link href="/contact" passHref>
              <Nav.Link>
                {" "}
                <ContactSupportIcon />
                Contact us
              </Nav.Link>
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
                  <Nav.Link><AccountCircleIcon /> Sign in</Nav.Link>
                </Link>
              )}
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <style global jsx>
        {`
          .navbar-expand-md .navbar-nav .nav-link {
            padding-right: 3rem;
          }
        `}
      </style>
    </Container>
  );
}

export default DesktopNavigation;
