import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "@material-ui/core/Button";
import { BASE_URL } from "./../../constants/api";
import { useRouter } from "next/router";
const schema = yup.object().shape({
  firstname: yup.string().required("Please enter a first name").min(2),
  lastname: yup.string().required("Please enter a last name").min(3),
  email: yup
    .string()
    .required("Please enter a valid email address")
    .matches(
      /[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)/,
      "Please enter a valid email address"
    ),
  subject: yup.string().required("Please enter a subject").min(3),
  message: yup.string().required("Please enter a message").min(10),
});

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const router = useRouter();

  const onSubmit = async (data) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    const response = await fetch([BASE_URL + "/contacts"], requestOptions);

    if (response) {
      return (
        router.push("/contact/feedback") 
       
      )
    }
  };

  return (
    <Container className="mb-5 mt-5">
      <h1 className="mb-5">Contact us</h1>
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Form.Group>
          <Form.Label>First name</Form.Label>
          <Form.Control {...register("firstname")} placeholder="First name" />
          {errors.firstname && (
            <div className="alert-danger">{errors.firstname.message}</div>
          )}
        </Form.Group>

        <Form.Group>
          <Form.Label>Last name</Form.Label>
          <Form.Control {...register("lastname")} placeholder="Last name" />
          {errors.lastname && (
            <div className="alert-danger">{errors.lastname.message}</div>
          )}
        </Form.Group>

        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            {...register("email")}
            placeholder="Email address"
          />
          {errors.email && (
            <div className="alert-danger">{errors.email.message}</div>
          )}
        </Form.Group>

        <Form.Group>
          <Form.Label>Subject</Form.Label>
          <Form.Control {...register("subject")} placeholder="Subject" />
          {errors.subject && (
            <div className="alert-danger">{errors.subject.message}</div>
          )}
        </Form.Group>

        <Form.Group>
          <Form.Label>Message</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Your message"
            {...register("message")}
          />
          {errors.message && (
            <div className="alert-danger">{errors.message.message}</div>
          )}
        </Form.Group>
        <Button variant="contained" className="button" type="submit">
          Submit
        </Button>
      </Form>
      <style global jsx>
        {`
          .main {
            height: auto;
          }
          .alert-danger {
            background: none;
            color: red;
            font-size: 12px;
          }
          .form-group input,
          .form-group select {
            border: none;
            border-bottom: 1px solid rgb(106, 126, 230);
          }

          .form-group textarea {
            border: 1px solid rgb(106, 126, 230);
            padding: 10px;
          }

          .form-label {
            font-size: 14px;
            font-weight: 300;
          }

          .form-control {
            padding: 0;
            border-radius: 0;
          }

          .MuiButtonBase-root {
            width: 200px !important;
            margin-bottom: 2rem !important;
            background: RGB(106, 126, 230) !important;
            color: white !important;
            font-size: 11px !important;
          }

          .MuiButtonBase-root:hover {
            background: RGB(66, 87, 194) !important;
          }

          .form-label {
            font-size: 14px;
            font-weight: 300;
          }
        `}
      </style>
    </Container>
  );
}
