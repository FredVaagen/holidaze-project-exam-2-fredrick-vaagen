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
        <p>
          Thank you for contacting us {name}. We will answer you as soon as
          possible.
        </p>

        <style jsx>
          {`
            .contact {
              height: 100vh;
              display: flex;
              flex-direction: column;
              align-content: center;
              justify-content: center;
            }

            .contact p {
              text-align: center;
              font-weight: 300;
            }
          `}
        </style>
      </div>
    </Container>
  );
}

export default contactFeedback;
