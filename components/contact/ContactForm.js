import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import Button from "@material-ui/core/Button";
import { BASE_URL } from "./../../constants/api";
import BackArrow from "../utility/BackArrow";

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
    formState: { errors, isSubmitSuccessful	 },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [name, setName] = useState(0);
  const [showForm, setShowForm] = useState(true);

  const onSubmit = async (data) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    const response = await fetch([BASE_URL + "/contacts"], requestOptions);
  
    setName(data.firstname);
    setShowForm(false);
  };

  return (
    <Container className="mb-5 mt-5">
      <BackArrow />
      <h1 className="mt-5 mb-5">Contact us</h1>
      {showForm ? (
        <Form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Form.Group>
            <Form.Label>First name</Form.Label>
            <Form.Control {...register("firstname")} defaultValue="" placeholder="First name" />
            {errors.firstname && (
              <div className="alert-danger">{errors.firstname.message}</div>
            )}
          </Form.Group>

          <Form.Group>
            <Form.Label>Last name</Form.Label>
            <Form.Control {...register("lastname")} defaultValue="" placeholder="Last name" />
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
              defaultValue=""
            />
            {errors.email && (
              <div className="alert-danger">{errors.email.message}</div>
            )}
          </Form.Group>

          <Form.Group>
            <Form.Label>Subject</Form.Label>
            <Form.Control {...register("subject")} defaultValue="" placeholder="Subject" />
            {errors.subject && (
              <div className="alert-danger">{errors.subject.message}</div>
            )}
          </Form.Group>

          <Form.Group>
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Your message"
              defaultValue=""
              {...register("message")}
            />
            {errors.message && (
              <div className="alert-danger">{errors.message.message}</div>
            )}
          </Form.Group>

          <Button
            variant="contained"
            className="button"
            type="submit"
            onClick={() => {
              // If form fields are touched/filled and form is submitted hide modal form and show confirmation message.
              if (isSubmitSuccessful) {
                setShowForm(false);
              }
            }}>
            Submit
          </Button>
        </Form>
      ) : (
        <div>
          <p>
            Thank you for contacting us. We will answer your question as soon as
            possible.
          </p>
        </div>
      )}

      <style global jsx>
        {`
          .main {
            height: 100vh;
          }

          h1 {
            font-weight: 300;
          }

          @media only screen and (max-height: 700px) {
            .main {
              height: auto;
            }
          }
          .alert-danger {
            background: none;
            color: red;
            font-size: 12px;
          }
          .form-group input,
          .form-group select {
            border: none;
            border-bottom: 1px solid rgb(211, 211, 211, 0.8);
          }

          .form-group textarea {
            border: 1px solid rgb(211, 211, 211, 0.8);
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
            background: #fff !important;
            color: black !important;
            font-size: 11px !important;
          }
          .MuiSvgIcon-root {
            opacity: 1 !important;
          }
          .form-label {
            font-size: 14px;
            font-weight: 300;
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
