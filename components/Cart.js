import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "../lib/context";
import {
  Card,
  CardButton,
  CardInfo,
  CartStyle,
  CartWrapper,
  EmptyStyle,
  TotalPrice,
} from "../styles/CartStyles";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { Quantity } from "../styles/NavStyles";

export default function Cart() {
  const { cartItems, setCartItems, cartOpen, setCartOpen } = useCart();

  const handleRemove = (slug) => {
    setCartItems(cartItems.filter((item) => item.slug !== slug));
  };

  const findCartItemAndIncrement = (slug) => {
    const item = cartItems.find((item) => item.slug === slug);
    item.quantity++;
    setCartItems([...cartItems]);
  };

  const findCartItemAndDecrement = (slug) => {
    const item = cartItems.find((item) => item.slug === slug);
    if (item.quantity === 1) {
      handleRemove(slug);
    } else {
      item.quantity--;
      setCartItems([...cartItems]);
    }
  };

  const findTotal = () => {
    let roughTotal = cartItems.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);

    return roughTotal.toFixed(2);
  };

  return (
    <CartWrapper onClick={() => setCartOpen(false)}>
      <CartStyle onClick={(e) => e.stopPropagation()}>
        {!cartItems.length && (
          <EmptyStyle>
            <RiShoppingCart2Fill />
            <h1>
              This is where all your cool stuff would be. <br />
              <br /> But, it&apos;s empty. How sad. 😞
            </h1>
          </EmptyStyle>
        )}
        {cartItems.map((item) => (
          <Card key={item.slug}>
            <Link href={`/products/${item.slug}`}>
              <Image
                src={item.image.data.attributes.formats.small?.url}
                alt={item.title}
                width={125}
                height={125}
              />
              {console.log(item)}
            </Link>
            <CardInfo>
              <Link href={`/products/${item.slug}`}>
                <p>{item.title}</p>
              </Link>
              <p>${item.price}</p>
              <Quantity>
                <AiFillMinusCircle
                  onClick={() => findCartItemAndDecrement(item.slug)}
                />
                <span>{item.quantity}</span>
                <AiFillPlusCircle
                  onClick={() => findCartItemAndIncrement(item.slug)}
                />
              </Quantity>
              <CardButton onClick={() => handleRemove(item.slug)}>
                Remove
              </CardButton>
            </CardInfo>
          </Card>
        ))}
        {findTotal() < 0.01 ? null : (
          <TotalPrice> Total: ${findTotal()}</TotalPrice>
        )}
      </CartStyle>
    </CartWrapper>
  );
}
