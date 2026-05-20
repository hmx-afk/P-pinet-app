let Pi;

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btn");
  const status = document.getElementById("status");

  if (!btn) return;

  status.innerText = "Loading Pi SDK...";

  // Wait for Pi SDK safely
  const checkPi = setInterval(() => {
    if (window.Pi) {
      clearInterval(checkPi);

      Pi = window.Pi;
      Pi.init({ version: "2.0" });

      status.innerText = "Ready ✔️ Click to login";
      setupButton();
    }
  }, 300);

  function setupButton() {
    btn.addEventListener("click", async () => {
      try {
        status.innerText = "Opening wallet...";

        const scopes = ["username", "payments"];

        const auth = await Pi.authenticate(scopes, onIncompletePaymentFound);

        console.log("User:", auth);
        status.innerText = "Login successful ✔️";

        await makePayment();

      } catch (err) {
        console.log(err);
        status.innerText = "Login failed ❌";
      }
    });
  }
});


// REQUIRED by Pi SDK
function onIncompletePaymentFound(payment) {
  console.log("Incomplete payment:", payment);
}


// PAYMENT FUNCTION (CLEAN)
async function makePayment() {
  try {
    const payment = {
      amount: 1,
      memo: "Pi App Journey Payment",
      metadata: { type: "test-payment" }
    };

    const callbacks = {
      onReadyForServerApproval: (paymentId) => {
        console.log("Approval needed:", paymentId);
      },

      onReadyForServerCompletion: (paymentId, txid) => {
        console.log("Completion:", paymentId, txid);
      },

      onCancel: (paymentId) => {
        console.log("Cancelled:", paymentId);
      },

      onError: (error) => {
        console.log("Payment error:", error);
      }
    };

    const result = await Pi.createPayment(payment, callbacks);
    console.log("Payment success:", result);

  } catch (err) {
    console.log("Payment failed:", err);
  }
}
