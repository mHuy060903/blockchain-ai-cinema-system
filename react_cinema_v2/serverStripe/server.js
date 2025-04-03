import express from "express";
const app = express();
import cors from "cors";
import sgMail from "@sendgrid/mail";
import nodemailer from "nodemailer";
import movieRouter from "./routes/moviesRoute.js";
import chatRouter from "./routes/chatRoute.js";
import dotenv from "dotenv";
import Stripe from "stripe";
dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// This is your test secret API key.
// const stripe = require("stripe")(
//   "sk_test_51LptRHLjMvOhowgDa001oa1Ui1zP1175frcZ4ov7TN48xOPFfkmSB4yFEnJKJJTeYravDcQsZ0kAWQEZZG2rm7zY00I9U0SgUK"
// );
const stripe = new Stripe(
  "sk_test_51LptRHLjMvOhowgDa001oa1Ui1zP1175frcZ4ov7TN48xOPFfkmSB4yFEnJKJJTeYravDcQsZ0kAWQEZZG2rm7zY00I9U0SgUK"
);
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

const calculateOrderAmount = (cost) => {
  return cost;
};

app.post("/create-payment-intent", async (req, res) => {
  const { cost } = req.body;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(cost),
    currency: "vnd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.post("/sendMessage", async (req, res) => {
  const { price, idBooking, time, email } = req.body;
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: process.env.USER,
        pass: process.env.APP_PASSWORD,
      },
    });
    const htmlContent = `
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f4f4f4;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border: 1px solid #e1e1e1;
        }
        .header {
            text-align: center;
            margin-bottom: 20px;
        }
        .header img {
            max-width: 150px;
        }
        h2 {
            color: #00923f;
            text-align: center;
        }
        table {
            width: 100%;
            border-collapse: collapse;
        }
        table, th, td {
            border: 1px solid #e1e1e1;
        }
        th, td {
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #f8f8f8;
        }
        .footer {
            margin-top: 20px;
            text-align: center;
            color: #888;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="https://ktnrpafhdqevxxqevmfc.supabase.co/storage/v1/object/public/images/Screenshot%202024-08-20%20085249.png?t=2024-08-20T01%3A53%3A38.504Z" alt="Logo">
        </div>
        <h2>Biên lai thanh toán</h2>
        <table>
            <tr>
                <th>Ngày, giờ giao dịch</th>
                <td>${time}</td>
            </tr>
            <tr>
                <th>Số lệnh giao dịch</th>
                <td>${idBooking}</td>
            </tr>
            <tr>
                <th>Tài khoản nguồn</th>
                <td>4242 4242 4242</td>
            </tr>
           
          
            <tr>
                <th>Số tiền</th>
                <td>${price} VND</td>
            </tr>
          
        </table>
        <div class="footer">
            &copy; 2024 Vietcombank. All rights reserved.
        </div>
    </div>
</body>
</html>
`;
    const info = await transporter.sendMail({
      from: { name: "Admin Cticket", address: process.env.USER }, // sender address
      to: email, // list of receivers
      subject: "Biên lai thanh toán đặt vé", // Subject line
      text: "Hello world?", // plain text body
      html: htmlContent, // html body
    });
  } catch (error) {
    throw new Error(error.message);
  }

  res.send("Message sent");
});
app.use("/data", movieRouter);
app.use("/ai", chatRouter);

app.listen(4242, () => console.log("Node server listening on port 4242!"));
