import Head from "next/head";
import Image from "next/image";
import { useQuery } from "urql";
import { PRODUCT_QUERY } from "../lib/query";
import Product from "../components/Products";
import { Gallery } from "../styles/Gallery";

export default function Home() {
  const [results] = useQuery({
    query: PRODUCT_QUERY,
  });
  const { data, fetching, error } = results;

  if (fetching) return <div>Loading...</div>;
  if (error) return <div>Oh no... {error.message}</div>;

  const products = data.products.data;

  return (
    <>
      <main>
        <Gallery>
          {products.map((product) => (
            <Product key={product.attributes.slug} product={product} />
          ))}
        </Gallery>
      </main>
    </>
  );
}
