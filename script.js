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
          type: "test-payment",
          app: "Pi Journey"
        }
      },

      {

        // APPROVAL STAGE
        onReadyForServerApproval: function(paymentId) {

          console.log(
            "Ready for approval:",
            paymentId
          );

          alert("Payment approval stage ✔️");
        },


        // COMPLETION STAGE
        onReadyForServerCompletion: function(
          paymentId,
          txid
        ) {

          console.log(
            "Completed:",
            paymentId,
            txid
          );

          alert("Payment completed ✔️");
        },


        // CANCELLED
        onCancel: function(paymentId) {

          console.log(
            "Cancelled:",
            paymentId
          );

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


// ==========================
// LOGOUT
// ==========================
function logout() {

  userData = null;

  document.getElementById("loginBtn").style.display =
    "block";

  document.getElementById("dashboard").classList.add(
    "hidden"
  );

  document.getElementById("status").innerText =
    "Connect your Pi Wallet";
}
