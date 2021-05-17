import React, { useContext, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Carousel from "react-bootstrap/Carousel";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Badge from "react-bootstrap/Badge";
import Button from "@material-ui/core/Button";
import SimpleMap from "./maps/SimpleMap";
import AppContext from "../../context/AppContext";

function EstablishmentsDesktop({
  establishments,
  nameDesc,
  priceAsc,
  priceDesc,
  sortByHotel,
  sortByGuesthouse,
  sortByBedAndBreakfast,
}) {
  const { user } = useContext(AppContext);
  const [sortEstablishments, setSortEstaeblishments] = useState(establishments);
  const [sortName, setSortName] = useState("Sort places")

  return (
    <>
      <h1>Find a place to stay</h1>
      <DropdownButton
        className="mt-3"
        id="dropdown-basic-button"
        title={sortName}>
        <Dropdown.Item
          href="#/a-z"
          onClick={() => {
            setSortEstaeblishments(establishments);
            setSortName("Sort places: a-z");
          }}>
          Name: a - z
        </Dropdown.Item>
        <Dropdown.Item
          href="#/z-a"
          onClick={() => {
            setSortEstaeblishments(nameDesc);
            setSortName("Sort places: z-a");
          }}>
           Name: z - a
        </Dropdown.Item>
        <Dropdown.Item
          href="#/Lower-Higher"
          onClick={() => {
            setSortEstaeblishments(priceAsc);
            setSortName("Sort places: Lower - higher");
          }}>
          Price: Lower - higher
        </Dropdown.Item>
        <Dropdown.Item
          href="#/lower-higher"
          onClick={() => {
            setSortEstaeblishments(priceDesc);
            setSortName("Sort places: Higher - lower");
          }}>
          Price: Higher - lower
        </Dropdown.Item>
        <Dropdown.Item
          href="#/hotels"
          onClick={() => {
            setSortEstaeblishments(sortByHotel);
            setSortName("Sort places: Hotels");
          }}>
          Hotels
        </Dropdown.Item>
        <Dropdown.Item
          href="#/guesthouses"
          onClick={() => {
            setSortEstaeblishments(sortByGuesthouse);
            setSortName("Sort places: Guesthouses");
          }}>
          Guesthouses
        </Dropdown.Item>
        <Dropdown.Item
          href="#/bedandbreakfast"
          onClick={() => {
            setSortEstaeblishments(sortByBedAndBreakfast);
            setSortName("Sort places: Bed and Breakfast");
          }}>
          Bed and Breakfast
        </Dropdown.Item>
      </DropdownButton>

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

          ///////////OVERRIDING DROPDOWNBUTTON CSS FROM BOOTSTRAP ////////////////

          .btn-primary:not(:disabled):not(.disabled).active, .btn-primary:not(:disabled):not(.disabled):active, .show>.btn-primary.dropdown-toggle {
            color: black !important;
            background-color: #fff;
            border-color: #005cbf;
        }

        .btn-primary {
          color: black !important;
          background-color: #fff !important;
          border: none !important;
          box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
        }

        .dropdown-item:active {
        color: black !important;
        background: none !important;
        } 

        ///////////////////////END////////////////////////////////////
        `}
      </style>
    </>
  );
}

export default EstablishmentsDesktop;
