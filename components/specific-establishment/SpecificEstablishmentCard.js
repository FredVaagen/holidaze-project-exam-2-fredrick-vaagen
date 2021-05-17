import { useState } from "react";
import Image from "next/image";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Carousel from "react-bootstrap/Carousel";
import Button from "@material-ui/core/Button";
import Modal from "react-bootstrap/Modal";
import BackArrow from "../utility/BackArrow";
import SimpleMap from "../establishments/maps/SimpleMap";
import Enquiry from "./enquiry/EnquiryForm";
import Facilities from "./facilities/Facilities";


function SpecificEstablishmentCard({ establishment, images }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <BackArrow />
      <Container className="establishment">
        <Container className="establishment-images">
          <h1 className="h1">{establishment.name}</h1>
          <p className="establishment-address">{establishment.address}</p>
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
              </Carousel>
            </Col>
          </Row>
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
              height: 450px;
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
    </>
  );
}

export default SpecificEstablishmentCard;
