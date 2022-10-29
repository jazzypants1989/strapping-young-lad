import Link from "next/link";
import { RiShoppingBag3Fill } from "react-icons/ri";
import { NavItems, NavStyles, OuterNav } from "../styles/NavStyles";
import { useCart } from "../lib/context";
import Cart from "./Cart";

export default function Nav() {
  const { cartItems, cartOpen, setCartOpen } = useCart();

  return (
    <OuterNav>
      <Link href="/">Electric Larry&apos;s!</Link>
      <NavStyles>
        <NavItems>
          <li>
            <RiShoppingBag3Fill onClick={() => setCartOpen(true)} />
            {cartOpen && <Cart />}
          </li>
          <span>
            {(
              cartItems.reduce((acc, item) => acc + item.quantity, 0) ||
              "Empty cart"
            ).toString()}{" "}
          </span>
        </NavItems>
      </NavStyles>
    </OuterNav>
  );
}
