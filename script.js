async function sendPayment() {

  Pi.createPayment(
    0.1,
    "Pi Test Payment",
    {
      product: "Pi App Journey"
    },

    {

      onReadyForServerApproval:
      async function(paymentId) {

        try {

          const res = await fetch("/api/approve", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ paymentId })
          });

          const data = await res.json();

          console.log(data);

        } catch(err) {

          console.error("Approval Error:", err);

        }

      },

      onReadyForServerCompletion:
      async function(paymentId, txid) {

        try {

          const res = await fetch("/api/complete", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              paymentId,
              txid
            })
          });

          const data = await res.json();

          console.log(data);

          alert("Payment Success ✅");

        } catch(err) {

          console.error("Completion Error:", err);

        }

      },

      onCancel: function(paymentId) {

        console.log("Cancelled");

      },

      onError: function(error) {

        console.error("Pi Error:", error);

      }

    }

  );

}
