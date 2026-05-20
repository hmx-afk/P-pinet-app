document.addEventListener("DOMContentLoaded", () => {

  const btn = document.getElementById("btn");
  const status = document.getElementById("status");

  if (!btn) return;

  // Init Pi safely
  function getPi() {
    if (!window.Pi) return null;

    const Pi = window.Pi;

    Pi.init({
      version: "2.0",
      sandbox: true
    });

    return Pi;
  }

  // Payment function
  async function makePayment(Pi) {
    try {
      const payment = {
        amount: 1,
        memo: "Pi App Journey Payment",
        metadata: { type: "test" }
      };

      const callbacks = {
        onReadyForServerApproval: (id) => {
          console.log("Approve:", id);
        },
        onReadyForServerCompletion: (id, txid) => {
          console.log("Complete:", id, txid);
        },
        onCancel: (id) => {
          console.log("Cancelled:", id);
        },
        onError: (err) => {
          console.log("Payment Error:", err);
        }
      };

      const result = await Pi.createPayment(payment, callbacks);
      console.log("PAYMENT 
