import fetch from "isomorphic-fetch";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import { Container, Form, Col, Row } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import Button from "@material-ui/core/Button";
import { BASE_URL } from "../../../constants/api";
import "react-datepicker/dist/react-datepicker.css";

function Enquiry(establishment) {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isDirty },
  } = useForm();

  const [show, setShow] = useState(false);
  const [button, setButton] = useState(true)
  const [loading, setLoading] = useState(false);
  const[modal, setModal] = useState(true)

  const establishmentName = establishment.name;

  const onSubmit = async (data) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    await fetch([BASE_URL + "/enquiries"], requestOptions);
    setShow(true);
    setButton(false)
    console.log(data);
  };

  return (
    <Container>
       {modal ? (<Form className="form" onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Form.Group>
            <Form.Label className="ml-3">Check in</Form.Label> <span>*</span>
            <Col>
              <Controller
                render={({ field }) => (
                  <DatePicker
                    onChange={(e) => field.onChange(e)}
                    minDate={new Date()}
                    selected={field.value}
                    isClearable
                    placeholderText="01/01/2021"
                  />
                )}
                control={control}
                name="startDate"
                rules={{ required: true }}
              />
              {errors.startDate && (
                <div className="alert-danger">You must pick a checkin date</div>
              )}
            </Col>
          </Form.Group>
          <Form.Group>
            <Form.Label className="ml-3">Check Out</Form.Label> <span>*</span>
            <Col>
              <Controller
                render={({ field }) => (
                  <DatePicker
                    onChange={(e) => field.onChange(e)}
                    minDate={new Date()}
                    selected={field.value}
                    isClearable
                    placeholderText="01/01/2021"
                  />
                )}
                control={control}
                name="endDate"
                rules={{ required: true }}
              />
              {errors.endDate && (
                <div className="alert-danger">You must pick a checkin date</div>
              )}
            </Col>
          </Form.Group>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="firstname">
              <Form.Label>First name</Form.Label> <span>*</span>
              <Form.Control
                name="firstname"
                as="input"
                rows={3}
                placeholder="First name"
                aria-invalid={errors.firstname ? "true" : "false"}
                {...register("firstname", { required: true, minLength: 2 })}
              />
              {errors.firstname && (
                <div className="alert-danger">
                  Please enter a first name (Minimum 2 characters)
                </div>
              )}
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="lastname">
              <Form.Label>Last name</Form.Label> <span>*</span>
              <Form.Control
                name="lastname"
                as="input"
                rows={3}
                placeholder="Last name"
                {...register("lastname", { required: true, minLength: 2 })}
              />
              {errors.lastname && (
                <div className="alert-danger">
                  Please enter a last name (Minimum 2 characters)
                </div>
              )}
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="ControlEmailInput">
          <Form.Label>Email</Form.Label> <span>*</span>
          <Form.Control
            type="email"
            name="email"
            as="input"
            rows={3}
            placeholder="Enter email"
            {...register("email", {
              required: true,
              pattern:
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
          />
          {errors.email && (
            <div className="alert-danger">Email is required</div>
          )}
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>Guests</Form.Label>
          <Form.Control
            as="select"
            name="guests"
            {...register("guests", { required: true })}>
            <option></option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Form.Control>
        </Form.Group>
        {errors.guests && (
          <div className="alert-danger">Please select number of guests</div>
        )}
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Your message</Form.Label>
          <Form.Control
            name="message"
            as="textarea"
            rows={3}
            placeholder="Your message"
            {...register("message")}
          />
        </Form.Group>

        <Alert show={show}>
          <div className="booking-confirmation-alert">
            Thank you for booking {establishmentName}.
          </div>
        </Alert>

        {button ? (
         <Button
         variant="contained"
         className="button"
         type="submit"
         onClick={() => {
           if (isDirty) {
             setLoading(true);
             setModal(false)
           }
         }}>
         {loading ? (
           <Spinner
             as="span"
             animation="border"
             size="sm"
             role="status"
             aria-hidden="true"
           />
         ) : (
           `Book ${establishmentName}`
         )}
       </Button>
        ) : (
          <></>
        )}
        <Form.Control
          hidden
          value={establishmentName}
          {...register("establishmentName")}
        />
      </Form>) : (<div>Thank you for booking {establishmentName}</div>)}

      <style global jsx>
        {`
          .summary p {
            font-weight: bold;
            margin-top: 2rem;
            margin-bottom: 2rem;
          }

          .react-datepicker__input-container {
            margin-right: 3rem;
            width: 100%;
          }

          .form-group input,
          .form-group select {
            border: none;
            border-bottom: 1px solid rgb(211, 211, 211, 0.8);
          }

          .form-group textarea {
            border: 1px solid rgb(211, 211, 211, 0.8);
          }

          .form-label {
            font-size: 14px;
            font-weight: 300;
          }

          .react-datepicker__input-container input {
            width: 100%;
            border-bottom: 1px solid rgb(211, 211, 211, 0.8);
            border-top: none;
            border-right: none;
            border-left: none;
          }

          .button {
            width: 200px;
            margin-bottom: 2rem;
            background: rgb(106, 126, 230);
            color: white;
            font-size: 11px;
          }

          .button:hover {
            background: rgb(66, 87, 194);
          }

          .alert-danger {
            background: none;
            color: red;
            font-size: 12px;
          }

          .booking-confirmation-alert {
            font-weight: 300;
            text-align: center;
            box-shadow: 0 1px 3px rgb(41 51 57 / 50%);
            padding: 1rem;
          }
        `}
      </style>
    </Container>
  );
}

export default Enquiry;
