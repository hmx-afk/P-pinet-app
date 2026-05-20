document.addEventListener("DOMContentLoaded", () => {

  const btn = document.getElementById("btn");
  const status = document.getElementById("status");

  if (!btn) return;

  // Wait for Pi SDK to be ready
  const waitPi = setInterval(() => {

    if (window.Pi) {
      clearInterval(waitPi);

      const Pi = window.Pi;

      Pi.init({
        version: "2.0",
        sandbox: true
      });

      status.innerText = "Ready ✔️";

      btn.addEventListener("click", async () => {

        try {
          status.innerText = "Opening wallet...";

          const scopes = ["username", "payments"];

          const auth = await Pi.authenticate(
            scopes,
            onIncompletePaymentFound
          );

          console.log("LOGIN SUCCESS:", auth);

          status.innerText = "Login Successful ✔️";

          await makePayment(Pi);

        } catch (err) {
          console.log("AUTH ERROR:", err);
          status.innerText = "Login Failed ❌";
        }

      });

    }

  }, 300);

});


// REQUIRED CALLBACK
function onIncompletePaymentFound(payment) {
  console.log("Incomplete payment found:", payment);
}


// PAYMENT FUNCTION
async function makePayment(Pi) {

  try {

    const payment = {
      amount: 1,
      memo: "Pi App Journey Payment",
      metadata: { type: "test-payment" }
    };

    const callbacks = {

      onReadyForServerApproval: (paymentId) => {
        console.log("Approve:", paymentId);
      },

      onReadyForServerCompletion: (paymentId, txid) => {
        console.log("Complete:", paymentId, txid);
      },

      onCancel: (paymentId) => {
        console.log("Cancelled:", paymentId);
      },

      onError: (err) => {
        console.log("Payment Error:", err);
      }

    };

    const result = await Pi.createPayment(payment, callbacks);

    console.log("PAYMENT SUCCESS:", result);

  } catch (e) {
    console.log("Payment Failed:", e);
  }

}
