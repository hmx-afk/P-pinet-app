window.addEventListener("load", () => {

  // Check Pi Browser
  if (!window.Pi) {
    alert("Open in Pi Browser ❌");
    return;
  }

  const Pi = window.Pi;

  // Initialize SDK
  Pi.init({ version: "2.0" });

  // Get button
  const btn = document.getElementById("btn");

  // Button click
  btn.onclick = async () => {

    try {

      const scopes = ['username', 'payments'];

      const auth = await Pi.authenticate(
        scopes,
        onIncompletePaymentFound
      );

      alert("Welcome " + auth.user.username + " 🚀");

      document.querySelector(".card").innerHTML = `
        <h2>Welcome ${auth.user.username} 👋</h2>
        <p>Wallet Connected Successfully ✅</p>
      `;

    } catch (err) {

      console.log(err);

      alert("Login failed ❌");

    }

  };

  // Required callback
  function onIncompletePaymentFound(payment) {
    console.log(payment);
  }

});
