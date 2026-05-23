window.sendPiPayment = async function () {

  if (typeof Pi === "undefined") {
    alert("Pi SDK not loaded ❌");
    return;
  }

  try {

    await Pi.createPayment({
      amount: 0.1,
      memo: "Pi App Journey Payment",
      metadata: { type: "test-payment" }
    }, {

      onReadyForServerApproval: function (paymentId) {

        console.log("Approve:", paymentId);

        fetch("/approve-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paymentId })
        });

      },

      onReadyForServerCompletion: function (paymentId, txid) {

        console.log("Complete:", paymentId, txid);

        fetch("/complete-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paymentId, txid })
        });

      },

      onCancel: function (paymentId) {
        console.log("Cancelled:", paymentId);
      },

      onError: function (error) {
        console.error(error);
      }

    });

  } catch (err) {
    console.error(err);
  }
};
