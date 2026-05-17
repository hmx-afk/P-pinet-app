const Pi = window.Pi;

// Initialize SDK
Pi.init({ version: "2.0" });

// Login button
document.getElementById("btn").addEventListener("click", async () => {
  try {
    const scopes = ['username', 'payments'];

    const auth = await Pi.authenticate(scopes, onIncompletePaymentFound);

    console.log("User:", auth.user);

    alert("Welcome " + auth.user.username + " 🚀");

    // Show user info in UI (optional)
    document.querySelector(".card").innerHTML = `
      <h2>Welcome ${auth.user.username} 👋</h2>
      <p>You are now connected to Pi Wallet</p>
    `;

  } catch (err) {
    console.log(err);
    alert("Login cancelled or failed ❌");
  }
});

// Required callback
function onIncompletePaymentFound(payment) {
  console.log("Incomplete payment:", payment);
}
