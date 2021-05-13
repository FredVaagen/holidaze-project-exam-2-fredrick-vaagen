import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import fetch from "isomorphic-fetch";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Carousel from "react-bootstrap/Carousel";

import Button from "@material-ui/core/Button";

import SimpleMap from "../../components/establishments/maps/SimpleMap";
import Enquiry from "../../components/establishments/enquiry/EnquiryForm";
import { BASE_URL } from "../../constants/api";
import BackArrow from "../../components/utility/BackArrow";
import MediaQuery from "../../components/utility/MediaQuery";
import Facilities from "../../components/specific-establishment/Facilities";


<MediaQuery />;


export default function Establishment({ establishment, images, promoteImage }) {
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
      <Head>
        <title>Holidaze - {establishment.name}</title>
      </Head>
      <BackArrow />
      <Container className="establishment">
        <Container className="establishment-images">
          <h1 className="h1">{establishment.name}</h1>
          <p className="establishment-address">{establishment.address}</p>
          {isBreakpoint ? (
            <Row className="mb-3">
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
              <Col s={4} md={4} lg={4} className="images mb-3 no-gutters">
                <Image
                  src={promoteImage.formats.small.url}
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

            .establishment h1 {
              font-size: 20px;
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
              display:  flex;
              flex-direction: column;
              
            }

            .images img {
              height: 306px;
              
            }

            .details {
              height: auto;
              border-bottom: 1px solid rgb(221, 221, 221);
              margin-top: 1rem;
              margin-bottom: 2rem;
            }

            .details .description {
              margin-bottom: 2rem;
              margin-top: 1rem;
              font-size: 14px;
              font-weight: 300;
            }

            .carousel-item img {
              max-height: 200px;
              min-height: 200px;
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
            h3 {
              font-weight: 300;
              text-align: left;
              margin-top: 2rem;
              margin-bottom: 2rem;
            }
            .facilities {
              display: flex;
              flex-direction: column;
              flex-wrap: wrap;
              justify-content: space-between;
              height: auto;
  
              font-size: 11px;
              font-weight: 300;
              margin-bottom: 2rem;
            }
  
            .facilities .col {
              margin-top: 10px;
            }
  
            .facilities svg {
              font-size: 22px;
              opacity: 0.7;
              
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
    revalidate: 5,
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
