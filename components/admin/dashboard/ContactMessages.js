import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { parseCookies, setCookie } from "nookies";
import { useForm } from "react-hook-form";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { BASE_URL } from "../../../constants/api";
import MarkunreadIcon from "@material-ui/icons/Markunread";
import DraftsIcon from "@material-ui/icons/Drafts";

function ContactMessages(contact) {
  const { handleSubmit } = useForm();
  const router = useRouter();
  const [newMessage, setNewMessage] = useState(true);

  useEffect((ctx) => {
    const parsedMessage = Boolean(parseCookies(ctx).parsedMessage);
    setNewMessage(parsedMessage);
  }, []);

  useEffect((ctx) => {
    setCookie(ctx, "Message", newMessage);
  }, [newMessage]);

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
          <Accordion.Toggle
            as={Button}
            variant="link"
            eventKey="0"
            onClick={(ctx) => {setCookie(ctx, "Message", Boolean(setNewMessage(true)))}}>
            id: {contact.id} - Subject: {contact.subject}{" "}
            {!newMessage ? (
              <>
                <MarkunreadIcon />
              </>
            ) : (
              <>
                <DraftsIcon />
              </>
            )}
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
