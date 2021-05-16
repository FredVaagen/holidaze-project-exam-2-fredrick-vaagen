import Head from "next/head";
import Container from "react-bootstrap/Container";
import { BASE_URL } from "../../../constants/api";
import SearchBar from "../../../components/establishments/search/SearchBar";
import EstablishmentsDesktop from "../../../components/establishments/layout/desktop/EstablishmentsDesktop";
import MediaQuery from "../../../components/utility/MediaQuery";
import EstablishmentsMobile from "../../../components/establishments/layout/mobile/EstablishmentsMobile";

<MediaQuery />;

export default function EstablishmentsPage({ establishments }) {
  const isBreakpoint = MediaQuery(991);

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

export async function getServerSideProps() {
  const res = await fetch(`${BASE_URL}/establishments?category=hotel`);
  const establishments = await res.json();
  return {
    props: { establishments },
  };
}
