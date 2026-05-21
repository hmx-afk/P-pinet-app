window.addEventListener("DOMContentLoaded", () => {

  const Pi = window.Pi;

  if (!Pi) {
    console.error("❌ Pi SDK not loaded");
    return;
  }

  // INIT SDK
  Pi.init({ version: "2.0" });

  // INCOMPLETE PAYMENT HANDLER
  function onIncompletePaymentFound(payment) {
    console.log("🔄 Incomplete payment:", payment);
  }

  // =========================
  // LOGIN
  // =========================
  window.loginPiUser = async function () {

    try {

      const auth = await Pi.authenticate(
        ["payments"],
        onIncompletePaymentFound
      );

      console.log("✅ Login success:", auth);
      alert("Wallet Connected ✔️");

    } catch (err) {
      console.error("❌ Login error:", err);
      alert("Login failed ❌");
    }
  };

  // =========================
  // PAYMENT
  // =========================
  window.sendPiPayment = async function () {

    try {

      const payment = await Pi.createPayment(
        {
          amount: 0.1,
          memo: "Pi App Journey Payment",

          // FIXED METADATA (IMPORTANT ⚠️)
          metadata: {
            type: "purchase",
            app: "pi-app-journey",
            timestamp: Date.now()
          }
        },
        {

          // STEP 1: APPROVAL
          onReadyForServerApproval: async function (paymentId) {

            console.log("🟡 Approval:", paymentId);

            try {
              await fetch("https://YOUR-BACKEND.com/approve", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ paymentId })
              });

              console.log("🟢 Approved sent");

            } catch (err) {
              console.error("❌ Approval error:", err);
            }
          },

          // STEP 2: COMPLETION
          onReadyForServerCompletion: async function (paymentId, txid) {

            console.log("🟡 Completing:", paymentId, txid);

            try {
              await fetch("https://YOUR-BACKEND.com/complete", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ paymentId, txid })
              });

              console.log("🟢 Completed sent");

            } catch (err) {
              console.error("❌ Completion error:", err);
            }
          },

          onCancel: function (paymentId) {
            console.log("⚠️ Cancelled:", paymentId);
            alert("Payment Cancelled");
          },

          onError: function (err) {
            console.error("❌ Payment error:", err);
            alert("Payment Error");
          }
        }
      );

      console.log("🚀 Payment started:", payment);

    } catch (err) {
      console.error("❌ Create payment failed:", err);
    }
  };

});
