import React from "react";
import Link from "next/link";
import Image from "next/image";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Button from "@material-ui/core/Button";
import Badge from "react-bootstrap/Badge";
import SortDropdown from "../../sort/SortDropdown";

function EstablishmentsMobile({ establishments }) {
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
              <Col
                s={5}
                md={5}
                lg={6}
                className="establishment-specific__image-col">
                <Image
                  src={establishment.promoteImage.formats.small.url}
                  width="250"
                  height="200"
                />
              </Col>
              <Col s={5} md={5} lg className="details">
                <h3>{establishment.name}</h3>
                <Badge>{establishment.category}</Badge>
                <p>{establishment.address}</p>

                <Button variant="contained" className="button">
                  NOK {establishment.price} per night || See more
                </Button>
              </Col>
            </Row>
          </Container>
        </Link>
      ))}
      <style global jsx>
        {`
          .establishment-container {
            transition: 0.5s;
            padding: 0;
            margin-0;
            margin-top: 3rem;
            margin-bottom: 3rem;
          }

          .h1 {
            font-size: 24px;
            padding-top: 5rem;
            font-weight: 300;
          }

          .establishment-specific {
            box-shadow: 0 1px 3px rgb(41 51 57 / 50%);
            padding-right: 0;
            padding-left: 0;
            margin-bottom: 2rem;
            margin: 0 auto;
          }

          .row {
            flex-wrap: nowrap;
          }
          .establishment-container:hover {
            transform: scale(1.02);
            cursor: pointer;
          }

          .details h3 {
            font-size: 20px;
            margin-bottom: 0;
            font-weight: 300;
          }

          .badge {
            background: None;
            color: black;
            text-transform: uppercase;
            font-size: 9px;
            margin-left: -0.3rem;
            margin-top: 10px;
            text-align: left;
            margin-bottom: 1rem;
            font-weight: 300;
          }

          p {
            font-size: 12px;
          }

          .price {
            font-weight: 300;
          }

          img {
            border-radius: 10px;
          }

          .button {
            color: black !important;
            background: #fff !important;
            font-size: 11px !important;
            width: 100%;
            font-weight: 300;
            
          }

          .details {
            padding: 10px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            font-weight: 300;
          }

     

          .establishment-specific__image-col {
            padding-top: 5px;;
            padding-left: 6px;
         
          }

          img {
            border-radius: 0;
          }


          @media only screen and (max-width: 530px) {
            .row {
              flex-wrap: nowrap;
            }
            .establishment-specific {
              margin: 0 auto;
              padding-bottom: 1rem;
            }

            img {
              height: 185px;
            
            }
          }

          @media only screen and (max-width: 500px) {
            .row {
              flex-wrap: wrap;
            }
            .establishment-specific {
             
              padding-bottom: 1rem;
            }

            img {
              width: 450px;
              padding-left: 7px !important;
              padding-top: 5px !important;
            }
          }



        `}
      </style>
    </>
  );
}

export default EstablishmentsMobile;
