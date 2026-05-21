window.addEventListener("DOMContentLoaded", () => {

  const Pi = window.Pi;

  if (!Pi) {
    console.error("❌ Pi SDK not loaded!");
    return;
  }

  // INIT PI SDK
  Pi.init({ version: "2.0" });

  // =========================
  // INCOMPLETE PAYMENT HANDLER
  // =========================
  function onIncompletePaymentFound(payment) {
    console.log("🔄 Incomplete payment found:", payment);
  }

  // =========================
  // LOGIN FUNCTION (GLOBAL)
  // =========================
  window.loginPiUser = async function () {

    try {

      console.log("🔵 Starting login...");

      const scopes = ["payments"];

      const auth = await Pi.authenticate(scopes, onIncompletePaymentFound);

      console.log("✅ Login successful:", auth);

      alert("Wallet Connected Successfully ✅");

    } catch (err) {

      console.error("❌ Login error:", err);

      alert("Login failed ❌");
    }
  };

  // =========================
  // PAYMENT FUNCTION (GLOBAL)
  // =========================
  window.sendPiPayment = async function () {

    try {

      console.log("🔵 Starting payment...");

      const payment = await Pi.createPayment(
        {
          amount: 0.1,
          memo: "Pi App Journey Payment",
          metadata: { type: "test_payment" }
        },
        {

          // STEP 1: APPROVAL
          onReadyForServerApproval: async function (paymentId) {

            console.log("🟡 Approval needed:", paymentId);

            try {
              const res = await fetch("https://YOUR-BACKEND.com/approve", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ paymentId })
              });

              const data = await res.json();
              console.log("🟢 Approved:", data);

            } catch (err) {
              console.error("❌ Approval error:", err);
            }
          },

          // STEP 2: COMPLETION
          onReadyForServerCompletion: async function (paymentId, txid) {

            console.log("🟡 Completing payment...");

            try {
              const res = await fetch("https://YOUR-BACKEND.com/complete", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ paymentId, txid })
              });

              const data = await res.json();
              console.log("🟢 Completed:", data);

            } catch (err) {
              console.error("❌ Completion error:", err);
            }
          },

          // CANCEL
          onCancel: function (paymentId) {
            console.log("⚠️ Payment cancelled:", paymentId);
            alert("Payment Cancelled");
          },

          // ERROR
          onError: function (error) {
            console.error("❌ Payment error:", error);
            alert("Payment Error");
          }
        }
      );

      console.log("🚀 Payment started:", payment);

    } catch (err) {

      console.error("❌ Create payment failed:", err);
      alert("Payment failed ❌");
    }
  };

});
