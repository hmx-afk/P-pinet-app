document.addEventListener("DOMContentLoaded", () => {

  const btn = document.getElementById("btn");
  const status = document.getElementById("status");

  if (!btn || !status) return;

  let Pi;
  let isReady = false;

  // 🔒 Disable button until SDK ready
  btn.disabled = true;
  status.innerText = "Loading Pi SDK...";

  // 🚀 Initialize Pi SDK
  async function initPi() {

    if (!window.Pi) {
      status.innerText = "Open in Pi Browser ❌";
      return false;
    }

    if (isReady) return true;

    try {

      Pi = window.Pi;

      await Pi.init({
        version: "2.0"
      });

      isReady = true;

      console.log("Pi initialized ✔️");

      status.innerText = "Ready ✔️";

      btn.disabled = false;

      return true;

    } catch (err) {

      console.log("Pi init error:", err);

      status.innerText = "Pi SDK Failed ❌";

      return false;
    }
  }

  // 🔐 Wallet Login
  async function login() {

    try {

      status.innerText = "Opening wallet...";

      const auth = await Pi.authenticate([
        "username",
        "payments"
      ]);

      console.log("LOGIN SUCCESS:", auth);

      status.innerText = `Welcome ${auth.user.username} ✔️`;

      return true;

    } catch (err) {

      console.log("LOGIN ERROR:", err);

      status.innerText = "Login Failed ❌";

      return false;
    }
  }

  // 🚀 Start app
  initPi();

  // 🎯 Button Click
  btn.addEventListener("click", async () => {

    // Prevent double click
    btn.disabled = true;

    const loggedIn = await login();

    if (loggedIn) {

      console.log("Wallet connected successfully");

    }

    // Re-enable button
    btn.disabled = false;

  });

});
