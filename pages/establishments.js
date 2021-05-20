import Head from "next/head";
import Container from "react-bootstrap/Container";
import { BASE_URL } from "../constants/api";
import SearchBar from "../components/establishments/search/SearchBar";
import EstablishmentsDesktop from "../components/establishments/EstablishmentsDesktop";
import MediaQuery from "../components/utility/MediaQuery";
import EstablishmentsMobile from "../components/establishments/EstablishmentsMobile";

//MediaQuery component to measure width of page -> 
<MediaQuery />;

export default function EstablishmentsPage({
  //Page props
  establishments,
  nameDesc,
  priceAsc,
  priceDesc,
  sortByHotel,
  sortByGuesthouse,
  sortByBedAndBreakfast,
}) {
  //Sets the mediaquery breakpoint to 991px -> 
  const isBreakpoint = MediaQuery(991);

  return (
    <>
      <Head>
        <title>Holidaze - Establishments</title>
      </Head>  
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
     
    </>
  );
}

//Fetching static data from the server -> 
export async function getStaticProps() {
  //Fetching all establihsments with ascending name -> 
  const resNameAsc = await fetch(`${BASE_URL}/establishments?_sort=name:asc`);
  //Fetching all establihsments with descending name -> 
  const resNameDesc = await fetch(`${BASE_URL}/establishments?_sort=name:desc`);
  //Fetching all establihsments with ascending price -> 
  const resPriceAsc = await fetch(`${BASE_URL}/establishments?_sort=price:asc`);
  //Fetching all establihsments with ascending price -> 
  const resPriceDesc = await fetch( `${BASE_URL}/establishments?_sort=price:desc`);
  //Fetching all establihsments with hotel category ->
  const resHotels = await fetch(`${BASE_URL}/establishments?category=hotel`);
  //Fetching all establihsments with guesthouse category ->
  const resGuesthouse = await fetch(`${BASE_URL}/establishments?category=guesthouse`);
   //Fetching all establihsments with bed and breakfast category ->
  const resBedAndBreakfast = await fetch(`${BASE_URL}/establishments?category=bedandbreakfast`);

  //Constants set for each fetch value -> 
  const establishments = await resNameAsc.json();
  const nameDesc = await resNameDesc.json();
  const priceAsc = await resPriceAsc.json();
  const priceDesc = await resPriceDesc.json();
  const sortByHotel = await resHotels.json();
  const sortByGuesthouse = await resGuesthouse.json();
  const sortByBedAndBreakfast = await resBedAndBreakfast.json();

  return {
    //Props sent to components
    props: {
      establishments,
      nameDesc,
      priceAsc,
      priceDesc,
      sortByHotel,
      sortByGuesthouse,
      sortByBedAndBreakfast,
    },
     //Page revalidates (Updates) each second to make it more dynamic. 
    revalidate: 1,
  };
}
