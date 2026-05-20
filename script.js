document.addEventListener("DOMContentLoaded", () => {

  const btn = document.getElementById("btn");
  const status = document.getElementById("status");

  if (!btn) return;

  let Pi = null;
  let isReady = false;

  // 🚀 SAFE INIT
  function initPi() {

    if (!window.Pi) {
      console.log("Pi not found");
      return false;
    }

    if (isReady) return true;

    Pi = window.Pi;

    try {
      Pi.init({
        version: "2.0"
        // ❌ removed sandbox (IMPORTANT FIX)
      });

      isReady = true;
      console.log("Pi initialized ✔️");

      return true;

    } catch (err) {
      console.log("Init error:", err);
      return false;
    }
  }

  // 🔐 LOGIN
  async function login() {

    if (!Pi || !Pi.authenticate) {
      console.log("Pi authenticate not ready");
      return false;
    }

    try {

      status.innerText = "Opening wallet...";

      const auth = await Pi.authenticate([
        "username",
        "payments"
      ]);

      console.log("LOGIN SUCCESS:", auth);

      status.innerText = "Login Successful ✔️";

      return true;

    } catch (err) {

      console.log("LOGIN ERROR:", err);

      status.innerText = "Login Failed ❌";

      return false;
    }
  }

  // 💰 PAYMENT
  async function makePayment() {

    try {

      const payment = {
        amount: 1,
        memo: "Pi App Journey Payment",
        metadata: { type: "test-payment" }
      };

      const callbacks = {
        onReadyForServerApproval: (id) => console.log("APPROVE:", id),
        onReadyForServerCompletion: (id, txid) => console.log("COMPLETE:", id, txid),
        onCancel: (id) => console.log("CANCEL:", id),
        onError: (err) => console.log("ERROR:", err)
      };

      const result = await Pi.createPayment(payment, callbacks);

      console.log("PAYMENT SUCCESS:", result);

      status.innerText = "Payment Successful ✔️";

    } catch (err) {
      console.log("PAYMENT FAILED:", err);
      status.innerText = "Payment Failed ❌";
    }
  }

  // 🎯 CLICK
  btn.addEventListener("click", async () => {

    const ready = initPi();

    if (!ready) {
      alert("Open in Pi Browser ❌");
      return;
    }

    const loggedIn = await login();

    if (loggedIn) {
      await makePayment();
    }

  });

});
