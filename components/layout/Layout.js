import { Container } from "react-bootstrap";
import Footer from "../footer/Footer";
import MediaQuery from "../utility/MediaQuery";
import MobileNavigation from "../navigation/mobile/MobileNavigation";
import DesktopNavigation from "../navigation/desktop/DesktopNavigation";

<MediaQuery />;

const Layout = (props) => {
  const isBreakpoint = MediaQuery(991);

  return (
    <>
      {isBreakpoint ? (
        <>
          <Container fluid className="main">
            {props.children}
          </Container>
          <MobileNavigation />
        </>
      ) : (
        <>
          <DesktopNavigation />
          <Container fluid className="main">
            {props.children}
          </Container>
        </>
      )}
      <style global jsx>{`
        .main {
          font-family: "Roboto", sans-serif;
          margin: 0;
          padding: 0;
        }

        a {
          color: black;
          text-decoration: none;
        }

        a:hover {
          text-decoration: none;
          color: black !important;
          cursor: pointer;
        }
      `}</style>
      <Footer />
    </>
  );
};

export default Layout;
