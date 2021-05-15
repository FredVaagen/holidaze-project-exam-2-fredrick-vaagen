import { useState } from "react";
import fetch from "isomorphic-fetch";
import { useRouter } from "next/router";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "next/image";
import Modal from "react-bootstrap/Modal";
import Enquiry from "../../../components/establishments/enquiry/EnquiryForm";
import Carousel from "react-bootstrap/Carousel";
import { BASE_URL } from "../../../constants/api";
import SimpleMap from "../../../components/establishments/maps/SimpleMap";
import ImageUpload from "../../../components/admin/establishment/ImageUpload";
import MediaQuery from "../../../components/utility/MediaQuery";
import Button from "@material-ui/core/Button";
import BackArrow from "../../../components/utility/BackArrow";
import Facilities from "../../../components/specific-establishment/Facilities";
<MediaQuery />;

export default function Establishment({ establishment, images }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const router = useRouter();
  const isBreakpoint = MediaQuery(1200);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <BackArrow />
      <Container className="establishment">
        <h1>Preview of {establishment.name}</h1>
        <Col className="m-0 p-0 mb-5">
          <h2 className="mt-5">Add more images</h2>
          <ImageUpload {...establishment} />
        </Col>
        <Container className="establishment-images">
          <h1>{establishment.name}</h1>
          <p className="establishment-address">{establishment.address}</p>
          {isBreakpoint ? (
            <Row>
              <Col>
                <Carousel fade indicators={false}>
                  {images.map((image) => (
                    <Carousel.Item key={image.id}>
                      <Image
                        className="d-block w-100"
                        src={image.formats.small.url}
                        alt={image.name}
                        width="1000"
                        height="auto"
                      />
                    </Carousel.Item>
                  ))}

                  <Carousel.Item>
                    <Image
                      src={promoteImage.formats.small.url}
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
              <Col className="no-gutters" s={8} md={8} lg={8}>
                {images.slice(0, 4).map((image) => (
                  <Image
                    key={image.id}
                    className="detail-images ml-2 mr-2"
                    src={image.formats.small.url}
                    alt={image.name}
                    width="350"
                    height="auto"
                  />
                ))}
              </Col>
            </Row>
          )}
        </Container>
        <Container className="details-container">
          <Facilities {...establishment} />
          <Row className="details">
            <Col>
              <p className="description">{establishment.description}</p>
            </Col>
          </Row>
          <h5 className="subheading">Location </h5>
          <div className="map">
            <SimpleMap {...establishment} />
          </div>
        </Container>
        <Button variant="contained" onClick={handleShow}>
          Book
        </Button>

        <Modal
          show={show}
          size="lg"
          onHide={handleClose}
          backdrop="static"
          keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>{establishment.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Enquiry {...establishment} />
          </Modal.Body>
        </Modal>
        <style jsx global>
          {`
            .main {
              height: auto;
            }

            .MuiSvgIcon-root {
              opacity: 1;
            }

            .establishment {
              margin-top: 5rem;
              height: auto;
              margin-bottom: 3rem;
              color: black;
              display: flex;
              flex-direction: column;
            }

            .establishment h1,
            h2 {
              font-size: 26px;
              font-weight: 300;
              margin-bottom: 1px;
            }

            .establishment-address {
              font-size: 10px;
              margin-top: 0.5rem;
              margin-bottom: 2rem;
            }

            .establishment-images {
              border-bottom: 1px solid rgb(221, 221, 221);
            }

            .images img {
              height: 306px;
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
              font-weight: 300;
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
              font-weight: 200;
            }

            .MuiButtonBase-root {
              width: 100% !important;
              margin-bottom: 2rem !important;
              margin-top: 2rem !important;
              background: #fff !important;
              color: black !important;
              font-size: 11px !important;
            }
            .modal-title {
              font-weight: 300;
              font-size: 20px;
            }

            .map {
              height: 300px;
            }
          `}
        </style>
      </Container>
    </Container>
  );
}

export async function getServersideProps({ params: { name } }) {
  const establishment_res = await fetch(
    `${BASE_URL}/establishments/?name=${name}`
  );
  const specificEstablishment = await establishment_res.json();

  return {
    props: {
      establishment: specificEstablishment[0],
      images: specificEstablishment[0].images,
    },
    revalidate: 1,
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
