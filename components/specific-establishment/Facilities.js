import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

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
        <div className="mr-1">
          <AccessibleIcon /> Accsessible
        </div>
      );
    }
  }

  function WorkStation() {
    if (workstation) {
      return (
        <div className="mr-1">
          <ComputerIcon /> Workstation
        </div>
      );
    }
  }

  function SmokeFree() {
    if (smokefree) {
      return (
        <div className="mr-1">
          <SmokeFreeIcon /> Smokefree
        </div>
      );
    }
  }

  function AirCondition() {
    if (ac) {
      return (
        <div>
          <AcUnitIcon /> Aircondition
        </div>
      );
    }
  }
  function AirportShuttle() {
    if (airportshuttle) {
      return (
        <div className="mr-1">
          <AirportShuttleIcon /> Airport Shuttle
        </div>
      );
    }
  }

  function Gym() {
    if (gym) {
      return (
        <div className="mr-1">
          <FitnessCenterIcon /> Gym
        </div>
      );
    }
  }

  function Wifi() {
    if (wifi) {
      return (
        <div className="mr-1">
          <WifiIcon /> Wifi
        </div>
      );
    }
  }

  function Tv() {
    if (tv) {
      return (
        <div className="mr-1">
          <TvIcon /> TV
        </div>
      );
    }
  }
  function HotelBar() {
    if (hotelbar) {
      return (
        <div className="mr-1">
          <LocalBarIcon /> Bar
        </div>
      );
    }
  }

  return (
    <Container fluid className="facilities">
      <h3>Facilities</h3>

      <Row>
        {Accessible()}
        {WorkStation()}
        {SmokeFree()}
        {AirCondition()}
        {AirportShuttle()}
        {Gym()}
        {Tv()}
        {Wifi()}
        {HotelBar()}
      </Row>

      <style global jsx>
        {`
          .facilities h3 {
            font-weight: 300;
            text-align: left;
            margin-top: 2rem;
            margin-bottom: 2rem;
            margin-left: -1rem;
          }

          .facilities {
            height: auto;
            font-size: 11px;
            font-weight: 300;
            margin-bottom: 2rem;
          }

          .facilities .row {
            display: flex;
        
          }

          .facilities svg {
            font-size: 22px;
            opacity: 0.7;
            margin-right: 10px;
            margin-left: 10px;
          }
        `}
      </style>
    </Container>
  );
}

export default Facilities;
