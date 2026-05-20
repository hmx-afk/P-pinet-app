document.addEventListener("DOMContentLoaded", () => {

  const btn = document.getElementById("btn");
  const status = document.getElementById("status");

  if (!btn) return;

  let Pi = null;
  let isPiReady = false;

  // 🚀 INIT PI ONCE ONLY
  function initPi() {

    if (!window.Pi) {
      return false;
    }

    if (isPiReady) return true;

    Pi = window.Pi;

    try {
      Pi.init({
        version: "2.0",
        sandbox: true
      });

      isPiReady = true;
      console.log("Pi initialized ✔️");

      return true;

    } catch (err) {
      console.log("Pi init error:", err);
      return false;
    }
  }

  // 💰 PAYMENT FLOW
  async function makePayment() {

    try {

      const payment = {
        amount: 1,
        memo: "Pi App Journey Payment",
        metadata: { type: "test-payment" }
      };

      const callbacks = {
        onReadyForServerApproval: (id) => {
          console.log("APPROVE:", id);
        },
        onReadyForServerCompletion: (id, txid) => {
          console.log("COMPLETE:", id, txid);
        },
        onCancel: (id) => {
          console.log("CANCELLED:", id);
        },
        onError: (err) => {
          console.log("PAYMENT ERROR:", err);
        }
      };

      const result = await Pi.createPayment(payment, callbacks);

      console.log("PAYMENT SUCCESS:", result);
      status.innerText = "Payment Successful ✔️";

    } catch (err) {
      console.log("Payment failed:", err);
      status.innerText = "Payment Failed ❌";
    }
  }

  // 🔐 LOGIN FLOW
  async function login() {

    try {

      status.innerText = "Opening wallet...";

      const auth = await Pi.authenticate(
        ["username", "payments"]
      );

      console.log("LOGIN SUCCESS:", auth);

      status.innerText = "Login Successful ✔️";

      return true;

    } catch (err) {

      console.log("LOGIN ERROR:", err);

      status.innerText = "Login Failed ❌";

      return false;
    }
  }

  // 🎯 CLICK HANDLER
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
