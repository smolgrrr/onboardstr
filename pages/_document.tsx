import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className='bg-gradient-to-r from-cyan-500 to-blue-600 animate-gradient-xy'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
