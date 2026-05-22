let userData = null;


// ==========================
// INIT PI SDK
// ==========================
document.addEventListener("DOMContentLoaded", () => {

  if (typeof Pi === "undefined") {

    document.getElementById("status").innerText =
      "Pi SDK not loaded ❌";

    console.log("Pi SDK missing");

    return;
  }

  Pi.init({
    version: "2.0",
    sandbox: true
  });

  console.log("Pi SDK Ready ✔️");
});


// ==========================
// LOGIN FUNCTION
// ==========================
async function login() {

  try {

    const scopes = ["username", "payments"];

    const auth = await Pi.authenticate(scopes);

    userData = auth.user;

    document.getElementById("username").innerText =
      "User: " + userData.username;

    document.getElementById("status").innerText =
      "Wallet Connected ✔️";

    document.getElementById("loginBtn").style.display =
      "none";

    document.getElementById("dashboard").classList.remove(
      "hidden"
    );

    console.log(auth);

  } catch (err) {

    console.log(err);

    alert("Login failed ❌");
  }
}


// ==========================
// PAYMENT FUNCTION
// ==========================
async function sendPiPayment() {

  if (typeof Pi === "undefined") {
    alert("Pi SDK not loaded ❌");
    return;
  }

  try {

    Pi.createPayment(
      {
        amount: 0.1,
        memo: "Pi App Journey",
        metadata: {
          type: "test-payment"
        }
      },

      {

        // APPROVAL
        onReadyForServerApproval: function(paymentId) {

          console.log("Approve:", paymentId);

          // FAKE APPROVAL FOR TESTING
          setTimeout(() => {

            alert("Payment approved ✔️");

          }, 1000);
        },



        // COMPLETION
        onReadyForServerCompletion: function(paymentId, txid) {

          console.log("Completed:", paymentId, txid);

          alert("Payment completed ✔️");
        },



        // CANCEL
        onCancel: function(paymentId) {

          console.log("Cancelled:", paymentId);

          alert("Payment cancelled ❌");
        },



        // ERROR
        onError: function(error) {

          console.log(error);

          alert("Payment failed ❌");
        }

      }

    );

  } catch (err) {

    console.log(err);

    alert("Payment failed ❌");
  }
}
