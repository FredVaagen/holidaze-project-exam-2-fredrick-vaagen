import { useState } from "react";
import { useForm } from "react-hook-form";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "@material-ui/core/Button";
import { BASE_URL } from "./../../constants/api";
import BackArrow from "../utility/BackArrow";

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm();
  //sets the state of the form to TRUE -> 
  const [showForm, setShowForm] = useState(true);
  // When submitting form with no error -> 
  const onSubmit = async (data) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    const response = await fetch([BASE_URL + "/contacts"], requestOptions);
    // if the form is submitted set the state of form to FALSE (Hidden) -> 
    setShowForm(false);
  };

  return (
    <>
      <BackArrow />
      <Container className="mb-5 mt-5">
        <h1 className="mt-5 mb-5">Contact us</h1>
        {showForm ? (
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
              <Form.Label>First name</Form.Label>
              <Form.Control
                {...register("firstname", { required: true, minLength: 2 })}
                placeholder="First name"
              />
              {errors.firstname && (
                <div className="alert-danger">First name is required</div>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label>Last name</Form.Label>
              <Form.Control
                {...register("lastname", { required: true, minLength: 2 })}
                placeholder="Last name"
              />
              {errors.lastname && (
                <div className="alert-danger">Last name is required</div>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                {...register("email", {
                  required: true,
                  pattern:
                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                })}
                placeholder="Email address"
              />
              {errors.email && (
                <div className="alert-danger">Email is required</div>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label>Subject</Form.Label>
              <Form.Control
                {...register("subject", { required: true, minLength: 4 })}
                placeholder="Subject"
              />
              {errors.subject && (
                <div className="alert-danger">Subject is required</div>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Your message"
                {...register("message", { required: true, minLength: 10 })}
              />
              {errors.message && (
                <div className="alert-danger">
                  Message is required (min 10 letters)
                </div>
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
          // If form is submitted the form is replaced with this div ->
          <div>
            <p>
              Thank you for contacting us. We will answer your question as soon
              as possible.
            </p>
          </div>
        )}

        <style global jsx>
          {`
            .main {
              height: 100vh;
              min-height: 1000px;
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

            .button {
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
    </>
  );
}
