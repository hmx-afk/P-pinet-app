document.addEventListener("DOMContentLoaded", () => {

  if (!window.Pi) {
    alert("Open in Pi Browser ❌");
    return;
  }

  const Pi = window.Pi;
  Pi.init({ version: "2.0" });

  const btn = document.getElementById("btn");

  if (!btn) {
    console.log("Button not found");
    return;
  }

  btn.addEventListener("click", async () => {

    try {
      const scopes = ["username", "payments"];

      const auth = await Pi.authenticate(scopes, onIncompletePaymentFound);

      console.log("Logged in user:", auth);

      // after login → run payment (optional)
      await makePayment();

    } catch (err) {
      console.log("Login error:", err);
    }

  });

});


// OPTIONAL: payment handler
async function makePayment() {

  const payment = {
    amount: 1,
    memo: "Pi App Journey Payment",
    metadata: { type: "test-payment" }
  };

  const paymentCallbacks = {
    onReadyForServerApproval: (paymentId) => {
      console.log("Ready for approval:", paymentId);
    },

    onReadyForServerCompletion: (paymentId, txid) => {
      console.log("Ready for completion:", paymentId, txid);
    },

    onCancel: (paymentId) => {
      console.log("Payment cancelled:", paymentId);
    },

    onError: (error, payment) => {
      console.log("Payment error:", error);
    }
  };

  try {
    const result = await Pi.createPayment(payment, paymentCallbacks);
    console.log("Payment success:", result);
  } catch (err) {
    console.log("Payment failed:", err);
  }
}
