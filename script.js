document.addEventListener("DOMContentLoaded", () => {

  if (!window.Pi) {
    alert("Open this app in Pi Browser ❌");
    return;
  }

  const Pi = window.Pi;
  Pi.init({ version: "2.0" });

  const btn = document.querySelector("#btn");

  if (!btn) {
    alert("Button not found ❌");
    return;
  }

  btn.addEventListener("click", async () => {

    try {

      const auth = await Pi.authenticate(
        ['username', 'payments'],
        onIncompletePaymentFound
      );

      alert("Welcome " + auth.user.username + " 🚀");

    } catch (err) {

      console.log(err);
      alert("Login failed ❌");

    }

  });

  function onIncompletePaymentFound(payment) {
    console.log(payment);
  }

});c+s
