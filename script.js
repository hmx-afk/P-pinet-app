    res.status(500).json({ error: "Approval failed" });
  }
});


// ======================
// COMPLETE PAYMENT
// ======================
app.post("/complete-payment", async (req, res) => {

  const { paymentId, txid } = req.body;

  try {

    const response = await axios.post(
      `https://api.minepi.com/v2/payments/${paymentId}/complete`,
      { txid },
      {
        headers: {
          Authorization: `Key ${PI_API_KEY}`
        }
      }
    );

    console.log("Completed:", response.data);

    res.json({ success: true });

  } catch (err) {
    console.log(err.response?.data || err.message);
    res.status(500).json({ error: "Completion failed" });
  }
});

app.listen(3000, () => {
  console.log("Pi Backend running on port 3000 🚀");
});
