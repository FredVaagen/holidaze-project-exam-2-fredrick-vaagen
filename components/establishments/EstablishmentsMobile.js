import React, { useState } from "react";
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
import SearchBar from "./search/SearchBar";

function EstablishmentsMobile({
  establishments,
  nameDesc,
  priceAsc,
  priceDesc,
  sortByHotel,
  sortByGuesthouse,
  sortByBedAndBreakfast,
}) {
  // Set the state sortEstablishments used to map the establishment. If you wanna sort by hotels set state of establishments to sortByHotels for.ex. ->
  const [sortEstablishments, setSortEstaeblishments] = useState(establishments);
  //Used to change the name of the sort places to matching sort category for UX purposes ->
  const [sortName, setSortName] = useState("Sort places");

  return (
    <>
      <SearchBar {...{ establishments }} />
      <Container>
        <h1 className="mb-5">Find a place to stay</h1>
        <DropdownButton
          className="mt-3"
          id="dropdown-basic-button"
          title={sortName}>
          <Dropdown.Item
            href="#/a-z"
            onClick={() => {
              //on click set new state ->
              setSortEstaeblishments(establishments);
              setSortName("Sort places: a-z");
            }}>
            Name: a - z
          </Dropdown.Item>
          <Dropdown.Item
            href="#/z-a"
            onClick={() => {
              //on click set new state ->
              setSortEstaeblishments(nameDesc);
              setSortName("Sort places: z-a");
            }}>
            Name: z - a
          </Dropdown.Item>
          <Dropdown.Item
            href="#/Lower-Higher"
            onClick={() => {
              //on click set new state ->
              setSortEstaeblishments(priceAsc);
              setSortName("Sort places: Lower - higher");
            }}>
            Price: Lower - higher
          </Dropdown.Item>
          <Dropdown.Item
            href="#/lower-higher"
            onClick={() => {
              //on click set new state ->
              setSortEstaeblishments(priceDesc);
              setSortName("Sort places: Higher - lower");
            }}>
            Price: Higher - lower
          </Dropdown.Item>
          <Dropdown.Item
            href="#/hotels"
            onClick={() => {
              //on click set new state ->
              setSortEstaeblishments(sortByHotel);
              setSortName("Sort places: Hotels");
            }}>
            Hotels
          </Dropdown.Item>
          <Dropdown.Item
            href="#/guesthouses"
            onClick={() => {
              //on click set new state ->
              setSortEstaeblishments(sortByGuesthouse);
              setSortName("Sort places: Guesthouses");
            }}>
            Guesthouses
          </Dropdown.Item>
          <Dropdown.Item
            href="#/bedandbreakfast"
            onClick={() => {
              //on click set new state ->
              setSortEstaeblishments(sortByBedAndBreakfast);
              setSortName("Sort places: Bed and Breakfast");
            }}>
            Bed and Breakfast
          </Dropdown.Item>
        </DropdownButton>
        {sortEstablishments.map((establishment) => (
          //sortEstablishments value get set by the useState function [sortEstablishments, setSortEstaeblishments] = useState(establishments));
          // onClick functions above changes the state to the desired value (ex. sortByGuesthouse)
          <Link
            href="/establishment/[name]"
            as={`/establishment/${establishment.name}`}
            key={establishment.id}>
            <Container className="establishment-container">
              <Row className="establishment-specific">
                <Col
                  s={5}
                  md={5}
                  lg={6}
                  className="establishment-specific__image-col">
                  <Carousel fade indicators={false}>
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
                <Col s={5} md={5} lg className="details">
                  <h3>{establishment.name}</h3>
                  <Badge>{establishment.category}</Badge>
                  <p>{establishment.address}</p>
                  <p>NOK {establishment.price} per night </p>
                  <Button variant="contained" className="button">
                    details
                  </Button>
                </Col>
              </Row>
            </Container>
          </Link>
        ))}
        <style global jsx>
          {`
          .main {
            min-height: 1000px;
          }
        
          .establishment-container {
            transition: 0.5s;
            padding: 0;
            margin-0;
            margin-top: 3rem;
            margin-bottom: 3rem;
          }

           h1 {
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
            height: 200px;
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
              height: 200px;
            
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






          //OVERRIDING DROPDOWNBUTTON CSS FROM BOOTSTRAP -> 
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

        `}
        </style>
      </Container>
    </>
  );
}

export default EstablishmentsMobile;
