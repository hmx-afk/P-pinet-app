document.addEventListener("DOMContentLoaded", () => {

  if (!window.Pi) {
    alert("Open in Pi Browser ❌");
    return;
  }

  const Pi = window.Pi;
  Pi.init({ version: "2.0" });

  const btn = document.querySelector("#btn");

  if (!btn) {
    alert("Button missing ❌");
    return;
  }

  btn.addEventListener("click", async () => {

    try {

      const auth = await Pi.authenticate(
        ['username', 'payments'],
        onIncompletePaymentFound
      );

      alert("Welcome " + auth.user.username + " 🚀");

      document.querySelector(".card").innerHTML = `
        <h2>Welcome ${auth.user.username} 👋</h2>
        <p>Wallet Connected Successfully ✅</p>

        <button onclick="sendPiPayment()">
          Send 0.1 Pi 💰
        </button>
      `;

    } catch (err) {
      console.log(err);
      alert("Login failed ❌");
    }

  });

  window.sendPiPayment = async function () {

    try {

      const payment = {
        amount: 0.1,
        memo: "Pi Test Payment",
        metadata: { type: "test" }
      };

      await Pi.createPayment(payment, {
        onReadyForServerApproval: (id) => console.log("Approve:", id),
        onReadyForServerCompletion: (id, txid) => console.log("Complete:", id, txid),
        onCancel: (id) => console.log("Cancelled:", id),
        onError: (err) => console.log(err)
      });

    } catch (err) {
      console.log(err);
    }

  };

  function onIncompletePaymentFound(payment) {
    console.log(payment);
  }

});
