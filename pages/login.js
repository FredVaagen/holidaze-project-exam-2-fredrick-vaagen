import Head from "next/head";
import LoginForm from "../components/login/LoginForm";

function Login() {
  return (
    <>
      <Head>
        <title>Holidaze - Login</title>
      </Head>
      <LoginForm />
    </>
  );
}

export default Login;
