import React, { useState, useContext } from "react";
import Link from "next/link";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import HotelIcon from "@material-ui/icons/Hotel";
import ExploreIcon from "@material-ui/icons/Explore";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import DashboardIcon from "@material-ui/icons/Dashboard";
import HomeIcon from "@material-ui/icons/Home";
import FilterHdrIcon from "@material-ui/icons/FilterHdr";

import { logout } from "../../../lib/auth";
import AppContext from "../../../context/AppContext";

function MobileNavigation() {
  const { user, setUser } = useContext(AppContext);
  return (
    <>
      <Navbar fixed="bottom" className="appbar">
        <Container className="appbar-container">
          <Link href="/" passHref>
            <Nav.Link>
              <FilterHdrIcon /> <p>Home</p>
            </Nav.Link>
          </Link>
          <Link href="/establishments" passHref>
            <Nav.Link>
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
                <a>
                  <DashboardIcon />
                  <p>Admin</p>
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
                  <p>Logout</p>
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
            background: #fff;
          }

          .appbar svg {
            font-size: 18px;
          }

          .appbar p {
            margin-top: 3px;
            font-size: 11px;
          }
        `}
      </style>
    </>
  );
}

export default MobileNavigation;
