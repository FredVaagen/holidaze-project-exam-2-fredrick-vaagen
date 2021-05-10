import React from "react";
import Link from "next/link";
function HomeDesktop() {
  return (
    <>
      <Link href="/establishments">
        <a>
          <h1 className="headline">HOLIDAZE</h1>
          <h2 className="subheading">
            Find the perfect accomedation while staying in Bergen, Norway.
          </h2>
        </a>
      </Link>
      <style global jsx>
        {`
          .headline-container {
            height: 100%;
            text-align: center;
            display: grid;
            align-content: center;
            font-family: roboto; 
            font-weight: 300;
          }

          .headline {
            color: white;
            font-size: 7rem;
            margin-top: 1rem;
          }
          .subheading {
            color: white;
            text-align: center;
            font-size: 20px;
          }
        `}
      </style>
    </>
  );
}

export default HomeDesktop;
