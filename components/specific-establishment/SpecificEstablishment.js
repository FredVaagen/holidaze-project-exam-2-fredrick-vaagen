import { useState } from "react";
import Image from "next/image";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Carousel from "react-bootstrap/Carousel";
import Button from "@material-ui/core/Button";
import Modal from "react-bootstrap/Modal";
import BackArrow from "../utility/BackArrow";
import Map from "../establishments/maps/Map";
import Enquiry from "./enquiry/EnquiryForm";
import Facilities from "./facilities/Facilities";

function SpecificEstablishmentCard({ establishment, images }) {
  //set modal show state to false ->
  const [show, setShow] = useState(false);
  //When you click close on the modal ->
  const handleClose = () => setShow(false);
  //When handleShow is called set modal to true ->
  const handleShow = () => setShow(true);
  return (
    <>
      <BackArrow />
      <Container className="establishment">
        <Container className="establishment-images">
          <h1>{establishment.name}</h1>
          <p className="establishment-address">{establishment.address}</p>
          <Carousel fade indicators={false}>
            {images.map((image) => (
              <Carousel.Item key={image.id}>
                <Image
                  className="d-block w-100"
                  src={image.url}
                  alt={image.name}
                  width="1280"
                  height="auto"
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </Container>
        <Container className="details-container">
          <Facilities {...establishment} />
          <Row className="details">
            <Col>
              <p className="description">{establishment.description}</p>
            </Col>
          </Row>
          <h3>Location </h3>
          <p className="establishment-address">{establishment.address}</p>
          <div className="map">
            <Map {...establishment} />
          </div>
          <Button className="button" variant="contained" onClick={handleShow}>
            Book {establishment.name}
          </Button>
        </Container>

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

            .establishment {
              margin-top: 5rem;
              height: auto;
              margin-bottom: 3rem;
              color: black;
              display: flex;
              flex-direction: column;
            }

            h1 {
              font-size: 20px;
              font-weight: 300;
              margin-bottom: 1px;
            }

            h3 {
              font-weight: 300;
              text-align: left;
              margin-top: 1rem;
              margin-bottom: 1rem;
            }

            .carousel-item img {
              height: 450px;
              width: 100%;
            }

            @media only screen and (max-width: 800px) {
              .carousel-item img {
                height: 300px;
              }
            }

            @media only screen and (max-width: 500px) {
              .carousel-item img {
                height: 200px;
              }
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

            .establishment-address {
              font-size: 10px;
              margin-top: 0.5rem;
              margin-bottom: 2rem;
            }

            .modal-title {
              font-weight: 300;
              font-size: 20px;
            }

            .map {
              height: 300px;
            }

            .MuiSvgIcon-root {
              opacity: 1;
            }

            .button {
              width: 100% !important;
              margin-bottom: 2rem !important;
              margin-top: 2rem !important;
              background: #fff !important;
              color: black !important;
              font-size: 11px !important;
              font-weight: 300 !important;
            }

            .map-address-panel {
              display: none;
            }
          `}
        </style>
      </Container>
    </>
  );
}

export default SpecificEstablishmentCard;
