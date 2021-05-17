import axios from "axios";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { useForm } from "react-hook-form";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

import { BASE_URL } from "../../../constants/api";

function ContactMessages(contact) {
  const { handleSubmit } = useForm();
  const router = useRouter();

  const remove = async (ctx) => {
    //Gets token from cookies -> 
    const token = parseCookies(ctx).token;
    // If you press confirm on alert box to delete message -> 
    if (confirm("Are you sure you want to remove this contact message?")) {
      //Delete request fires when you press "ok/confirm" 
      try {
        const res = await axios({
          method: "DELETE",
          url: `${BASE_URL}/contacts/${contact.id}`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      
      } catch (error) {
        console.log(error);
      }
      // If sucsess -> Reload page. 
      router.reload();
    }
  };
  return (
    <Accordion>
      <Card className="mt-5">
        <Card.Header>
          <Accordion.Toggle as={Button} variant="link" eventKey="0">
            id: {contact.id} - Subject: {contact.subject}{" "}
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            <Container>
              <p>
                Name: {contact.firstname} {contact.lastname}
              </p>
              <p>Email: {contact.email}</p>
              <p>Message: {contact.message}</p>
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

export default ContactMessages;
