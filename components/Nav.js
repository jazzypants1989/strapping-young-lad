import Link from "next/link";
import { RiShoppingBag3Fill } from "react-icons/ri";
import { NavItems, NavStyles } from "../styles/NavStyles";
import { useCart } from "../lib/context";

export default function Nav() {
  const { cartItems } = useCart();
  return (
    <NavStyles>
      <Link href="/">Electric Larry&apos;s!</Link>
      <NavItems>
        <li>
          <RiShoppingBag3Fill />
          <span>
            {(
              cartItems.reduce((acc, item) => acc + item.quantity, 0) || 0
            ).toString()}
          </span>
          <h3>Cart!</h3>
        </li>
      </NavItems>
    </NavStyles>
  );
}
