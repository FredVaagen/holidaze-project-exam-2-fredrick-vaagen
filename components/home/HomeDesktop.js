import React from "react";
import Link from "next/link";
import Container from "react-bootstrap/Container";
import SearchBar from "../establishments/search/SearchBar";

function HomeDesktop(establishments) {
  return (
    <Container fluid className="background-image">
      <Container className="text-container">
        <Link href="/establishments">
          <a>
            <h1>Holidaze</h1>
            <h2>
              Find the perfect accommodation while staying in Bergen, Norway.
            </h2>
          </a>
        </Link>
        <SearchBar {...establishments} />
        <style global jsx>
          {`
            .main {
              display: flex;
              flex-direction: column;
              padding: 0;
              min-height: 100vh;
            }
            .background-image {
              height: 100vh;
              background: url("/background-desktop.jpg") no-repeat;
              background-position: center;
              padding: 0;
            }
            .text-container {
              height: 100%;
              text-align: center;
              display: grid;
              align-content: center;
            }

            h1 {
              color: white;
              font-size: 100px;
              margin-top: 1rem;
              font-weight: 300;
            }

            h2 {
              color: white;
              text-align: center;
              font-size: 20px;
              font-weight: 300;
            }

            .searchbar {
              width: 700px;
            }
          `}
        </style>
      </Container>
    </Container>
  );
}

export default HomeDesktop;
