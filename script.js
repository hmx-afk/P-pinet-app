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
