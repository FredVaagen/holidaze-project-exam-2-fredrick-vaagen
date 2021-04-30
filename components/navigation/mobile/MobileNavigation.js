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
              <FilterHdrIcon /> Home
            </Nav.Link>
          </Link>
          <Link href="/establishments" passHref>
            <Nav.Link>
              <HotelIcon /> Places
            </Nav.Link>
          </Link>
          <Link href="/contact" passHref>
            <Nav.Link>
              <ContactSupportIcon className="contact-svg"/>
              Contact
            </Nav.Link>
          </Link>

          {user ? (
            <>
              <Nav.Item>
                <Link href="/admin" passHref>
                  <Nav.Link>
                    <DashboardIcon /> Admin
                  </Nav.Link>
                </Link>
              </Nav.Item>

              <Nav.Item>
                <Link href="/" passHref>
                  <Nav.Link
                    onClick={() => {
                      logout();
                      setUser(null);
                    }}>
                    <ExitToAppIcon />
                    Logout
                  </Nav.Link>
                </Link>
              </Nav.Item>
            </>
          ) : (
            <Nav.Item>
              <Link href="/login" passHref>
                <Nav.Link>
                  <AccountCircleIcon />
                  Login
                </Nav.Link>
              </Link>
            </Nav.Item>
          )}
        </Container>
      </Navbar>
      <style global jsx>
        {`
          .appbar {
            text-align: center;
            background: #fff;
          }

          .appbar-container {
            display: flex;
            justify-content: space-between;
          }

          .appbar svg {
            font-size: 22px;
            margin-left: 4px;
            margin-bottom: 5px;
          }


          .appbar .nav-link {
            margin-top: 3px;
            font-size: 12px;
            display: flex;
            flex-direction: column;
          }
        `}
      </style>
    </>
  );
}

export default MobileNavigation;
