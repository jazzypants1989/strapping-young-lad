import { useRouter } from "next/router"
const stripe = require("stripe")(`${process.env.NEXT_PUBLIC_STRIPE_SECRET}`)
import { withPageAuthRequired, getSession } from "@auth0/nextjs-auth0"
import styled from "styled-components"

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(context) {
    const session = getSession(context.req, context.res)
    const user = session?.user
    const stripeId = user[`${process.env.BASE_URL}/stripe_customer_id`]
    const paymentIntents = await stripe.paymentIntents.list({
      customer: stripeId,
    })
    return {
      props: {
        orders: paymentIntents.data,
      },
    }
  },
})

export default function Profile({ user, orders }) {
  const router = useRouter()
  return (
    <ProfileStyle>
      <h1>Profile</h1>
      <h2>User</h2>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <h2>Orders</h2>
      <OrderMap className="orders">
        {orders.map((order) => (
          <div className="order" key={order.id}>
            <p>Order ID: {order.id}</p>
            <p>${order.amount / 100}</p>
            <p>Order Status: {order.status}</p>
            <p>
              Shipping Address: {order.shipping.address.line1},{" "}
              {order.shipping.address.city}, {order.shipping.address.state},{" "}
              {order.shipping.address.postal_code}
            </p>
            {order.shipping.tracking_number ? (
              <p>Tracking Number: {order.shipping.tracking_number}</p>
            ) : (
              <p>Tracking Number: Not Available Yet</p>
            )}
          </div>
        ))}
      </OrderMap>
    </ProfileStyle>
  )
}

const ProfileStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const OrderMap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .order {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
    margin: 1rem;
    padding: 1rem;
  }
`
