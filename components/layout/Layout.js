import React, { useState } from "react";
import Head from "next/head";
import { Container } from "react-bootstrap";
import Footer from "../footer/Footer";
import MediaQuery from "./MediaQuery";
import MobileNavigation from "../navigation/mobile/MobileNavigation";
import DesktopNavigation from "../navigation/desktop/DesktopNavigation";

<MediaQuery />;

const Layout = (props) => {
  const [show, setShow] = useState(false);
  const isBreakpoint = MediaQuery(991);
  let title = "Holidaze Hotel Booking";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
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
