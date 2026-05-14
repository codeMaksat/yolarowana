import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <div className="text-md md:text-lg font-red-hat-display antialiased text-dark-800 leading-xl">
            <NextScript />
          </div>
        </body>
      </Html>
    );
  }
}
