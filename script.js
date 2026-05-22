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
