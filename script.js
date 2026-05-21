window.addEventListener("load", () => {

  // Check Pi Browser
  if (!window.Pi) {
    alert("Open in Pi Browser ❌");
    return;
  }

  const Pi = window.Pi;

  // Initialize Pi SDK
  Pi.init({ version: "2.0" });

  // Login button
  const btn = document.getElementById("btn");

  if (!btn) {
    alert("Button not found ❌");
    return;
  }

  // LOGIN
  btn.onclick = async () => {

    try {

      const scopes = ['username', 'payments'];

      const auth = await Pi.authenticate(
        scopes,
        onIncompletePaymentFound
      );

      alert("Welcome " + auth.user.username + " 🚀");

      // Update UI after login
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

  };

  // PAYMENT
  window.sendPiPayment = async function () {

    try {

      const paymentData = {
        amount: 0.1,
        memo: "Pi Test Payment",
        metadata: {
          type: "test-payment"
        }
      };

      await Pi.createPayment(paymentData, {

        onReadyForServerApproval(paymentId) {
          console.log("Ready for approval:", paymentId);
        },

        onReadyForServerCompletion(paymentId, txid) {
          console.log("Ready for completion:", paymentId, txid);
        },

        onCancel(paymentId) {
          console.log("Payment cancelled:", paymentId);
        },

        onError(error) {
          console.log("Payment error:", error);
        }

      });

    } catch (err) {

      console.log(err);

    }

  };

  // Required callback
  function onIncompletePaymentFound(payment) {
    console.log("Incomplete payment:", payment);
  }

});
