import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Container from "react-bootstrap/Container";
import Form from 'react-bootstrap/Form'
import  Button  from 'react-bootstrap/Button';
import { BASE_URL } from './../../constants/api';
import { useRouter } from "next/router";
const schema = yup.object().shape({
  firstname: 
    yup
      .string()
      .required("Please enter a first name")
      .min(2),

  lastname: 
    yup
      .string()
      .required("Please enter a last name")
      .min(3),

  email: 
     yup
      .string()
      .required("Please enter a valid email address")
      .matches(/[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)/, "Please enter a valid email address"),

    subject: 
      yup
        .string()
        .required("Please enter a subject")
        .min(3),
     
        message: 
      yup
        .string()
        .required("Please enter a message")
        .min(10),
  });

export default function ContactForm () {
  const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const router = useRouter();

    const onSubmit = async data => {
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
      };

      const response = await fetch([BASE_URL + "/contacts"], requestOptions);

      if (response) {
        router.push("/contact/feedback") 
      }

  }

  return (
    <Container className="mb-5 mt-5">
      <h1 className="mb-5">Contact us</h1>
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Form.Group>
          <Form.Label>First name</Form.Label>
          <Form.Control {...register("firstname")} />
          {errors.firstname && <div className="alert alert-danger">{errors.firstname.message}</div>}
        </Form.Group> 

        <Form.Group>
          <Form.Label>Last name</Form.Label>
          <Form.Control {...register("lastname")} />
          {errors.lastname && <div className="alert alert-danger">{errors.lastname.message}</div>}
        </Form.Group> 

        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" {...register("email")} />
          {errors.email && <div className="alert alert-danger">{errors.email.message}</div>}
        </Form.Group> 

        <Form.Group>
          <Form.Label>Subject</Form.Label>
          <Form.Control {...register("subject")} />
          {errors.subject && <div className="alert alert-danger">{errors.subject.message}</div>}
        </Form.Group> 

        <Form.Group>
          <Form.Label>Message</Form.Label>
          <Form.Control as="textarea" {...register("message")} />
          {errors.message && <div className="alert alert-danger">{errors.message.message}</div>}
        </Form.Group> 
        <Button variant="dark" type="submit">Submit</Button>
    </Form>
    </Container>
  );
}