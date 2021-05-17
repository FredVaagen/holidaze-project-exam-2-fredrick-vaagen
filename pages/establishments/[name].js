import Container from "react-bootstrap/Container";
import { BASE_URL } from "../../constants/api";
import SpecificEstablishmentCard from "../../components/specific-establishment/SpecificEstablishmentCard";

export default function Establishment({ establishment, images }) {
  return (
    <Container>
      <SpecificEstablishmentCard {...{ establishment, images }} />
    </Container>
  );
}

export async function getServerSideProps({ params: { name } }) {
  const res = await fetch(`${BASE_URL}/establishments/?name=${name}`);
  const specificEstablishment = await res.json();

  return {
    props: {
      establishment: specificEstablishment[0],
      images: specificEstablishment[0].images,
    },
  };
}

export async function getServerSidePaths() {
  const res = await fetch(`${BASE_URL}/establishments`);
  const establishments = await res.json();
  return {
    paths: establishments.map((el) => ({
      params: { name: String(el.name) },
    })),

    fallback: true,
  };
}
