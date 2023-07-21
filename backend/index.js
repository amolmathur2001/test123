const express = require("express");
const connectDB = require("./Db");

const cors = require("cors");
const app = express();

connectDB();

app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello User");
});
app.use(express.json());
app.use("/api", require("./Routes/CreateUser"));
app.use("/api", require("./Routes/ShowData"));
app.use("/api", require("./Routes/OrderData"));
app.use("/api", require("./Routes/MyOrderData"));
app.use("/api",require("./Routes/SendSMS"));

//Payment
// This is your test secret API key.
const stripe = require("stripe")(
  "sk_test_51NUqQfSGGqzCBSaVTSwEsnVlTVS2C1vjugSdFhU9niWr9lKTYpRqg6htZrvumnCWGenMooJunDZePsgh73sBBpNx00RXfacIuF"
);

app.use(express.static("public"));
app.use(express.json());

app.post("/create-payment-intent", async (req, res) => {
  const { totalAmount } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalAmount * 100,
    currency: "inr",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

//sending messages


app.listen(9000, () => {
  console.log("app is listening...");
});

