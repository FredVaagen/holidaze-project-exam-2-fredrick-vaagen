import { useContext } from "react";
import Link from "next/link";
//Bootstrap imports
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// My components
import { logout } from "../../lib/auth";
import AppContext from "../../context/AppContext";
// Material UI icons 
import HotelIcon from "@material-ui/icons/Hotel";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import DashboardIcon from "@material-ui/icons/Dashboard";
import FilterHdrIcon from "@material-ui/icons/FilterHdr";

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
              <span className="mr-2">
                <ContactSupportIcon />
              </span>
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
            font-family: "Roboto", sans-serif;
            font-weight: 300;
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

          @media only screen and (max-width: 400px) {
            .navbar-expand > .container {
              flex-wrap: wrap;
            }
            .appbar svg {
              font-size: 14px;
            }
            .appbar .nav-link {
              font-size: 9px;
            }
          }
        `}
      </style>
    </>
  );
}

export default MobileNavigation;
