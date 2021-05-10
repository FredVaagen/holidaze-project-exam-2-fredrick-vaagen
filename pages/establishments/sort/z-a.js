import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Container from "react-bootstrap/Container";
import { BASE_URL } from "../../../constants/api";
import SearchBar from "../../../components/establishments/search/SearchBar";
import EstablishmentsDesktop from "../../../components/establishments/layout/desktop/EstablishmentsDesktop";
import MediaQuery from "../../../components/utility/MediaQuery";
import EstablishmentsMobile from "../../../components/establishments/layout/mobile/EstablishmentsMobile";

<MediaQuery />;

export default function EstablishmentsPage({ establishments }) {
  const [show, setShow] = useState(false);
  const isBreakpoint = MediaQuery(991);
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  return (
    <Container className="establishments">
      <Head>
        <title>Holidaze - Establishments</title>
      </Head>
      <SearchBar {...{ establishments }} />
      {isBreakpoint ? (
        <EstablishmentsMobile {...{ establishments }} />
      ) : (
        <EstablishmentsDesktop {...{ establishments }} />
      )}
      <style global jsx>
        {`
          .main {
            height: auto;
            padding: 0;
            margin: 0;
          }
        `}
      </style>
    </Container>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${BASE_URL}/establishments?_sort=name:desc`);
  const establishments = await res.json();
  return {
    props: { establishments },
    revalidate: 5,
  };
}
