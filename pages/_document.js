import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";

    return (
      <Html lang="en">
        <Head>
          <link
            rel="preload"
            href="/assets/css/all-fontawesome.min.css"
            as="style"
          />

          {supabaseUrl && (
            <link rel="preconnect" href={supabaseUrl} crossOrigin="" />
          )}
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}