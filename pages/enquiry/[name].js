import fetch from 'isomorphic-fetch'
import React from "react";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import { Container, Form, Button, Col, Row} from "react-bootstrap";
import { BASE_URL } from '../../constants/api';

import "react-datepicker/dist/react-datepicker.css";

function Establishment({establishment}) {
  const router = useRouter();
  const { control, handleSubmit, register, formState: { errors } } = useForm();
  
  const establishmentName = establishment.name; 

  const onSubmit = async (data) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data), 
    };

    await fetch([BASE_URL + "/enquiries"], requestOptions);
    router.push("/enquiry/feedback")
} 
  return (
    <Container>
      <h1 className="mt-5 mb-5">{establishment.name} Enquiry </h1>
      <Form  onSubmit={handleSubmit(onSubmit)}>
        <Row>
        <Form.Group>
        <Form.Label className="ml-3">Check in</Form.Label>
        <Col>
          <Controller
            control={control}
            name="startDate"
            render={({field}) => (
              <DatePicker
                onChange={(e) => field.onChange(e)}
                minDate={(new Date())}
                selected={field.value}
              />
            )}
          />
          </Col>
          </Form.Group>
          <Form.Group >
          <Form.Label className="ml-3">Check Out</Form.Label>
          <Col>
          <Controller
            control={control}
            name="endDate"
            render={({field}) => (
              <DatePicker 
                selected={field.value}
                minDate={(new Date())}
                onChange={(e) => field.onChange(e)}
              /> 
            )}
          />
          </Col>
        </Form.Group>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="firstname">
              <Form.Label>First name</Form.Label>
              <Form.Control name="firstname" as="input" rows={3} placeholder="Enter first name"
              aria-invalid={errors.firstname ? "true" : "false"}
              {...register('firstname', { required: true })}/>
               {errors.firstname && <div className="alert alert-danger">Required field</div>}
            </Form.Group>
        </Col>
          <Col>
            <Form.Group controlId="lastname">
              <Form.Label>Last name</Form.Label>
              <Form.Control name="lastname" as="input" rows={3} placeholder="Enter last name" {...register("lastname", { required: true })}/>
              {errors.lastname && <div className="alert alert-danger">Required field</div>}
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="ControlEmailInput">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" as="input" rows={3} placeholder="Enter email" {...register("email", { required: true })}/>
          {errors.email && <div className="alert alert-danger">Required field</div>}
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Your message</Form.Label>
          <Form.Control  name="message" as="textarea" rows={3} placeholder="Your message" {...register("message")}/>
        </Form.Group>
        <Button className="button" type="submit" >Submit</Button>
        <Form.Control hidden value={establishmentName} {...register("establishmentName")}/>
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

          .button {
            background: none;
            color: black;
            border: 1px solid black;
          }
    `}
    </style>
  </Container>
  )
}

export async function getStaticProps({params: {name}}) {
    const establishment_res = await fetch(`${BASE_URL}/establishments/?name=${name}`)
    const specificEstablishment = await establishment_res.json()

    return {
      props: {
        establishment: specificEstablishment[0]
      }
    }
  }
  
  export async function getStaticPaths() {
      const establishments_res = await fetch(`${BASE_URL}/establishments`)
      const establishments = await establishments_res.json()
      return {
          paths: establishments.map(el => ({
              params: {name: String(el.name)}
          })),
          fallback: false
      };
  }

export default Establishment;