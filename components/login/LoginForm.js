import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { Container, Form } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import Button from "@material-ui/core/Button";
import { login } from "../../lib/auth";
import AppContext from "../../context/AppContext";

function LoginForm() {
  //Set state of login information -> 
  const [data, updateData] = useState({ identifier: "", password: "" });
  //Set loading state of login page -> 
  const [loading, setLoading] = useState(false);
  //Set error state -> 
  const [error, setError] = useState(false);
  //router is used to route to another page -> 
  const router = useRouter();
  //app context to check if user is validated -> 
  const appContext = useContext(AppContext);

  //If user is authenticated - Send user to admin page ->
  useEffect(() => {
    if (appContext.isAuthenticated) {
      router.push("/admin");
    }
  }, []);

  //Function to update the login name and password to the value that the user input -> 
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
            //Function to fetch input passworc -> 
              onChange={(event) => onChange(event)}
              type="password"
              name="password"
            />
          </Form.Group>
          <Form.Group>
            <Button
              className="button"
              variant="contained"
              onClick={() => {
                //When user clicks login (Loading spinner) ->
                setLoading(true);
                //If username and password is ok -> 
                login(data.identifier, data.password)
                  .then((res) => {
                    //Sets loading state to false (No spinner) -> 
                    setLoading(false);
                    //if login info is valid -> 
                    appContext.setUser(res.data.user);
                    //Send user to admin page -> 
                    if (res.ok) router.push("/admin");
                  })
                  //If there is an error -> 
                  .catch((error) => {
                    //Set error message->
                    setError(error.response.data);
                    // Set loading to false (Removes loadingspinner) -> 
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
            padding: 5rem;
          }

          .form-control {
            width: 100%;
          }

          .button {
            width: 200px !important;
            margin-bottom: 2rem !important;
            background: #fff !important;
            color: black !important;
            font-size: 11px !important;
          }

          .notification {
            color: #ab003c;
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

export default LoginForm;
