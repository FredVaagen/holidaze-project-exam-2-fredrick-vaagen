import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";
import { BASE_URL } from "./../../constants/api";
import SortDropdown from "../../components/establishments/sort/SortDropdown"

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
          key={establishment.id}
        >
          <Container className="establishment-container">
            <Row className="establishment-specific">
              <Col xs={12} md={3}>
                <Image
                  src={establishment.promoteImage.url}
                  width="500"
                  height="300"
                />
              </Col>
              <Col xs={12} md={9}>
                <h3>{establishment.name}</h3>
                <p>
                  {establishment.address}{" "}
                  <Badge className="ml-3" pill variant="dark">
                    {establishment.category}
                  </Badge>
                </p>
               
                <p className="price">NOK {establishment.price},-</p>
              </Col>
            </Row>
          </Container>
        </Link>
      ))}

      <style global jsx>
        {`
          .establishment-container {
            margin-top: 1rem;
            transition: 0.5s;
            margin-bottom: 3rem;
            border-radius: 50px;
            height: auto;
          }

          .main {
            height: auto;
          }

          .establishment-container:hover {
            transform: scale(1.01);
            cursor: pointer;
            background: #fafafa;
          }

          .establishment-specific {
            padding-top: 30px;
          }

          h3 {
            font-size: 20px;
          }

          .badge-pill {
            font-size: 10px;
          }

          p {
            font-size: 13px;
          }

          .price {
            text-align: right;
            font-weight: bold;
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
