import React, { useState } from "react";
import fetch from "isomorphic-fetch";
import { useRouter } from "next/router";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { BASE_URL } from "../../constants/api";
import Carousel from "react-bootstrap/Carousel";
import SimpleMap from "../../components/establishments/maps/SimpleMap";
import Enquiry from "../../components/establishments/enquiry/EnquiryForm";
import Modal from "react-bootstrap/Modal";
import Image from "next/image";

export default function Establishment({ establishment, images, promoteImage }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const router = useRouter();

  if ((!router.isFallback && !images, !promoteImage)) {
    return "ERROR";
  }

  return (
    <Container className="establishment">
      <h1>{establishment.name}</h1>
      <Container className="establishment-images">
        <Row>
          <Col s={12} md={6} className="images mb-3">
            {router.isFallback ? (
              <div>Loading…</div>
            ) : (
              <>
                <Image
                  src={promoteImage.url}
                  alt={establishment.name}
                  width="600"
                  height="auto"
                />
              </>
            )}
          </Col>
          <Col s={12} md={6}>
            <Carousel>
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
                        width="500"
                        height="auto"
                      />
                    </>
                  )}
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
        </Row>
      </Container>
      <Container className="details-container">
        <Row className="details">
          <Col>
            <h5 className="subline">About </h5>
            <p className="description">{establishment.description}</p>
          </Col>
        </Row>
        <h5 className="subline">Location </h5>
        <SimpleMap className="googlemap" {...establishment} />
        <Button className="button" onClick={handleShow}>
          Book
        </Button>
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
            margin-left: 15px;
            font-size: 26px;
            font-weight: 400;
            margin-bottom: 3rem;
          }

          .establishment-images {
            border-bottom: 1px solid rgb(221, 221, 221);
          }

          .images img {
            max-height: 300px;
            min-height: 300px;
            width: 100%;
            border-radius: 15px;
          }

          .carousel-item img {
            max-height: 300px;
            min-height: 300px;
            width: 100%;
            border-radius: 15px;
          }

          .button {
            background: none;
            color: black;
            border: 1px solid black;
            width: 100%;
            margin-bottom: 1rem;
            margin-top: 1rem;
          }

          .button:hover {
            background: black;
            color: white;
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
          }

          .subline {
            font-size: 18px;
            margin-bottom: 1rem;
          }

        `}
      </style>
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
