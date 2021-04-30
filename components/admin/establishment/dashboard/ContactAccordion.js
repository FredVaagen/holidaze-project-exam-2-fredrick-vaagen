import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import { parseCookies } from "nookies";
import { BASE_URL } from "../../../../constants/api";
import axios from "axios";
import { useRouter } from "next/router";

function ContactAccordion(contact) {
  const { handleSubmit } = useForm();
  const router = useRouter();

  const remove = async (ctx) => {
    const token = parseCookies(ctx).token;
    if (confirm("Are you sure you want to remove this contact message?")) {
      try {
        const res = await axios({
          method: "DELETE",
          url: `${BASE_URL}/contacts/${contact.id}`,
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
            id: {contact.id} - Subject: {contact.subject}
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            <Container className="establishment-container">
              <p>
                Name: {contact.firstname} {contact.lastname}
              </p>
              <p>Email: {contact.email}</p>
              <p>Message: {contact.message}</p>
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

export default ContactAccordion;
