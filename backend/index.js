require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./routes/route");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.set("strictQuery", true);

mongoose
  .connect(process.env.MONGOOSE_URL)
  .then(() => console.log("Mongoose is Connected"))
  .catch((err) => console.error(err.message));



  const endpointSecret = process.env.ENDPOINT_SECRET;


app.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  async (request, response) => {
    // console.log("hello")
    // const sig = request.headers['stripe-signature'];

    const event = request.body;

    // try {
    //   event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    // } catch (err) {
    //   response.status(400).send(`Webhook Error: ${err.message}`);
    //   return;
    // }

    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntentSucceeded = event.data.object;

        // const order = await Order.findById(
        //   paymentIntentSucceeded.metadata.orderId
        // );
        // order.paymentStatus = 'received';
        // await order.save();

        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send();
  }
);



app.use("/", router);




// app.use(express.static(path.join(__dirname, '../front/build')));

// app.use('*' , (req, res)=>{res.sendFile(path.resolve(__dirname , '../front/build' , 'index.html'))})

// payment 

const stripe = require("stripe")(
  "sk_test_51OtOKVSIntRVZuwIJZvtCxuWdCT6CtDNG3PlhdPYVL2Bn1S14m4CbEMjtNPH67XOAXyAKx4WEFrWZpW3mmpkPXFA00LmdgZ54Y"
);

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

app.post("/create-payment-intent", async (req, res) => {
  const { totalAmount, orderId, userId, userName, userEmail } = req.body;
  console.log(totalAmount);
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalAmount * 100,
    currency: "inr",
    description: "Order total amount is here",
    metadata: {
      orderId: orderId,
      userName,
      userEmail,
      userId,
    },
    shipping: {
      name: userName, // Use customer's name from Stripe
      address: {
        line1: "36 D",
        city: "delhi",
        postal_code: "110002",
        state: "delhi",
        country: "US",
      },
    },
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

// console.log("env", process.env.API_URL);

app.listen(process.env.PORT, function () {
  console.log(`Server is Running Succesfully : ${process.env.PORT}`);
});
