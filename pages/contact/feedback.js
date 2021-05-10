import Head from "next/head";
import { useRouter } from "next/router";
import Container from "react-bootstrap/Container";
import BackArrow from "../../components/utility/BackArrow";

function contactFeedback() {
  const router = useRouter();
  const rawName = JSON.stringify(router.query);
  const name = rawName.replace(/[{}""]/g, "").slice(5);
  return (
    <Container>
      <BackArrow />
      <div className="contact">
        <Head>
          <title>Holidaze - Feedback</title>
        </Head>
        <h2>Thank you for contacting us {name}.</h2>
        <p>We will respond to your message as soon as possible!</p>
        <style jsx>
          {`
            * {
              font-family: "Roboto", sans-serif;
              @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@100;300&display=swap");
            }

            .contact {
              height: 100vh;
              display: flex;
              flex-direction: column;
              align-content: center;
              justify-content: center;
            }

            .contact h2,
            p {
              text-align: center;
              text-transform: uppercase;
            }
          `}
        </style>
      </div>
    </Container>
  );
}

export default contactFeedback;
