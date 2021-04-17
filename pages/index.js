import fetch from 'isomorphic-unfetch';
import Router from 'next/router';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Container from 'react-bootstrap/Container'
import { BASE_URL } from './../constants/api';


export default function Home ({establishments}) {

  const getEstablishmentName = name => {
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
    <>
    <Container fluid className="home">
        <div className="searchbar">
            <Autocomplete className="autocomplete"
              options={establishments.map(option => option.name)}
              onChange={goToEstablishment}
              renderInput={params => (
                <TextField 
                  {...params}
                  placeholder='Search Establishments...'
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment 
                        position='start'
                      >
                        <SearchIcon />
                      </InputAdornment>
                    )
                  }}
                />
              )}
            />
        </div>
   
        <style global jsx>
        {`

          .main {
            background: black;
          }
          .home {
            height:80vh;
            background: url('/me.jpg') no-repeat;
            background-position: center;
            width: 100%;
            display: flex;
            flex-direction: column;
            padding: 0;
          }
          .navbar-light .navbar-nav .nav-link {
            margin: 2rem;       
        }

          h1 {
            color: white;
            font-size: 5rem;
            text-align: center;
            padding: 4rem;
          
          }

          h2 {
            color: white;
            font-size: 1REM; 
            text-align: center;
          }
          
          .searchbar {
            background: white;
            border-radius: 50px;
            border: none;  
            align-self: center;
            width: 100%;
            max-width: 800px;
            min-width: 200px;
            padding: .6rem;
            margin-top: -1.5rem;
            z-index: 4;
            
          }

          .MuiInput-underline:before {
            border-bottom: none !important;  
        }
        
        
        .MuiInput-underline:after {
            border-bottom: none !important;  
        }

        @media only screen and (max-width: 750px){
          .searchbar {
            border-radius: 0;
            z-index: 1;
            width: 100%;
            margin: 0;
            
          }

          #basic-navbar-nav {
            background: black;
            padding: 1rem;
            text-align: center;
            margin-top: 0;
            z-index: 5;
          }

          .establishments-link {
            margin-top: 3rem;
          }
      }
  }
  `}
      </style>
      </Container>   
 
      </> 

        
  );
};

export async function getStaticProps() {
	const res = await fetch(`${BASE_URL}/establishments?_sort=name:asc`);
	const establishments = await res.json();

	return {
	  props: { establishments },
	};
  }



