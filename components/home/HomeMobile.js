import React from "react";
import Link from "next/link";
import Container from "react-bootstrap/Container";
import SearchBar from "../establishments/search/SearchBar";

function HomeMobile(establishments) {
  return (
    
    <Container fluid className="background-image">
      <SearchBar {...establishments} />
      <Container className="headline-container">
      <Link href="/establishments">
        <a>
          <h1 className="headline">HOLIDAZE</h1>
          <h2 className="subheading">
            Find the perfect accommodation while staying in Bergen, Norway.
          </h2>
        </a>
      </Link>
      </Container>
      <style global jsx>
        {`
          .main {
            background: black;
            width: 100%;
            display: flex;
            flex-direction: column;
            padding: 0;
            min-height: 100vh;
          }

          .headline-container {
            height: 100%;
            text-align: center;
            display: grid;
            align-content: center;
          }
          

          .background-image {
            height: 100vh;
            background: url("/background-mobile.jpg") no-repeat;
            background-position: center;
            padding: 0;
          }

          .headline {
            color: white;
            font-size: 28px;
            margin-top: 1rem;
            font-weight: 300;
          }

          .subheading {
            color: white;
            text-align: center;
            font-size: 12px;
            font-weight: 300;
          }
        `}
      </style>
    </Container>
  );
}

export default HomeMobile;
