window.addEventListener("DOMContentLoaded", () => {

  const Pi = window.Pi;

  if (!Pi) {
    console.error("❌ Pi SDK not loaded");
    return;
  }

  Pi.init({ version: "2.0" });

  function onIncompletePaymentFound(payment) {
    console.log("Incomplete payment:", payment);
  }

  // LOGIN
  window.loginPiUser = async function () {
    try {

      const auth = await Pi.authenticate(["payments"], onIncompletePaymentFound);

      console.log("✅ Login success:", auth);
      alert("Wallet Connected ✔️");

    } catch (err) {
      console.error(err);
      alert("Login failed ❌");
    }
  };

  // PAYMENT
  window.sendPiPayment = async function () {
    try {

      const payment = await Pi.createPayment(
        {
          amount: 0.1,
          memo: "Pi App Journey",
          metadata: {}
        },
        {
          onReadyForServerApproval: function (paymentId) {
            console.log("Approve:", paymentId);
          },

          onReadyForServerCompletion: function (paymentId, txid) {
            console.log("Complete:", paymentId, txid);
          },

          onCancel: function () {
            console.log("Cancelled");
          },

          onError: function (err) {
            console.log(err);
          }
        }
      );

      console.log("Payment started:", payment);

    } catch (err) {
      console.error(err);
    }
  };

});
