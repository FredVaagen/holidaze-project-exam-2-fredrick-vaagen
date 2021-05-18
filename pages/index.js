import Head from "next/head";
import Container from "react-bootstrap/Container";
import { BASE_URL } from "../constants/api";
import MediaQuery from "../components/utility/MediaQuery";
import HomeMobile from "../components/home/HomeMobile";
import HomeDesktop from "../components/home/HomeDesktop";

//MediaQuery component to measure width of page ->
<MediaQuery />;

export default function Home(establishments) {
  //Sets the mediaquery breakpoint to 991px ->
  const isBreakpoint = MediaQuery(991);

  return (
    <>
      <Head>
        <title>Holidaze - Home</title>
      </Head>
      {isBreakpoint ? (
        //If width is LESS than 991px ->
        <HomeMobile {...establishments} />
      ) : (
        //if width is GREATER than 991px -> 
        <HomeDesktop {...establishments} />
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
