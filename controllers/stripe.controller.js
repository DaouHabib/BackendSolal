const stripe = require('stripe')('sk_test_51IIXF1L6frWMET0JJJtZ34lt3t64sSRkWlAsfATAcpMNwWFkJUpLh6i9RqdqmXl9JDjHnbSjlqdbN39Z4upvU3Tx00b0Atb73E')
const router = require('express-promise-router')();
router.post("", async (req, res) => {
    const { items } = req.body;
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: "usd"
    });
    res.send({
      clientSecret: paymentIntent.client_secret
    });
  });