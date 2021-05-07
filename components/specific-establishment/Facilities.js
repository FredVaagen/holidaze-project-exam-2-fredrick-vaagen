import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

//ICONS
import WifiIcon from "@material-ui/icons/Wifi";
import TvIcon from "@material-ui/icons/Tv";
import SmokeFreeIcon from "@material-ui/icons/SmokeFree";
import AirportShuttleIcon from "@material-ui/icons/AirportShuttle";
import LocalBarIcon from "@material-ui/icons/LocalBar";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";
import AcUnitIcon from "@material-ui/icons/AcUnit";
import AccessibleIcon from "@material-ui/icons/Accessible";
import ComputerIcon from "@material-ui/icons/Computer";

function Facilities(props) {
  const wifi = props.facilities.wifi;
  const tv = props.facilities.tv;
  const smokefree = props.facilities.smokefree;
  const airportshuttle = props.facilities.airportshuttle;
  const hotelbar = props.facilities.hotelbar;
  const gym = props.facilities.gym;
  const ac = props.facilities.ac;
  const accesible = props.facilities.accesible;
  const workstation = props.facilities.workstation;

  function Accessible() {
    if (accesible) {
      return (
        <Col>
          <AccessibleIcon /> Accessible
        </Col>
      );
    }
  }

  function WorkStation() {
    if (workstation) {
      return (
        <Col>
          <ComputerIcon />
          Workstation
        </Col>
      );
    }
  }

  function SmokeFree() {
    if (smokefree) {
      return (
        <Col>
          <SmokeFreeIcon /> Smokefree
        </Col>
      );
    }
  }

  function AirCondition() {
    if (ac) {
      return (
        <Col>
          <AcUnitIcon /> Aircondition
        </Col>
      );
    }
  }
  function AirportShuttle() {
    if (airportshuttle) {
      return (
        <Col>
          <AirportShuttleIcon /> Airport Shuttle
        </Col>
      );
    }
  }

  function Gym() {
    if (gym) {
      return (
        <Col>
          <FitnessCenterIcon /> Gym
        </Col>
      );
    }
  }

  function Wifi() {
    if (wifi) {
      return (
        <Col>
          <WifiIcon /> Wifi
        </Col>
      );
    }
  }

  function Tv() {
    if (tv) {
      return (
        <Col>
          <TvIcon /> Tv
        </Col>
      );
    }
  }
  function HotelBar() {
    if (hotelbar) {
      return (
        <Col>
          <LocalBarIcon /> Hotel Bar
        </Col>
      );
    }
  }

  return (
   
    <Container className="facilities">
     
      <h3>Facilities</h3>

      <Col>
        <Row>
          {Accessible()} 
          {WorkStation()} 
          {SmokeFree()}
        </Row>
      </Col>
      <Col>
        <Row>
          {AirCondition()}
          {AirportShuttle()} 
          {Gym()}
        </Row>
      </Col>
      <Col>
        <Row>
          {Tv()}
          {Wifi()}
          {HotelBar()}
        </Row>
      </Col>

      <style global jsx>
        {`
          h3 {
            font-weight: 300;
            text-align: left;
            margin-top: 2rem;
            margin-bottom: 2rem;
          }
          .facilities {
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            justify-content: space-between;
            height: auto;

            font-size: 11px;
            font-weight: 300;
            margin-bottom: 2rem;
          }

          .facilities .col {
            margin-top: 10px;
          }

          .facilities svg {
            font-size: 22px;
            opacity: 0.7;
            margin-right: 5px;
          }
        `}
      </style>
    </Container>
  );
}

export default Facilities;
