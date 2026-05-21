const Pi = window.Pi;

Pi.init({ version: "2.0" });

// LOGIN
window.loginPiUser = async function () {
  try {
    const auth = await Pi.authenticate(["payments"], function (payment) {
      console.log("Incomplete payment:", payment);
    });

    console.log("✅ Logged in:", auth);
    alert("Wallet Connected ✅");

  } catch (err) {
    console.error(err);
    alert("Login failed ❌");
  }
};


// PAYMENT
window.sendPiPayment = async function () {
  try {

    const payment = await Pi.createPayment({
      amount: 0.1,
      memo: "Test Payment",
      metadata: {}
    }, {

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
        console.log("Error:", err);
      }

    });

    console.log("Payment started:", payment);

  } catch (err) {
    console.error(err);
  }
};
