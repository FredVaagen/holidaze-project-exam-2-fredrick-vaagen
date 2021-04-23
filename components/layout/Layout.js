import React from "react";
import Head from "next/head";
import { Container } from "react-bootstrap";
import Footer from "../footer/Footer";
import MediaQuery from "./MediaQuery";
import MobileNavigation from "../navigation/mobile/MobileNavigation";
import DesktopNavigation from "../navigation/desktop/DesktopNavigation";

<MediaQuery />;

const Layout = (props) => {
  const title = "Holidaze Hotel Booking";
  const isBreakpoint = MediaQuery(991);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {isBreakpoint ? (
        <>
          <Container fluid className="main">
            {props.children}
          </Container>
          <style global jsx>
            {`
              .main {
                @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300&display=swap');
                background: black;
                height:90vh;
                background: url('/me.jpg') no-repeat;
                background-position: center;
                width: 100%;
                display: flex;
                flex-direction: column;
                padding: 0;
              }
            
            `}
            </style>

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
      <Footer />
    </>
  );
};

export default Layout;
