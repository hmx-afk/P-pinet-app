window.addEventListener("load", () => {

  // Check Pi Browser
  if (!window.Pi) {
    alert("Open in Pi Browser ❌");
    return;
  }

  const Pi = window.Pi;

  // Init SDK
  Pi.init({ version: "2.0" });

  // Button
  const btn = document.getElementById("btn");

  // If button missing
  if (!btn) {
    alert("Button missing ❌");
    return;
  }

  // Login click
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
