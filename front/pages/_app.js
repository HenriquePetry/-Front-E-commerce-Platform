import { SessionProvider } from 'next-auth/react';
import { CartContext, CartContextProvider } from "@/components/CartContext";
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  body {
    background-color: white;
    padding: 0;
    margin: 0;
    font-family: 'Poppins', sans-serif;
  }
`;

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <GlobalStyles />
      <CartContextProvider>
        <Component {...pageProps} />
      </CartContextProvider>
    </SessionProvider>
  );
}
