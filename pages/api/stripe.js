import Stripe from "stripe"
import { getSession } from "@auth0/nextjs-auth0"

const stripe = new Stripe(`${process.env.NEXT_PUBLIC_STRIPE_SECRET}`)

export default async function handler(req, res) {
  const session = await getSession(req, res)
  const user = session?.user
  const stripeId = user["http://localhost:3000/stripe_customer_id"]

  if (req.method === "POST") {
    try {
      const session = await stripe.checkout.sessions.create({
        submit_type: "pay",
        mode: "payment",
        customer: stripeId,
        payment_method_types: ["card"],
        shipping_address_collection: {
          allowed_countries: ["US", "CA"],
        },
        shipping_options: [
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: {
                amount: 1000,
                currency: "usd",
              },
              display_name: "Standard Shipping",
              delivery_estimate: {
                minimum: {
                  unit: "business_day",
                  value: 5,
                },
                maximum: {
                  unit: "business_day",
                  value: 20,
                },
              },
            },
          },
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: {
                amount: 4000,
                currency: "usd",
              },
              display_name: "Express Shipping",
              delivery_estimate: {
                minimum: {
                  unit: "business_day",
                  value: 1,
                },
                maximum: {
                  unit: "business_day",
                  value: 5,
                },
              },
            },
          },
        ],
        allow_promotion_codes: true,
        line_items: req.body.cartItems.map((item) => ({
          price_data: {
            currency: "usd",
            product_data: {
              name: item.title,
              images: [item.image.data.attributes.formats.thumbnail.url],
            },
            unit_amount: item.price * 100,
          },
          quantity: item.quantity,
        })),
        success_url: `${req.headers.origin}/success?&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/`,
      })
      res.status(200).json({ id: session.id })
    } catch (error) {
      res.status(500).json({ statusCode: 500, message: error.message })
    }
  } else {
    res.setHeader("Allow", "POST")
    res.status(405).end("Method Not Allowed")
  }
}
