import Head from "next/head";
import ContactForm from "../components/contact/ContactForm";

function contact() {
  return (
    <>
      <Head>
        <title>Holidaze - Contact us</title>
      </Head>
      <ContactForm />
    </>
  );
}

export default contact;
