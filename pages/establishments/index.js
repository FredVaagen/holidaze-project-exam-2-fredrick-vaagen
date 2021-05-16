import Head from "next/head";
import Container from "react-bootstrap/Container";
import { BASE_URL } from "./../../constants/api";
import SearchBar from "../../components/establishments/search/SearchBar";
import EstablishmentsDesktop from "../../components/establishments/layout/desktop/EstablishmentsDesktop";
import MediaQuery from "../../components/utility/MediaQuery";
import EstablishmentsMobile from "../../components/establishments/layout/mobile/EstablishmentsMobile";

<MediaQuery />;

export default function EstablishmentsPage({ establishments}) {
  const isBreakpoint = MediaQuery(991);

  return (
    <Container>
      <Head>
        <title>Holidaze - Establishments</title>
      </Head>
      <SearchBar className="searchbar-establishments" {...{ establishments }} />
      <Container className="establishments">
        {isBreakpoint ? (
          <EstablishmentsMobile {...{ establishments }} />
        ) : (
          <EstablishmentsDesktop {...{ establishments}} />
        )}
      </Container>
    </Container>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${BASE_URL}/establishments?_sort=name:asc`);
  const establishments = await res.json();


  return {
    props: { establishments},
    revalidate: 1,
  };
}
