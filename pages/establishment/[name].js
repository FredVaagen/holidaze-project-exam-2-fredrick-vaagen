import Head from "next/head";
import { BASE_URL } from "../../constants/api";
import SpecificEstablishmentCard from "../../components/specific-establishment/SpecificEstablishment";

export default function Establishment({ establishment, images }) {
  return (
    <>
      <Head>
        <title>Holidaze - {establishment.name}</title>
      </Head>
      <SpecificEstablishmentCard {...{ establishment, images }} />
    </>
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
