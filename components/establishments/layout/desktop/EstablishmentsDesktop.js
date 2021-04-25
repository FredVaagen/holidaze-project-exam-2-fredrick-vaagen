import React from "react";
import Link from "next/link";
import Image from "next/image";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";
import SortDropdown from "../../sort/SortDropdown";
import SimpleMap from "../../maps/SimpleMap";


function EstablishmentsDesktop({establishments}) {
  return (
    <>
      <h1 className="h1">Find a place to stay</h1>
      <SortDropdown />
      {establishments.map((establishment) => (
        <Link
          href="/establishments/[name]"
          as={`/establishments/${establishment.name}`}
          key={establishment.id}>
          <Container className="establishment-container">
            <Row className="establishment-specific">
              <Col s={12} md={6} lg={4}>
                <Image
                  src={establishment.promoteImage.formats.small.url}
                  width="400"
                  height="200"
                />
              </Col>
              <Col s={12} md={6} lg={4}>
                <h3>{establishment.name}</h3>
                <Badge>{establishment.category}</Badge>
                <p>{establishment.address}</p>
                <p className="price">NOK {establishment.price},- per night</p>
              </Col>
              <Col s={4} lg={4} className="map-container">
                <SimpleMap {...establishment} />
              </Col>
            </Row>
          </Container>
        </Link>
      ))}
            <style global jsx>
        {`
          .establishment-container {
            margin-top: 3rem;
            transition: 0.5s;
            margin-bottom: 3rem;
            border-radius: 50px;
            height: auto;
          }

          .h1 {
              margin-top: 2rem;
          }

          .establishment-specific {
            margin-bottom: 8rem;
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
            font-size: 12px;
            margin-top: 6rem;
            font-weight: bold;
          }

          img {
            border-radius: 10px;
            min-height: 200px;
          }

          .searchbar {
            max-width: 100%;
          }

        `}
      </style>
    </>
  );
}

export default EstablishmentsDesktop;
