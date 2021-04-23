import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";
import { BASE_URL } from "./../../constants/api";
import SortDropdown from "../../components/establishments/sort/SortDropdown";
import SimpleMap from "../../components/establishments/maps/SimpleMap";

export default function EstablishmentsPage({ establishments }) {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  return (
    <Container className="establishments">
      <h1 className="mt-3">Find a place to stay</h1>
      <SortDropdown />

      {establishments.map((establishment) => (
        <Link
          href="/establishments/[name]"
          as={`/establishments/${establishment.name}`}
          key={establishment.id}>
          <Container className="establishment-container">
            <Row className="establishment-specific">
              <Col xs={6} lg={4}>
                <Image
                  src={establishment.promoteImage.url}
                  width="400"
                  height="200"
                />
              </Col>
              <Col xs={6} lg={4}>
                <h3>{establishment.name}</h3>
                <Badge>{establishment.category}</Badge>
                <p>{establishment.address}</p>
                <p className="price">NOK {establishment.price},- per night</p>
              </Col>
              <Col xs={4} lg={4}>
                <SimpleMap {...establishment} />
              </Col>
            </Row>
          </Container>
        </Link>
      ))}

      <style global jsx>
        {`
          .main {
            height: auto;
          }

          .establishment-container {
            margin-top: 3rem;
            transition: 0.5s;
            margin-bottom: 3rem;
            border-radius: 50px;
            height: auto;
          }

          .establishment-specific {
            margin-bottom: 5rem;
          }

          .establishment-container:hover {
            transform: scale(1.02);
            cursor: pointer;
          }

          h3 {
            font-size: 20px;
            margin-bottom: 0;
          }

          .badge {
            background: None;
            color: black;
            text-transform: uppercase;
            font-size: 9px;
            margin-left: -0.3rem;

            margin-bottom: 1rem;
          }

          p {
            font-size: 12px;
          }

          .price {
            font-size: 14px;
            
          }

          img {
            border-radius: 10px;
          }
        `}
      </style>
    </Container>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${BASE_URL}/establishments?_sort=name:asc`);
  const resPrice = await fetch(`${BASE_URL}/establishments?_sort=price:asc`);
  const establishments = await res.json();
  const ascPrice = await resPrice.json();
  return {
    props: { establishments, ascPrice },
    revalidate: 1,
  };
}
