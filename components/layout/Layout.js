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
          <Container fluid className="main p-0 m-0">
            {props.children}
          </Container>
          <MobileNavigation />
        </>
      ) : (
        <>
          <DesktopNavigation />
          <Container fluid className="main p-0 m-0">
            {props.children}
          </Container>
        </>
      )}
      <Footer />
    </>
  );
};

export default Layout;
