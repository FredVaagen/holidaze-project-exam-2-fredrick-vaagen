import React, { useState} from "react";
import fetch from "isomorphic-unfetch";
import Router from "next/router";
import Link from "next/link";
import Container from "react-bootstrap/Container";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { BASE_URL } from "../constants/api";
import MediaQuery from "../components/layout/MediaQuery";

<MediaQuery />;

export default function Home({ establishments }) {
  const [show, setShow] = useState(false);
  const isBreakpoint = MediaQuery(991);
  const getEstablishmentName = (name) => {
    JSON.stringify(establishments, (val) => {
      if (val === name) {
      }
      return val;
    });
  };

  const goToEstablishment = async (e, val) => {
    await getEstablishmentName();
    Router.push(`/establishments/${val}`);
  };

  return (

    //////////////MOBILE INDEX PAGE///////////////////
    <>
      {isBreakpoint ? (
        <Container className="p-0" fluid>
          <Container fluid className="searchbar">
            <Autocomplete
              className="autocomplete"
              options={establishments.map((option) => option.name)}
              onChange={goToEstablishment}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Search Establishments..."
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </Container>
          <Container className="headline-container">
            <Link href="/establishments">
              <a>
                <h1 className="headline">HOLIDAZE.</h1>
                <h2 className="subheading">
                  Find the perfect accomedation while staying in Bergen, Norway.
                </h2>
              </a>
            </Link>
          </Container>
          <style global jsx>
            {`

          .main {
            @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300&display=swap');
            background: black;
            height:90vh;
            background: url('/me.jpg') no-repeat;
            background-position: center;
            width: 100%;
            display: flex;
            flex-direction: column;
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
            font-size: 28px;
            margin-top: 1rem;
          }
          
          .subheading {
            color: white;
            text-align: center;
            font-size: 12px;
          }    
          .searchbar {
            background: white;
            
            border: none;
            align-self: center;
            width: 100%;
          }
          .MuiInputBase-root {
            height: 50px;
            border-radius: 50px !important;
          }
          .MuiAutocomplete-clearIndicator {
            visibility: visible;
          }
          .MuiInput-underline:before {
            border-bottom: none !important;
          }
          .MuiInput-underline:after {
              border-bottom: none !important;
          }
        }
    `}
          </style>
        </Container>
          //////////////END OF MOBILE INDEX PAGE///////////////////
      ) : (
        /////////////////DESKTOP INDEX PAGE///////////////////////////
        <Container className="headline-container">
          <Link href="/establishments">
            <a>
              <h1 className="headline">HOLIDAZE.</h1>
              <h2 className="subheading">
                Find the perfect accomedation while staying in Bergen, Norway.
              </h2>
            </a>
          </Link>
          <Container className="searchbar">
            <Autocomplete
              className="autocomplete"
              options={establishments.map((option) => option.name)}
              onChange={goToEstablishment}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Search Establishments..."
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </Container>
          <style global jsx>
            {`

          .main {
             @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300&display=swap');
            background: black;
            height:80vh;
            background: url('/me.jpg') no-repeat;
            background-position: center;
            width: 100%;
            display: flex;
            flex-direction: column;
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
          }
          .subheading {
            color: white;
            text-align: center;
            font-size: 20px;
          }    
          .searchbar {
            background: white;
            border-radius: 20px;
            border: none;
            align-self: center;
            width: 100%;
            max-width: 800px;
            min-width: 200px;
            margin-top: 1rem;
          }

          .MuiInputBase-root {
            height: 50px;
            border-radius: 50px !important;
          }

          .MuiAutocomplete-clearIndicator {
            visibility: visible;
          }
          .MuiInput-underline:before {
            border-bottom: none !important;
          }
  
          .MuiInput-underline:after {
              border-bottom: none !important;
          }
        }
    `}
          </style>
        </Container>
      )}
    </>
       /////////////////END OF DESKTOP INDEX PAGE///////////////////////////
  );
}

export async function getStaticProps() {
  const res = await fetch(`${BASE_URL}/establishments?_sort=name:asc`);
  const establishments = await res.json();

  return {
    props: { establishments },
    revalidate: 1,
  };
}
