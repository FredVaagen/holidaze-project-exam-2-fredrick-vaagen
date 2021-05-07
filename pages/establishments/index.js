import { useRouter } from "next/router";
import Container from "react-bootstrap/Container";
import { BASE_URL } from "./../../constants/api";
import SearchBar from "../../components/establishments/search/SearchBar";
import EstablishmentsDesktop from "../../components/establishments/layout/desktop/EstablishmentsDesktop";
import MediaQuery from "../../components/utility/MediaQuery";
import EstablishmentsMobile from "../../components/establishments/layout/mobile/EstablishmentsMobile";

<MediaQuery />;

export default function EstablishmentsPage({ establishments }) {
  const isBreakpoint = MediaQuery(991);
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  return (
    <Container>
      <SearchBar className="searchbar-establishments" {...{ establishments }} />
      <Container className="establishments">
        {isBreakpoint ? (
          <EstablishmentsMobile {...{ establishments }} />
        ) : (
          <EstablishmentsDesktop {...{ establishments }} />
        )}
      </Container>

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
