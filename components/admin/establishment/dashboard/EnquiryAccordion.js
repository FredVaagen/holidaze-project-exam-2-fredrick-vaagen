import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import dateFormat from "dateformat";
import { useForm } from "react-hook-form";
import { parseCookies } from "nookies";
import { BASE_URL } from "../../../../constants/api";
import axios from "axios";
import { useRouter } from "next/router";

function EnquiryAccordion(enquiry) {
  const { handleSubmit } = useForm();
  const router = useRouter();

  const remove = async (ctx) => {
    const token = parseCookies(ctx).token;
    if (confirm("Are you sure you want to remove this enquiry?")) {
      try {
        const res = await axios({
          method: "DELETE",
          url: `${BASE_URL}/enquiries/${enquiry.id}`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Success", res);
      } catch (error) {
        console.log(error);
      }
      router.reload();
    }
  };
  return (
    <Accordion>
      <Card>
        <Card.Header>
          <Accordion.Toggle as={Button} variant="link" eventKey="0">
            ID: {enquiry.id}, {enquiry.establishmentName}
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            <Container className="establishment-container">
              <p>
                Name: {enquiry.firstname} {enquiry.lastname}
              </p>
              <p>Establishment: {enquiry.establishmentName}</p>
              <p>Email: {enquiry.email}</p>
              <p>Check in: {dateFormat(enquiry.startDate, "d mmmm yyyy")}</p>
              <p>Check out: {dateFormat(enquiry.endDate, "d mmmm yyyy")}</p>
              <p>Message: {enquiry.message}</p>
              <form onSubmit={handleSubmit(remove)}>
                <button className="remove" type="submit">
                  Delete
                </button>
              </form>
            </Container>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <style global jsx>
        {`
          .accordion {
            display: flex !important;
            flex-direction: column;
          }

          .btn {
            width: 100% !important;
            text-align: left;
            color: black;
          }

          .remove {
            width: 200px !important;
            margin-bottom: 2rem !important;
            background: RGB(106, 126, 230) !important;
            color: white !important;
            font-size: 11px !important;
          }
        `}
      </style>
    </Accordion>
  );
}

export default EnquiryAccordion;
