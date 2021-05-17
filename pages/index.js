import Head from "next/head";
import Container from "react-bootstrap/Container";
import { BASE_URL } from "../constants/api";
import MediaQuery from "../components/utility/MediaQuery";
import SearchBar from "../components/establishments/search/SearchBar";
import HomeMobile from "../components/home/HomeMobile";
import HomeDesktop from "../components/home/HomeDesktop";

//MediaQuery component to measure width of page -> 
<MediaQuery />;

export default function Home({ establishments }) {
  //Sets the mediaquery breakpoint to 991px -> 
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
                min-height: 100vh;
              }

              .background-image {
                height: 100vh;
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
             
                display: flex;
                flex-direction: column;
                padding: 0;
                min-height: 100vh;
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
//Fetching static data from the server -> 
export async function getStaticProps() {
  //Fetching all establihsments with ascending name -> 
  const res = await fetch(`${BASE_URL}/establishments?_sort=name:asc`);
  //Set response data to constant -> 
  const establishments = await res.json();

  return {
    //Props to send to component -> 
    props: { establishments },
    //Page revalidates (Updates) each second to make it more dynamic. 
    revalidate: 1,
  };
}
