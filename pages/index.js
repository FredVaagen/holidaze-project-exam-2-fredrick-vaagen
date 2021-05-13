import Head from "next/head";
import fetch from "isomorphic-unfetch";
import Container from "react-bootstrap/Container";
import { BASE_URL } from "../constants/api";
import MediaQuery from "../components/utility/MediaQuery";
import SearchBar from "../components/establishments/search/SearchBar";
import HomeMobile from "../components/home/mobile/HomeMobile";
import HomeDesktop from "../components/home/desktop/HomeDesktop";

<MediaQuery />;

export default function Home({ establishments }) {
  const isBreakpoint = MediaQuery(991);
  return (
    <>
      <Head>
        <title>Holidaze - Home</title>
      </Head>
      {isBreakpoint ? (
        <Container fluid className="background-image">
          <SearchBar {...{ establishments }} />
          <HomeMobile />
          <style global jsx>
            {`

              .main {
                background: black;
                width: 100%;
                display: flex;
                flex-direction: column;
                padding: 0;
              }

              .background-image {
                height: 90vh;
                background: url("/background-mobile.jpg") no-repeat;
                background-position: center;
                padding: 0;
              }
            `}
          </style>
        </Container>
      ) : (
        <Container fluid className="background-image">
          <Container className="headline-container">
            <HomeDesktop />
            <SearchBar {...{ establishments }} />
          </Container>
          <style global jsx>
            {`
              .main {
                background: black;
                width: 100%;
                display: flex;
                flex-direction: column;
                padding: 0;
              }
              .background-image {
                height: 100vh;
                background: url("/background-desktop.jpg") no-repeat;
                background-position: center;
                padding: 0;
              }
            `}
          </style>
        </Container>
      )}
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${BASE_URL}/establishments?_sort=name:asc`);
  const establishments = await res.json();
  return {
    props: { establishments },
    revalidate: 1,
  };
}
