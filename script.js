let userData = null;

// INIT PI SDK
document.addEventListener("DOMContentLoaded", () => {
  if (typeof Pi === "undefined") {
    document.getElementById("status").innerText = "Pi SDK not loaded ❌";
    return;
  }

  Pi.init({
    version: "2.0",
    sandbox: true
  });

  console.log("Pi SDK Ready ✅");
});

// LOGIN FUNCTION
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

  } catch (err) {
    console.error(err);
    alert("Login failed");
  }
}

// PAYMENT FUNCTION
async function sendPiPayment() {
  try {
    const payment = await Pi.createPayment({
      amount: 0.1,
      memo: "Pi App Journey Payment",
      metadata: {
        app: "Pi Journey",
        type: "test"
      }
    });

    alert("Payment created successfully ✔️");
    console.log(payment);

  } catch (err) {
    console.error(err);
    alert("Payment failed ❌");
  }
}

// LOGOUT
function logout() {
  userData = null;

  document.getElementById("loginBtn").style.display = "block";
  document.getElementById("dashboard").classList.add("hidden");

  document.getElementById("status").innerText =
    "Connect your Pi Wallet";
}
