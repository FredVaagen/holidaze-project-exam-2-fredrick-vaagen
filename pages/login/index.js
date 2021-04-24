import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { login } from "../../lib/auth";
import AppContext from "../../context/AppContext";
import Spinner from "react-bootstrap/Spinner";

function Login() {
  const [data, updateData] = useState({ identifier: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();
  const appContext = useContext(AppContext);

  useEffect(() => {
    if (appContext.isAuthenticated) {
      router.prefetch("/admin");
    }
  }, []);

  function onChange(event) {
    updateData({ ...data, [event.target.name]: event.target.value });
  }

  return (
    <Container className="login-container">
      <h1>Login</h1>
      <Form>
        <fieldset disabled={loading}>
          <Form.Group>
            <Form.Label>Email:</Form.Label>
            <Form.Control
              onChange={(event) => onChange(event)}
              name="identifier"
            />
          </Form.Group>
          <Form.Group style={{ marginBottom: 30 }}>
            <Form.Label>Password:</Form.Label>
            <Form.Control
              onChange={(event) => onChange(event)}
              type="password"
              name="password"
            />
          </Form.Group>

          <Form.Group>
            <Button
              className="button"
              onClick={() => {
                setLoading(true);
                login(data.identifier, data.password)
                  .then((res) => {
                    setLoading(false);
                    appContext.setUser(res.data.user);
                    if (res.ok) router.push("/admin");
                  })
                  .catch((error) => {
                    setError(error.response.data);
                    setLoading(false);
                  });
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
                "Login"
              )}
            </Button>
          </Form.Group>
        </fieldset>
      </Form>

      <style global jsx>
        {`
          .main {
            height: 90vh;
          }

          .login-container form {
           
            padding: 40px 55px 45px 55px;
            transition: all .3s;

            box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);

       
          }

          .form-control {
            width: 100%;
          }

          .notification {
            color: #ab003c;
          }

          .button {
            background: none;
            color: black;
            border: 1px solid black;
            width: 100%;
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
