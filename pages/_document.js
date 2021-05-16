import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
          />
          <meta
            name="description"
            content="Holidaze will help you find the perfect accomedation while staying in Bergen, Norway. "
          />
          <meta
            name="keywords"
            content="holidaze, hotel, booking, establishment, establishments, holiday, book hotel, vacation"
          />
          <meta
            property="og:site_name"
            content="Holidaze - Find the perfect accomedation in Bergen, Norway with Holidaze."
          />
          <meta
            property="og:title"
            content="Holidaze - A hotel, guesthouse and bed and breakfast booking site."
          />
          <meta property="og:type" content="website" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
