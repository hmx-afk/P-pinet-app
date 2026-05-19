document.addEventListener("DOMContentLoaded", () => {

  if (!window.Pi) {
    alert("Open in Pi Browser ❌");
    return;
  }

  Pi.init({ version: "2.0" });

  const btn = document.getElementById("btn");

  if (!btn) {
    alert("Button ID 'btn' not found ❌");
    return;
  }

  btn.addEventListener("click", async () => {

    try {
      const auth = await Pi.authenticate(
        ["username", "payments"],
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

  });

  function onIncompletePaymentFound(payment) {
    console.log(payment);
  }

});
