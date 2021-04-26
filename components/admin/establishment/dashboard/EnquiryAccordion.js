import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import dateFormat from "dateformat"

function EnquiryLayout(enquiry) {
  return (
    <Accordion >
      <Card  >
        <Card.Header>
          <Accordion.Toggle as={Button} variant="link" eventKey="0">
            ID: {enquiry.id}, {enquiry.establishmentName}
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            <Container  className="establishment-container">
              <p>
                Name: {enquiry.firstname} {enquiry.lastname}
              </p>
              <p>Establishment: {enquiry.establishmentName}</p>
              <p>Email: {enquiry.email}</p>
              <p>Check in: {dateFormat(enquiry.startDate, "d mmmm yyyy")}</p>
              <p>Check out: {dateFormat(enquiry.endDate, "d mmmm yyyy")}</p>
              <p>Message: {enquiry.message}</p>
            </Container>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}

export default EnquiryLayout;
