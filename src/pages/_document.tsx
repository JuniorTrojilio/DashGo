import Document, { Html, Head, Main, NextScript} from 'next/document'

export default class MyDocument extends Document {
  render(){
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" /> 
          <link rel="preconnect" href="https://fonts.googleapis.com" /> 
          <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
          <meta name="apple-mobile-web-app-status-bar-style" content="#1f2029" />
          <meta name="theme-color" content="#1f2029" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}