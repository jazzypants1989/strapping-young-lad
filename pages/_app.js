import "../styles/globals.css";
import { Provider, createClient } from "urql";
import Nav from "../components/Nav";
import { CartProvider } from "../lib/context";

const client = createClient({ url: process.env.NEXT_PUBLIC_BACKEND_API });

function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <Provider value={client}>
        <Nav />
        <Component {...pageProps} />;
      </Provider>
    </CartProvider>
  );
}

export default MyApp;
