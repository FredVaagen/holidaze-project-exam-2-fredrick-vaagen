import React, { useContext, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Carousel from "react-bootstrap/Carousel";
import Badge from "react-bootstrap/Badge";
import Button from "@material-ui/core/Button";
import SimpleMap from "../../maps/SimpleMap";
import AppContext from "../../../../context/AppContext";

function EstablishmentsDesktop({ establishments,nameDesc,priceAsc,priceDesc,sortByHotel,sortByGuesthouse,sortByBedAndBreakfast }) {
  const { user } = useContext(AppContext);
  const [sortEstablishments, setSortEstaeblishments] = useState(establishments);

  return (
    <>
      <h1>Find a place to stay</h1>
      <Container>
      <Button
        variant="contained"
        className="button sort"
        onClick={() => {
          setSortEstaeblishments(establishments);
        }}>
        Sort by name (a-z)
      </Button>
      <Button
        variant="contained"
        className="button sort"
        onClick={() => {
          setSortEstaeblishments(nameDesc);
        }}>
        Sort by name (z-a)
      </Button>
      <Button
        variant="contained"
        className="button sort"
        onClick={() => {
          setSortEstaeblishments(priceAsc);
        }}>
        Sort by price (High-Low)
      </Button>
      <Button
        variant="contained"
        className="button sort"
        onClick={() => {
          setSortEstaeblishments(priceDesc);
        }}>
         Sort by price (Low-High)
      </Button>
      <Button
        variant="contained"
        className="button sort"
        onClick={() => {
          setSortEstaeblishments(sortByHotel);
        }}>
         Sort by Hotels
      </Button>
      <Button
        variant="contained"
        className="button sort"
        onClick={() => {
          setSortEstaeblishments(sortByGuesthouse);
        }}>
         Sort by Guesthouses
      </Button>
      <Button
        variant="contained"
        className="button sort"
        onClick={() => {
          setSortEstaeblishments(sortByBedAndBreakfast);
        }}>
         Sort by Bed and Breakfasts
      </Button>
      </Container>
      {sortEstablishments.map((establishment) => (
        <Link
          href="/establishments/[name]"
          as={`/establishments/${establishment.name}`}
          key={establishment.id}>
          <Container className="establishment-container">
            <Row className="establishment-specific">
              <Col
                s={12}
                md={6}
                lg={3}
                className="establishment-specific__image-col">
                <Carousel fade indicators={false} interval={null}>
                  {establishment.images.map((image) => (
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
              <Col s={12} md={6} lg={4} className="details">
                <h3>{establishment.name}</h3>
                <Badge>{establishment.category}</Badge>
                <p className="address">{establishment.address}</p>
                <Button variant="contained" className="button">
                  NOK {establishment.price} per night
                </Button>
                {user ? (
                  <Link
                    href="/admin/edit/[name]"
                    as={`/admin/edit/${establishment.name}`}>
                    <Button variant="contained" className="button mt-2">
                      Edit
                    </Button>
                  </Link>
                ) : (
                  <></>
                )}
              </Col>
              <Col s={4} lg={5} className="map-container">
                <SimpleMap {...establishment} />
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
          .establishment-container:hover {
            transform: scale(1.01);
            cursor: pointer;
          }

          h1 {
            margin-top: 2rem;
            font-weight: 300;
          }
          .col-md-6, .col-lg-3, .col-lg-5 {
            padding: 0;
            margin: 0;
          }
          .details h3 {
            font-size: 20px;
            margin-bottom: 0;
            font-weight: 300;
          }
          .establishment-specific {
            box-shadow: 0 1px 3px rgb(41 51 57 / 50%);
            margin: 0 auto;
            padding-right: 0;
            padding-left: 0;
            margin-bottom: 2rem;
            padding: 0;
          }
          .details {
            padding: 20px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
          .badge {
            background: None;
            color: black;
            text-transform: uppercase;
            font-size: 9px;
            font-weight: 400;
            margin-top: 10px;
            margin-bottom: 1rem;
            text-align: left;
          }
          p {
            font-size: 12px;
          }
          .price, .address {
            font-size: 12px;
            font-weight: 300;
          }
          .button {
            background: #fff !important;
            color: black !important;
            font-size: 11px !important;
            font-weight: 300 !important;
          }
          .establishment-specific__image-col {
            padding-top: 10px;;
            padding-left: 10px;
          }
          .establishment-specific__image-col img {
            height: 100%;     
          }
          .searchbar {
            max-width: 100%;
          }

          .sort {
            margin: 5px;
          }
        `}
      </style>
    </>
  );
}

export default EstablishmentsDesktop;
