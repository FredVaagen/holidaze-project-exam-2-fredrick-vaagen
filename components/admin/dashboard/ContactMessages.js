import {useState} from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { parseCookies } from "nookies";
import { useForm } from "react-hook-form";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import { BASE_URL } from "../../../constants/api";

function ContactMessages(contact) {
  const { handleSubmit } = useForm();
  const router = useRouter();
  
 //Arrow toggle down/up when clicking contact message container accordion -> 
  const [arrow, setArrow] = useState(false);

  const remove = async (ctx) => {
    //Gets token from cookies ->
    const token = parseCookies(ctx).token;
    // If you press confirm on alert box to delete message ->
    if (confirm("Are you sure you want to remove this contact message?")) {
      //Delete request fires when you press "ok/confirm"
      try {
        await axios({
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
      <Card>
        <Card.Header>
          <Accordion.Toggle
            className="enquiry-id-text"
            onClick={() => {
              setArrow(!true);
              if(arrow == false) {
                setArrow(true)
              }
            }}
            as={Button}
            variant="link"
            eventKey="0">
            id: {contact.id} - Subject: {contact.subject}{" "}
            {arrow ? (<ArrowDropDownIcon />) : (<ArrowDropUpIcon/>)}
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
          .accordion .card-header {
            background: white;
            display: flex;
            flex-direction: column;
          }


          .enquiry-id-text {
            display: flex;
            color: black;
            justify-content: space-between;
          }

          .enquiry-id-text:hover {
            color: black;
            text-decoration: none;
          }


          .remove {
            background: none !important;
            border: none;
          }

          .remove svg {
            color: black;
            position: absolute;
            top: 10px;
            right: 10px;
          }
        `}
      </style>
    </Accordion>
  );
}

export default ContactMessages;
