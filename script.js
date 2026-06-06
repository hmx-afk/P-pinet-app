Pi.init({
  version: "2.0",
  sandbox: true
});

let currentUser = null;

async function login() {

  try {

    const scopes = ['username', 'payments'];

    const auth = await Pi.authenticate(
      scopes,
      function(payment) {}
    );

    currentUser = auth.user;

    document.getElementById("status").innerText =
      "Welcome " + currentUser.username;

    alert("Wallet Connected ✅");

  } catch (err) {

    console.error(err);

    alert("Login Failed");

  }

}

async function sendPayment() {

  if (!currentUser) {

    alert("Please connect wallet first");

    return;

  }

  Pi.createPayment(
    {
      amount: 0.1,
      memo: "Pi App Journey",
      metadata: {
        product: "Pi App Journey"
      }
    },

    {

      onReadyForServerApproval: async function(paymentId) {

        try {

          const res = await fetch("/api/approve", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ paymentId })
          });

          console.log(await res.json());

        } catch(err) {

          console.error(err);

        }

      },

      onReadyForServerCompletion: async function(paymentId, txid) {

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

          console.log(await res.json());

          alert("Payment Success ✅");

        } catch(err) {

          console.error(err);

        }

      },

      onCancel: function(paymentId) {

        console.log("Payment Cancelled");

      },

      onError: function(error) {

        console.error(error);

      }

    }

  );

}

document
  .getElementById("loginBtn")
  .addEventListener("click", login);

document
  .getElementById("payBtn")
  .addEventListener("click", sendPayment);
