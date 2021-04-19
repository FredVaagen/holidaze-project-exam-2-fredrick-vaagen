import Link from "next/link";
import fetch from "isomorphic-fetch";
import { useRouter } from "next/router";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Carousel from "react-bootstrap/Carousel";
import SimpleMap from "../../../components/establishments/maps/SimpleMap";
import { BASE_URL } from "../../../constants/api";
import EditEstablishment from "../../../components/admin/establishment/EditEstablishment";

export default function Establishment({ establishment, images, promoteImage }) {
  const router = useRouter();
  if ((!router.isFallback && !images, !promoteImage)) {
    return "ERROR";
  }

  return (
    <Container className="establishment">
      <h1>{establishment.name}</h1>
      <Container className="establishment__imagesAndMaps">
        <Row>
          <Col s={12} md={6} className="images mb-3">
            <Carousel>
              <Carousel.Item>
                {router.isFallback ? (
                  <div>Loading…</div>
                ) : (
                  <>
                    <Image src={promoteImage.url} alt={establishment.name} />
                  </>
                )}
              </Carousel.Item>
              {images.map((image) => (
                <Carousel.Item key={image.id}>
                  {router.isFallback ? (
                    <div>Loading…</div>
                  ) : (
                    <>
                      <Image
                        className="d-block w-100"
                        src={image.url}
                        alt={image.name}
                      />
                    </>
                  )}
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
          <Col s={12} md={6}>
            <SimpleMap className="googlemap" {...establishment} />
          </Col>
        </Row>
      </Container>

      <Container className="details-container">
        <Row className="details">
          <Col>
            <p>{establishment.description}</p>
            <div className="price-location">
              <p className="price">NOK {establishment.price} per night</p>
              <p className="location">Location: {establishment.address} </p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <Link href="/enquiry/[name]" as={`/enquiry/${establishment.name}`}>
              <Button className="button">BOOK NOW</Button>
            </Link>
          </Col>
        </Row>
      </Container>

      <Container>
        <h2>Update establishment</h2>
        <EditEstablishment {...establishment} />
      </Container>

      <style jsx global>
        {`
          .main {
            height: auto;
          }

          .establishment {
            margin-top: 5%;
            height: auto;
            margin-bottom: 5%;
            color: black;
            display: flex;
            flex-direction: column;
          }

          .establishment h1 {
            margin-left: 10px;
          }

          .carousel-item img {
            max-height: 300px;
            width: 100%;
            min-height: 300px;
          }

          .price-location {
            display: flex;
            justify-content: space-between;
          }

          .button {
            background: none;
            color: black;
            border: 1px solid black;
            width: 200px;
            margin-bottom: 1rem;
            margin-top: 1rem;
          }

          .button:hover {
            background: black;
            color: white;
          }

          .form input {
            display: block;
            margin-top: 20px;
          }
        `}
      </style>
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
    revalidate: 1,
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
