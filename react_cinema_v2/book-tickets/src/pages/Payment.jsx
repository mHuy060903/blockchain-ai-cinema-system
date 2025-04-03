import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "../../src/components/CheckoutForm";

import Loader from "../components/Loader";
import { useGetPayment } from "../features/payment/useGetPayment";
import { useNavigate } from "react-router-dom";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  "pk_test_51LptRHLjMvOhowgDV8R04P7bq4UV268lolJ7elBc1jTZX3cQifPwK3q5ztkL4gJfU2fhtR2DRRK4RKLEPMURIdBP006t2IDDVL"
);

export default function App() {
  const [clientSecret, setClientSecret] = useState("");
  const { isLoading, isError, data } = useGetPayment();
  const navigate = useNavigate();

  useEffect(() => {
    if (data?.status === "Succeeded") {
      return navigate("/");
    }
  });

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:4242/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cost: 100000 }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return isLoading ? (
    <div className="flex justify-center items-center gap-4 bg-white my-8 px-3 py-4  rounded-lg ">
      <Loader color="blue" size={100} />
    </div>
  ) : (
    <div>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm booking={data} />
        </Elements>
      )}
    </div>
  );
}
