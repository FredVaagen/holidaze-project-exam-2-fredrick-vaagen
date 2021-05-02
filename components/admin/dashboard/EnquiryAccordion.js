import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import axios from "axios";
import { parseCookies } from "nookies";
import dateFormat from "dateformat";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { BASE_URL } from "../../../constants/api";

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
    <Accordion className="mt-5" > 
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
              <form className="remove-form" onSubmit={handleSubmit(remove)}>
                <button className="remove" type="submit">
                  <DeleteForeverIcon />
                </button>
              </form>
            </Container>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <style global jsx>
        {`
          .remove-form {
            position: absolute;
            top: 55px;
            right: 0;
          }

          .remove {
            background: none !important;
            border: none;
          }

          .remove svg {
           color: black;
           position: absolute;
           right: 10px;
          }
        `}
      </style>
    </Accordion>
  );
}

export default EnquiryAccordion;
