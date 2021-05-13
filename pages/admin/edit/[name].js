import fetch from "isomorphic-fetch";
import { useRouter } from "next/router";
import Container from "react-bootstrap/Container";
import { BASE_URL } from "../../../constants/api";
import BackArrow from "../../../components/utility/BackArrow";
import EditEstablishment from "../../../components/admin/establishment/EditEstablishment";

export default function Establishment({ establishment, images, promoteImage }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <BackArrow />
      <Container>
        <EditEstablishment {...establishment} />
      </Container>
    </Container>
  );
}

export async function getStaticProps({ params: { name } }) {
  const establishment_res = await fetch(
    `${BASE_URL}/establishments/?name=${name}`
  );
  const specificEstablishment = await establishment_res.json();

  return {
    props: {
      establishment: specificEstablishment[0],
      images: specificEstablishment[0].images,
      promoteImage: specificEstablishment[0].promoteImage,
    },
    revalidate: 5,
  };
}

export async function getStaticPaths() {
  const establishments_res = await fetch(`${BASE_URL}/establishments`);
  const establishments = await establishments_res.json();
  return {
    paths: establishments.map((el) => ({
      params: { name: String(el.name) },
    })),

    fallback: true,
  };
}