import fetch from "isomorphic-fetch";
import React from "react";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import { Container, Form, Button, Col, Row } from "react-bootstrap";
import { BASE_URL } from "../../../constants/api";

import "react-datepicker/dist/react-datepicker.css";

function Enquiry(establishment) {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const establishmentName = establishment.name;

  const onSubmit = async (data) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    await fetch([BASE_URL + "/enquiries"], requestOptions);

    console.log(data.startDate);
    console.log(data.endDate)


  };
  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
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
                    placeholderText="Check in"
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
                    placeholderText="Check out"
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
              pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
          />
          {errors.email && (
            <div className="alert-danger">Email is required</div>
          )}
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>Guests</Form.Label>
          <Form.Control as="select" name="guests" {...register("guests")}>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Form.Control>
        </Form.Group>
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

        <Button className="button" type="submit">
          Reserve
        </Button>
        <Form.Control
          hidden
          value={establishmentName}
          {...register("establishmentName")}
        />
      </Form>

      <style global jsx>
        {`
          .summary p {
            font-weight: bold;
            margin-top: 2rem;
            margin-bottom: 2rem;
          }

          .react-datepicker__input-container {
            margin-right: 3rem;
          }

          react-datepicker__input-container input {
            color: red;
          }

          .button {
            background: none;
            color: black;
            border: 1px solid black;
          }

          .button:focus {
            background: black;
            color: white;
            box-shadow: 0 0 0 0.2rem rgb(0 0 0 / 50%);
          }

          .alert-danger {
            background: none;
            color: red;
            font-size: 12px;
          }
        `}
      </style>
    </Container>
  );
}

export default Enquiry;
