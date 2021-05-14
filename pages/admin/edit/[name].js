import fetch from "isomorphic-fetch";
import Container from "react-bootstrap/Container";
import { BASE_URL } from "../../../constants/api";
import BackArrow from "../../../components/utility/BackArrow";
import EditEstablishment from "../../../components/admin/establishment/EditEstablishment";

export default function Establishment({ establishment}) {
  return (
    <Container>
      <BackArrow />
      <Container>
        <EditEstablishment {...establishment} />
      </Container>
    </Container>
  );
}

export async function getServerSideProps({ params: { name } }) {
  const establishment_res = await fetch(
    `${BASE_URL}/establishments/?name=${name}`
  );
  const specificEstablishment = await establishment_res.json();

  return {
    props: {
      establishment: specificEstablishment[0],
 
    },
    
  };
}

export async function getServerSidePaths() {
  const establishments_res = await fetch(`${BASE_URL}/establishments`);
  const establishments = await establishments_res.json();
  return {
    paths: establishments.map((el) => ({
      params: { name: String(el.name) },
    })),

    fallback: true,
  };
}