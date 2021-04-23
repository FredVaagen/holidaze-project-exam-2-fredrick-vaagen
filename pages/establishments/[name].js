import { useState} from "react";
import fetch from "isomorphic-fetch";
import { useRouter } from "next/router";
import Image from "next/image";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Carousel from "react-bootstrap/Carousel";
import Spinner from "react-bootstrap/Spinner";
import SimpleMap from "../../components/establishments/maps/SimpleMap";
import Enquiry from "../../components/establishments/enquiry/EnquiryForm";
import { BASE_URL } from "../../constants/api";
import BackArrow from "../../components/layout/BackArrow";
import MediaQuery from "../../components/layout/MediaQuery";

<MediaQuery />;

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
    <Container>
      <BackArrow />
      <Container className="establishment">
        <Container className="establishment-images">
          <h1>{establishment.name}</h1>
          {isBreakpoint ? (
            <Row>
              <Col>
                <Carousel fade indicators={false}>
                  {images.map((image) => (
                    <Carousel.Item key={image.id}>
                      <Image
                        className="d-block w-100"
                        src={image.url}
                        alt={image.name}
                        width="1000"
                        height="auto"
                      />
                    </Carousel.Item>
                  ))}

                  <Carousel.Item>
                    <Image
                      src={promoteImage.url}
                      alt={establishment.name}
                      width="1000"
                      height="auto"
                    />
                  </Carousel.Item>
                </Carousel>
              </Col>
            </Row>
          ) : (
            <Row className="no-gutters">
              <Col s={4} md={4} lg={4} className="images mb-3 no-gutters">
                <Image
                  src={promoteImage.url}
                  alt={establishment.name}
                  width="1000"
                  height="auto"
                />
              </Col>
              <Col className="no-gutters" s={8} md={8} lg={8}>
                {images.slice(0, 4).map((image) => (
                  <Image
                    key={image.id}
                    className="detail-images ml-2 mr-2"
                    src={image.url}
                    alt={image.name}
                    width="300"
                    height="auto"
                  />
                ))}
              </Col>
            </Row>
          )}
        </Container>
        <Container className="details-container">
          <Row className="details">
            <Col>
              <h5 className="subheading">About </h5>
              <p className="description">{establishment.description}</p>
              <Button className="button" onClick={handleShow}>
                Book
              </Button>
            </Col>
          </Row>
          <h5 className="subheading">Location </h5>
          <SimpleMap {...establishment} />
        </Container>

        <Modal
          show={show}
          size="lg"
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>{establishment.name} Enquiry</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Enquiry {...Establishment} />
          </Modal.Body>
        </Modal>
        <style jsx global>
          {`
            .main {
              height: auto;
            }

            .establishment {
              margin-top: 5rem;
              height: auto;
              margin-bottom: 3rem;
              color: black;
              display: flex;
              flex-direction: column;
            }

            .establishment h1 {
              font-size: 26px;
              font-weight: 400;
              margin-bottom: 2rem;
            }

            .establishment-images {
              border-bottom: 1px solid rgb(221, 221, 221);
            }

            .images img {
              height: 306px;
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

            .button:focus {
              background: black;
              color: white;
              box-shadow: 0 0 0 0.2rem rgb(0 0 0 / 50%);
            }

            .details {
              height: auto;
              border-bottom: 1px solid rgb(221, 221, 221);
              margin-top: 3rem;
              margin-bottom: 2rem;
            }

            .details .description {
              margin-bottom: 2rem;
              margin-top: 1rem;
              font-size: 14px;
            }

            .carousel-item img {
              max-height: 300px;
              min-height: 300px;
              width: 100%;
              border-radius: 5px;
            }

            .subheading {
              font-size: 18px;
              margin-bottom: 1rem;
            }
          `}
        </style>
      </Container>
    </Container>
  );
}

export async function getStaticProps({ params: { name } }) {
  const res = await fetch(`${BASE_URL}/establishments/?name=${name}`);
  const specificEstablishment = await res.json();

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
  const res = await fetch(`${BASE_URL}/establishments`);
  const establishments = await res.json();
  return {
    paths: establishments.map((el) => ({
      params: { name: String(el.name) },
    })),

    fallback: true,
  };
}
