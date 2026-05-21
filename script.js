window.addEventListener("DOMContentLoaded", async () => {

  const Pi = window.Pi;

  if (!Pi) {
    console.error("❌ Pi SDK not loaded!");
    return;
  }

  Pi.init({ version: "2.0" });

  function onIncompletePaymentFound(payment) {
    console.log("🔄 Incomplete payment found:", payment);
  }

  // LOGIN
  async function loginPiUser() {
    try {
      const scopes = ["payments"];
      const auth = await Pi.authenticate(scopes, onIncompletePaymentFound);

      console.log("✅ User authenticated:", auth);

    } catch (err) {
      console.error("❌ Login error:", err);
    }
  }

  loginPiUser();

  // PAYMENT FUNCTION
  window.sendPiPayment = async function () {

    try {

      const payment = await Pi.createPayment(
        {
          amount: 0.1,
          memo: "Pi Payment Test",
          metadata: { type: "test_payment" }
        },
        {
          onReadyForServerApproval: async function (paymentId) {

            console.log("🟡 Approval:", paymentId);

            await fetch("https://YOUR-BACKEND.com/approve", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ paymentId })
            });

          },

          onReadyForServerCompletion: async function (paymentId, txid) {

            console.log("🟡 Completion:", paymentId, txid);

            await fetch("https://YOUR-BACKEND.com/complete", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ paymentId, txid })
            });

          },

          onCancel: function (paymentId) {
            console.log("⚠️ Cancelled:", paymentId);
          },

          onError: function (err) {
            console.error("❌ Error:", err);
          }
        }
      );

      console.log("🚀 Payment started:", payment);

    } catch (err) {
      console.error("❌ Create payment failed:", err);
    }
  };

});
