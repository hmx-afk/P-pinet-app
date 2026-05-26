function sendPayment() {

  Pi.createPayment(

    0.1,

    "Pi Test Payment",

    {
      product: "Pi App Journey"
    },

    {

      onReadyForServerApproval:
      async function(paymentId) {

        console.log(paymentId);

        await fetch("/api/approve", {
          method: "POST",
          headers: {
            "Content-Type":
            "application/json"
          },
          body: JSON.stringify({
            paymentId
          })
        });

      },

      onReadyForServerCompletion:
      async function(paymentId, txid) {

        await fetch("/api/complete", {
          method: "POST",
          headers: {
            "Content-Type":
            "application/json"
          },
          body: JSON.stringify({
            paymentId,
            txid
          })
        });

        alert("Payment Success ✅");

      },

      onCancel: function(paymentId) {

        console.log("Cancelled");

      },

      onError: function(error) {

        console.error(error);

      }

    }

  );

}
