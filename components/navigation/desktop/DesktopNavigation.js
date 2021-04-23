import React, { useState, useContext } from "react";
import Link from "next/link";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import FilterHdrIcon from "@material-ui/icons/FilterHdr";
import { logout } from "../../../lib/auth";
import AppContext from "../../../context/AppContext";

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
    </>
  );
}

export default DesktopNavigation;
