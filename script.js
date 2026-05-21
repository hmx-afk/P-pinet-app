                body: JSON.stringify({ paymentId })
              });

              console.log("🟢 Approved sent");

            } catch (err) {
              console.error("❌ Approval error:", err);
            }
          },

          // STEP 2: COMPLETION
          onReadyForServerCompletion: async function (paymentId, txid) {

            console.log("🟡 Completing:", paymentId, txid);

            try {
              await fetch("https://YOUR-BACKEND.com/complete", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ paymentId, txid })
              });

              console.log("🟢 Completed sent");

            } catch (err) {
              console.error("❌ Completion error:", err);
            }
          },

          onCancel: function (paymentId) {
            console.log("⚠️ Cancelled:", paymentId);
            alert("Payment Cancelled");
          },

          onError: function (err) {
            console.error("❌ Payment error:", err);
            alert("Payment Error");
          }
        }
      );

      console.log("🚀 Payment started:", payment);

    } catch (err) {
      console.error("❌ Create payment failed:", err);
    }
  };

});
