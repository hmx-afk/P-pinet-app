window.sendPiPayment = async function () {

  if (typeof Pi === "undefined") {
    alert("Pi SDK not loaded");
    return;
  }

  try {

    const paymentData = {
      amount: 0.1,
      memo: "Pi App Journey Payment",
      metadata: {
        type: "test-payment",
        app: "Pi App Journey"
      }
    };

    const paymentCallbacks = {

      onReadyForServerApproval: function (paymentId) {

        console.log("Ready for server approval:", paymentId);

      },

      onReadyForServerCompletion: function (paymentId, txid) {

        console.log("Ready for completion:", paymentId, txid);

        alert("Payment Success ✅");

      },

      onCancel: function (paymentId) {

        console.log("Payment cancelled", paymentId);

        alert("Payment Cancelled");

      },

      onError: function (error, payment) {

        console.error("Payment Error:", error);

        alert("Payment Failed ❌");

      }

    };

    await Pi.createPayment(paymentData, paymentCallbacks);

  } catch (err) {

    console.error(err);

    alert("Unexpected Error ❌");

  }

};
