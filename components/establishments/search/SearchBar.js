import React from "react";
import Router from "next/router";
import Container from "react-bootstrap/Container";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import Autocomplete from "@material-ui/lab/Autocomplete";

function SearchBar({ establishments }) {
  //Function to match the value of the establishment with the value of the searchbar
  const getEstablishmentName = (name) => {
    //Converts to string
    JSON.stringify(establishments, (value) => {
      if (value === name) {
      }
      //If the value === the name ->
      return value;
    });
  };

  // If you click the establishment on the serchbar pushes you to the detail page of the establishment ->
  const goToEstablishment = async (event, value) => {
    await getEstablishmentName();
    Router.push(`/establishment/${value}`);
  };
  return (
    <Container fluid className="searchbar">
      <Autocomplete
        className="autocomplete"
        options={establishments.map((option) => option.name)}
        onChange={goToEstablishment}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search places"
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
      <style global jsx>
        {`
          .searchbar {
            background: white;
            border-radius: 15px;
            border: none;
            align-self: center;
            width: 100%;
            max-width: 1280px;
            min-width: 200px;
            margin-top: 1rem;
          }
          @media only screen and (max-width: 990px) {
            .searchbar {
              border-radius: 0;
              background: white;
              position: fixed;
              border: none;
              align-self: center;
              margin-top: 0;
              width: 100%;
              max-width: 100%;
              z-index: 3;
            }
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

          .MuiInputAdornment-root {
            box-sizing: border-box;
          }
        `}
      </style>
    </Container>
  );
}

export default SearchBar;
