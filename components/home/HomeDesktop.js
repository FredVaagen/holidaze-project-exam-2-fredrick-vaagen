import React from "react";
import Link from "next/link";
import Container from "react-bootstrap/Container";
import SearchBar from "../establishments/search/SearchBar";

function HomeDesktop(establishments) {
  return (
    <Container fluid className="background-image">
      <Container className="headline-container">
        <Link href="/establishments">
          <a>
            <h1 className="headline">HOLIDAZE</h1>
            <h2 className="subheading">
              Find the perfect accomedation while staying in Bergen, Norway.
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
            .headline-container {
              height: 100%;
              text-align: center;
              display: grid;
              align-content: center;
            }

            .headline {
              color: white;
              font-size: 7rem;
              margin-top: 1rem;
              font-weight: 300;
            }
            .subheading {
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
