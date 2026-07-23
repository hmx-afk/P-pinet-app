const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Pi App Journey Backend Running ✅"
  });
});

app.post("/api/approve", async (req, res) => {

  const { paymentId } = req.body;

  console.log("Approve:", paymentId);

  res.json({
    success: true
  });

});

app.post("/api/complete", async (req, res) => {

  const { paymentId, txid } = req.body;

  console.log("Complete:", paymentId, txid);

  res.json({
    success: true
  });

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
