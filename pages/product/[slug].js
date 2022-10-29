import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { useQuery } from "urql";
import { GET_PRODUCT_QUERY } from "../../lib/query";
import {
  Buy,
  DetailsStyle,
  ProductInfo,
  Quantity,
} from "../../styles/ProductDetails";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { useCart } from "../../lib/context";
import { useState } from "react";

const ProductDetails = () => {
  const { cartItems, setCartItems, setCartOpen } = useCart();
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const { slug } = router.query;
  const [results] = useQuery({
    query: GET_PRODUCT_QUERY,
    variables: {
      slug: slug,
    },
  });

  const { data, fetching, error } = results;

  if (fetching) return <div>Loading...</div>;
  if (error) return <div>Oh no... {error.message}</div>;

  let { title, description, image, price } = data.products.data[0].attributes;

  const addToCart = () => {
    const item = {
      slug: slug,
      title: title,
      description: description,
      image: image,
      quantity: quantity,
      price: price,
    };
    //check if item is already in cart and update quantity
    const itemInCart = cartItems.find(
      (cartItem) => cartItem.slug === item.slug
    );
    if (itemInCart) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.slug === item.slug
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        )
      );
    } else {
      setCartItems([...cartItems, item]);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const removeFromCart = (slug) => {
    setCartItems(cartItems.filter((item) => item.slug !== slug));
  };

  return (
    <DetailsStyle>
      <Image
        src={image.data.attributes.formats.medium?.url}
        alt={title}
        width={image.data.attributes.formats.medium?.width}
        height={image.data.attributes.formats.medium?.height}
        layout="responsive"
        className="product-image-detail"
      />
      <ProductInfo>
        <h3>{title}</h3>
        <p>{description}</p>
        <Quantity>
          <span>Quantity</span>
          <button
            onClick={() => {
              decreaseQuantity();
            }}
          >
            <AiFillMinusCircle />
          </button>
          <span>{quantity}</span>
          <button
            onClick={() => {
              increaseQuantity();
            }}
          >
            <AiFillPlusCircle />
          </button>
        </Quantity>
        <Buy
          onClick={() => {
            addToCart();
            setQuantity(1);
            setCartOpen(true);
          }}
        >
          Add to Cart
        </Buy>
        <button
          onClick={() => {
            removeFromCart(slug);
          }}
        >
          Remove from Cart
        </button>
        <button
          onClick={() => {
            console.log(cartItems);
          }}
        >
          Log Cart
        </button>
      </ProductInfo>
    </DetailsStyle>
  );
};

export default ProductDetails;
