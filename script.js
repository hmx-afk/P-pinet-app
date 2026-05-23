let userData = null;

// ==========================
// INIT PI SDK
// ==========================
document.addEventListener("DOMContentLoaded", () => {

  const loginBtn = document.getElementById("loginBtn");
  const payBtn = document.getElementById("payBtn");

  // LOGIN BUTTON FIX
  loginBtn.addEventListener("click", login);

  // PAYMENT BUTTON FIX
  payBtn.addEventListener("click", sendPiPayment);

  if (typeof Pi === "undefined") {
    document.getElementById("status").innerText = "Pi SDK not loaded ❌";
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

    document.getElementById("loginBtn").style.display = "none";

    document.getElementById("dashboard").classList.remove("hidden");

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

    Pi.createPayment({
      amount: 0.1,
      memo: "Pi App Journey Payment",
      metadata: { type: "test-payment" }
    }, {

      onReadyForServerApproval: function(paymentId) {

        console.log("Approve:", paymentId);

        fetch("/approve-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paymentId })
        });

      },

      onReadyForServerCompletion: function(paymentId, txid) {

        console.log("Complete:", paymentId, txid);

        fetch("/complete-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paymentId, txid })
        });

      },

      onCancel: function(paymentId) {
        console.log("Cancelled:", paymentId);
        alert("Payment cancelled ❌");
      },

      onError: function(error) {
        console.error(error);
        alert("Payment failed ❌");
      }

    });

  } catch (err) {
    console.error(err);
    alert("Payment error ❌");
  }
}
