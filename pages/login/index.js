import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { Container, Form } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import Button from "@material-ui/core/Button";
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
      router.prefetch("/admin");
    }
  }, []);

  function onChange(event) {
    updateData({ ...data, [event.target.name]: event.target.value });
  }

  return (
    <Container className="login-container">
      <Form>
        <h1 className="h1">Login</h1>

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
        {Object.entries(error).length !== 0 &&
          error.constructor === Object &&
          error.message.map((error) => {
            return (
              <div key={error.messages[0].id}>
                <small style={{ color: "red" }}>
                  {error.messages[0].message}
                </small>
              </div>
            );
          })}
      </Form>

      <style global jsx>
        {`
          .main {
            height: 100vh;
            display: flex;
            text-align: left;
          }

          .h1 {
            text-align: left;
            padding-bottom: 2rem;
          }

          .login-container {
            display: flex;
            margin-top: 5rem;
            align-items: center;
            flex-direction: column;
          }

          .login-container form {
            transition: all 0.3s;
        

            padding: 5rem;
          }

          .form-control {
            width: 100%;
          }

          .notification {
            color: #ab003c;
          }

          .MuiButtonBase-root {
            width: 200px !important;
            margin-bottom: 2rem !important;
            color: black !important;
            font-size: 11px !important;
            box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%) !important;
          }

          @media only screen and (max-width: 900px) {
            .main {
              height: auto;
            }

            .login-container {
              margin-bottom: 5rem;
            }
          }
        `}
      </style>
    </Container>
  );
}

export default Login;
