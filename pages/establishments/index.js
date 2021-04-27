import { useState } from "react";
import { useRouter } from "next/router";
import Container from "react-bootstrap/Container";
import { BASE_URL } from "./../../constants/api";
import SearchBar from "../../components/establishments/search/SearchBar";
import EstablishmentsDesktop from "../../components/establishments/layout/desktop/EstablishmentsDesktop";
import MediaQuery from "../../components/layout/MediaQuery";
import EstablishmentsMobile from "../../components/establishments/layout/mobile/EstablishmentsMobile";

<MediaQuery />;


export default function EstablishmentsPage({ establishments }) {
  const [show, setShow] = useState(false);
  const isBreakpoint = MediaQuery(991);
  const router = useRouter();
  let title = "test";

  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  return (
    <Container  className="establishments">
      <SearchBar {...{ establishments }} />
      {isBreakpoint ? (
        <EstablishmentsMobile {...{ establishments }} />
      ) : (
        <EstablishmentsDesktop {...{ establishments }} />
      )}
    </Container>
  );
}

export async function getStaticProps() {
  const resAscName = await fetch(`${BASE_URL}/establishments?_sort=name:asc`);
  const resDescName = await fetch(`${BASE_URL}/establishments?_sort=name:desc`);
  const resAscPrice = await fetch(`${BASE_URL}/establishments?_sort=price:asc`);
  const resDescPrice = await fetch(
    `${BASE_URL}/establishments?_sort=price:desc`
  );

  const establishments = await resAscName.json();
  const descName = await resDescName.json();
  const ascPrice = await resAscPrice.json();
  const descPrice = await resDescPrice.json();

  return {
    props: { establishments, descName, ascPrice, descPrice },
    revalidate: 5,
  };
}
