import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script
          defer
          src="https://api.pirsch.io/pa.js"
          id="pianjs"
          data-code="1JAjtFvaT5tJG281MVVi2myuYWfb7Ovx"
        ></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
