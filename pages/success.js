import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import styled from "styled-components"

const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET)
const { motion } = require("framer-motion")

export async function getServerSideProps(params) {
  const order = await stripe.checkout.sessions.retrieve(
    params.query.session_id,
    { expand: ["line_items", "payment_intent"] }
  )
  return {
    props: {
      order,
    },
  }
}

export default function Success({ order }) {
  console.log(order)
  return (
    <Wrapper>
      <Head>
        <title>Success</title>
      </Head>
      <Card
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.33, ease: "easeInOut" }}
        exit={{ opacity: 0 }}
      >
        <Image
          src={"/wow.webp"}
          alt="wow"
          width={400}
          height={250}
          layout="responsive"
          sizes="(max-width: 600px) 50vw, 600px"
        />
        <h1>Thank you for your order!</h1>
        <h2>Order &quot;Number&quot;: {order.payment_intent.id}</h2>
        <h2>A confirmation email has been sent to:</h2>
        <h3>{order.customer_details.email}</h3>
        <h4>Items Ordered:</h4>
        <OrderTable>
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          {order.line_items.data.map((item) => (
            <tr key={item.slug}>
              <td>{item.description}</td>
              <td>{item.quantity}</td>
              <td>${item.amount_total / 100}</td>
            </tr>
          ))}
          <tfoot>
            <tr>
              <td colSpan={3}>
                <strong>
                  Shipping: ${order.shipping_cost.amount_total / 100}
                </strong>
              </td>
            </tr>
            <tr>
              <td colSpan={3}>
                <strong>Total: ${order.amount_total / 100}</strong>
              </td>
            </tr>
          </tfoot>
        </OrderTable>
        <Address>
          <p>The Shipping Address that you entered was:</p>
          <p>
            {order.shipping_details.address.line1} <br />
          </p>
          {order.shipping_details.address.line2 && (
            <p>
              {order.shipping_details.address.line2}
              <br />
            </p>
          )}
          <p>
            {order.shipping_details.address.city},{" "}
            {order.shipping_details.address.state}
          </p>
          <p>{order.shipping_details.address.postal_code}</p>
        </Address>
        <p>
          If you have any questions or see any issues with your order, please
          contact us at our email address:
          <Button>
            <a href="mailto:electriclarry@gmail.com"> HERE</a>
          </Button>
        </p>
        <Link href="/">
          <Button>Continue Shopping</Button>
        </Link>
      </Card>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  margin: 0 auto;
  max-width: 80vw;
`

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: hotpink;
  border-radius: 1rem;
  padding: 1rem;
  margin: 1rem;
  h2 {
    margin: 0.25rem;
  }
  h3 {
    color: red;
    margin: 0.25rem;
  }
  h4 {
    color: #000;
    margin: 0.25rem;
  }
`
const OrderTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  td,
  th {
    padding: 0.5rem;
  }
  th:nth-child(1) {
    text-align: left;
  }
  th:nth-last-child(-n + 2) {
    text-align: right;
  }
  td:nth-last-child(-n + 2) {
    text-align: right;
  }
`

const Address = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  margin: 1rem;
  gap: 0.25rem;
`

const Button = styled.button`
  background: #fff;
  border: 1px solid #000;
  border-radius: 0.5rem;
  padding: 0.5rem;
  margin: 0.5rem;
  cursor: pointer;
  &:hover {
    background: #000;
    color: #fff;
  }
`
