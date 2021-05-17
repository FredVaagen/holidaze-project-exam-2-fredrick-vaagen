import Head from "next/head";
import Container from "react-bootstrap/Container";
import { BASE_URL } from "./../../constants/api";
import SearchBar from "../../components/establishments/search/SearchBar";
import EstablishmentsDesktop from "../../components/establishments/EstablishmentsDesktop";
import MediaQuery from "../../components/utility/MediaQuery";
import EstablishmentsMobile from "../../components/establishments/EstablishmentsMobile";

<MediaQuery />;

export default function EstablishmentsPage({
  establishments,
  nameDesc,
  priceAsc,
  priceDesc,
  sortByHotel,
  sortByGuesthouse,
  sortByBedAndBreakfast,
}) {
  const isBreakpoint = MediaQuery(991);

  return (
    <Container>
      <Head>
        <title>Holidaze - Establishments</title>
      </Head>
      <SearchBar className="searchbar-establishments" {...{ establishments }} />
      <Container className="establishments">
        {isBreakpoint ? (
          <EstablishmentsMobile
            {...{
              establishments,
              nameDesc,
              priceAsc,
              priceDesc,
              sortByHotel,
              sortByGuesthouse,
              sortByBedAndBreakfast,
            }}
          />
        ) : (
          <EstablishmentsDesktop
            {...{
              establishments,
              nameDesc,
              priceAsc,
              priceDesc,
              sortByHotel,
              sortByGuesthouse,
              sortByBedAndBreakfast,
            }}
          />
        )}
      </Container>
    </Container>
  );
}

export async function getStaticProps() {
  const resNameAsc = await fetch(`${BASE_URL}/establishments?_sort=name:asc`);
  const resNameDesc = await fetch(`${BASE_URL}/establishments?_sort=name:desc`);
  const resPriceAsc = await fetch(`${BASE_URL}/establishments?_sort=price:asc`);
  const resPriceDesc = await fetch(
    `${BASE_URL}/establishments?_sort=price:desc`
  );
  const resHotels = await fetch(`${BASE_URL}/establishments?category=hotel`);
  const resGuesthouse = await fetch(
    `${BASE_URL}/establishments?category=guesthouse`
  );
  const resBedAndBreakfast = await fetch(
    `${BASE_URL}/establishments?category=bedandbreakfast`
  );

  const establishments = await resNameAsc.json();
  const nameDesc = await resNameDesc.json();
  const priceAsc = await resPriceAsc.json();
  const priceDesc = await resPriceDesc.json();
  const sortByHotel = await resHotels.json();
  const sortByGuesthouse = await resGuesthouse.json();
  const sortByBedAndBreakfast = await resBedAndBreakfast.json();

  return {
    props: {
      establishments,
      nameDesc,
      priceAsc,
      priceDesc,
      sortByHotel,
      sortByGuesthouse,
      sortByBedAndBreakfast,
    },
    revalidate: 1,
  };
}
