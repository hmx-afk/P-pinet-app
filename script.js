Pi.init({
  version: "2.0",
  sandbox: true
});

const loginBtn = document.getElementById("loginBtn");
const payBtn = document.getElementById("payBtn");
const statusText = document.getElementById("status");

loginBtn.addEventListener("click", login);
payBtn.addEventListener("click", sendPayment);

async function login() {

  try {

    const scopes = ['payments'];

    const auth = await Pi.authenticate(
      scopes,
      onIncompletePaymentFound
    );

    statusText.innerText =
      "Welcome " + auth.user.username;

  } catch (err) {

    console.error(err);

    statusText.innerText =
      "Login Failed";

  }
}

function onIncompletePaymentFound(payment) {

  console.log("Incomplete payment found");

  console.log(payment);
}

function sendPayment() {

  const paymentData = {
    amount: 0.1,
    memo: "Pi Payment Test",
    metadata: {
      product: "Pi App Journey"
    }
  };

  Pi.createPayment(

    paymentData,

    {

      onReadyForServerApproval:
      async function(paymentId) {

        console.log("Ready for approval");

        const response = await fetch(
          "/api/approve",
          {
            method: "POST",
            headers: {
              "Content-Type":
              "application/json"
            },

            body: JSON.stringify({
              paymentId
            })
          }
        );

        const data =
          await response.json();

        console.log(data);
      },

      onReadyForServerCompletion:
      async function(paymentId, txid) {

        console.log("Ready for completion");

        const response = await fetch(
          "/api/complete",
          {
            method: "POST",
            headers: {
              "Content-Type":
              "application/json"
            },

            body: JSON.stringify({
              paymentId,
              txid
            })
          }
        );

        const data =
          await response.json();

        console.log(data);

        alert("Payment Success ✅");
      },

      onCancel: function(paymentId) {

        console.log("Cancelled");

      },

      onError: function(error) {

        console.error(error);

        alert("Payment Error");

      }

    }

  );

}
