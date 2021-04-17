/* /pages/login.js */

import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
} from "react-bootstrap";
import { login } from "../../lib/auth";
import AppContext from "../../context/AppContext";

function Login() {
  const [data, updateData] = useState({ identifier: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();
  const appContext = useContext(AppContext);
  
  useEffect(() => {
    if (appContext.isAuthenticated) {
      router.prefetch('/admin')
    }
  }, []);

  function onChange(event) {
    updateData({ ...data, [event.target.name]: event.target.value });
  }

  return (
    <Container>
      <Row>
        <Col sm="12" md={{ size: 5, offset: 1 }}>
          <div className="paper">
            <div className="header">
              <h2>HOLIDAZE ADMIN LOGIN</h2>
            </div>
            <section className="wrapper">
              {Object.entries(error).length !== 0 &&
                error.constructor === Object &&
                error.message.map((error) => {
                  return (
                    <div
                      key={error.messages[0].id}
                      style={{ marginBottom: 10 }}
                    >
                      <small style={{ color: "red" }}>
                        {error.messages[0].message}
                      </small>
                    </div>
                  );
                })}
              <Form>
                <fieldset disabled={loading}>
                  <Form.Group>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                      onChange={(event) => onChange(event)}
                      name="identifier"
                      style={{ height: 50, fontSize: "1.2em" }}
                    />
                  </Form.Group>
                  <Form.Group style={{ marginBottom: 30 }}>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      onChange={(event) => onChange(event)}
                      type="password"
                      name="password"
                      style={{ height: 50, fontSize: "1.2em" }}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Button className="button"
                      onClick={() => {
                        setLoading(true);
                        login(data.identifier, data.password)
                          .then((res) => {
                            setLoading(false);
                          
                            appContext.setUser(res.data.user);
                          })
                          .catch((error) => {
                            setError(error.response.data);
                            setLoading(false);
                          });
                      }}
                    >
                      {loading ? "Loading... " : "Log in"}
                    </Button>
                  </Form.Group>
                </fieldset>
              </Form>
            </section>
          </div>
        </Col>
      </Row>
      <style global jsx>
        {`
          .paper {
            border: 1px solid lightgray;
            box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
              0px 1px 1px 0px rgba(0, 0, 0, 0.14),
              0px 2px 1px -1px rgba(0, 0, 0, 0.12);
            border-radius: 6px;
            margin-top: 90px;
            display: flex;
            flex-direction: column;
            margin-bottom: 5rem;
          }
          .notification {
            color: #ab003c;
          }
          .header {
            width: 100%;
            padding: 2rem;
            background-color: black;
            margin-bottom: 30px;
            border-radius-top: 6px;
            display: flex;
            justify-content: center;
            align-content: center;
            color: white;
          }
          .wrapper {
            padding: 10px 30px 20px 30px !important;
          }
          .button {
            width: 100%;
            background: none;
            color: black;
            border: 1px solid black;
          } 

          .button:hover {
            background: black;
            color: white;
          }
        `}
      </style>
    </Container>
  );
}

export default Login;