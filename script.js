const express = require("express");
const fetch = require("node-fetch");

const app = express();
app.use(express.json());

const API_KEY = "YOUR_PI_API_KEY";

// =========================
// APPROVE PAYMENT
// =========================
app.post("/approve", async (req, res) => {

  const { paymentId } = req.body;

  try {

    const response = await fetch(
      `https://api.minepi.com/v2/payments/${paymentId}/approve`,
      {
        method: "POST",
        headers: {
          "Authorization": `Key ${API_KEY}`
        }
      }
    );

    const data = await response.json();

    console.log("APPROVED:", data);

    res.json(data);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "approve failed" });
  }
});

// =========================
// COMPLETE PAYMENT
// =========================
app.post("/complete", async (req, res) => {

  const { paymentId, txid } = req.body;

  try {

    const response = await fetch(
      `https://api.minepi.com/v2/payments/${paymentId}/complete`,
      {
        method: "POST",
        headers: {
          "Authorization": `Key ${API_KEY}`
        },
        body: JSON.stringify({ txid })
      }
    );

    const data = await response.json();

    console.log("COMPLETED:", data);

    res.json(data);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "complete failed" });
  }
});

app.listen(3000, () => {
  console.log("SERVER RUNNING");
});
