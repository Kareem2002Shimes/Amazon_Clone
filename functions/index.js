const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// API

// App config
const app = express();

// Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// API routes
app.get("/", (request, response) => response.status(200).send("Hello World"));

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // subunits of the currency
    currency: "usd",
  });
  // Ok - created
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// Example endpoit
// http://localhost:5001/clone-dffaf/us-central1/api

// Listen command
exports.api = functions.https.onRequest(app);
