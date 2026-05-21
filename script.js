
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
