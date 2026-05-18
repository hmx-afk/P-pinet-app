
document.addEventListener("DOMContentLoaded", () => {

  if (!window.Pi) {
    alert("Open this app in Pi Browser ❌");
    return;
  }

  const Pi = window.Pi;

  Pi.init({ version: "2.0" });

  document.getElementById("btn").addEventListener("click", async () => {

    try {

      const auth = await Pi.authenticate(
        ['username', 'payments'],
        onIncompletePaymentFound
      );

      console.log(auth);

      alert("Welcome " + auth.user.username + " 🚀");

      document.querySelector(".card").innerHTML = `
        <h2>Welcome ${auth.user.username} 👋</h2>
        <p>Wallet Connected Successfully ✅</p>
      `;

    } catch (err) {

      console.log(err);

      alert("Login cancelled or failed ❌");

    }

  });

  function onIncompletePaymentFound(payment) {
    console.log(payment);
  }

});
