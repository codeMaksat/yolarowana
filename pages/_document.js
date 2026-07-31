import Document, { Html, Head, Main, NextScript } from "next/document";
import { Red_Hat_Display } from "next/font/google";

const redHatDisplay = Red_Hat_Display({
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" className={redHatDisplay.className}>
        <Head />

        <body className="text-md md:text-lg antialiased text-dark-800 leading-xl">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}