import {useState} from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import axios from "axios";
import { parseCookies } from "nookies";
import dateFormat from "dateformat";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import { BASE_URL } from "../../../constants/api";

function EnquiryMessages(enquiry) {
  const { handleSubmit } = useForm();
  const router = useRouter();

  //Arrow toggle when clicking enquiry container accordion -> 
  const [arrow, setArrow] = useState(false);

  const remove = async (ctx) => {
    //Gets token from cookies ->
    const token = parseCookies(ctx).token;
    // If you press confirm on alert box to delete message ->
    if (confirm("Are you sure you want to remove this enquiry?")) {
      //Delete request fires when you press "ok/confirm"
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
          <Accordion.Toggle
            as={Button}
            className="enquiry-id-text"
            onClick={() => {
              setArrow(!true);
              if(arrow == false) {
                setArrow(true)
              }
            }}
            variant="link"
            eventKey="0">
            ID: {enquiry.id}: {enquiry.establishmentName}{" "}
            {arrow ? (<ArrowDropDownIcon />) : (<ArrowDropUpIcon/>)}
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
              <p>Number of guests: {enquiry.guests}</p>
              {enquiry.message ? <p>Message: {enquiry.message}</p> : <></>}
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

export default EnquiryMessages;
