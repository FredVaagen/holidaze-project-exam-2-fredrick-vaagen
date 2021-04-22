import fetch from "isomorphic-fetch";
import { useRouter } from "next/router";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Carousel from "react-bootstrap/Carousel";
import { BASE_URL } from "../../../constants/api";
import SimpleMap from "../../../components/establishments/maps/SimpleMap";
import ImageUpload from "../../../components/admin/establishment/ImageUpload";

<MediaQUery />;

export default function Establishment({ establishment, images, promoteImage }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const router = useRouter();
  const isBreakpoint = MediaQuery(991);

  if (router.isFallback) {
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
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
        <Col>
          <h2 className="mt-5">Add detail images</h2>
          <ImageUpload {...establishment} />
        </Col>
      </Container>
      <style jsx global>
        {`
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
