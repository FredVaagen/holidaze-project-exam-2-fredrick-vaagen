// Bootstrap
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
// ICONS
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import HotelIcon from "@material-ui/icons/Hotel";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";

function Sidebar({enquiriesCount, contactMessageCount}) {

  //Sidebar title for enquiry + number of enquiries -> 
  const enquiryTabTitle =
  "Enquiries" + " " + "[" + " " + enquiriesCount + " " + "]";
   //Sidebar title for contact messages + number of contact messages -> 
  const contactTabTitle =
  "Contact messsages" + " " + "[" + " " + contactMessageCount + " " + "]";
  
  return (
    <Col className="sidebar" md={3}>
      <h2>Dashboard</h2>
      <Nav variant="pills" className="flex-column">
        <Nav.Item>
          <Nav.Link href="#/enquiries" eventKey="first">
            <HotelIcon /> {enquiryTabTitle}
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="#/contact" eventKey="second">
            {" "}
            <MailOutlineIcon /> {contactTabTitle}
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="#/create-establishment" eventKey="third">
            <AddIcon /> Create
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="#/edit-establishment" eventKey="fourth">
            <EditIcon /> Edit
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <style global jsx>
        {`
          .main {
            height: auto;
            min-height: 100vh;
          }

          .editEstablishment-list-item {
            transition: 1s;
            padding: 1rem;
            display: flex;
            justify-content: space-between;
          }

          .editEstablishment-list-item:hover {
            cursor: pointer;
            transform: scale(1.01);
          }

          .sidebar {
            height: 100vh;
            box-shadow: 0 1px 3px rgb(41 51 57 / 50%);
            display: flex;
            flex-direction: column;
          }

          .sidebar h2 {
            padding-top: 1rem;
            padding-bottom: 1rem;
          }

          @media only screen and (max-width: 765px) {
            .sidebar {
              height: auto;
            }

        `}
      </style>
    </Col>
  );
}

export default Sidebar;
