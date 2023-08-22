import { Html, Head, Main, NextScript } from 'next/document'
import Link from 'next/link'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <Link
          href="https://fonts.cdnfonts.com/css/dm-sans" rel="stylesheet"
          // href="https://fonts.googleapis.com/css2?family=Almarai:wght@300;400;700&family=DM+Sans:opsz,wght@9..40,100;9..40,200;9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=Poppins:ital,wght@0,400;0,500;1,300;1,400&display=swap" 
          // rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
