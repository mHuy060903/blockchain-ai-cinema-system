/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../utils/constant";
import { toast } from "react-toastify";
import { useDeletePayment } from "../features/payment/useDeletePayment";
import { usePaymentSuccess } from "../features/payment/usePaymentSuccess";

export default function CheckoutForm({ booking }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [time, setTime] = useState();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    isLoading: isLoadingDelete,
    isError: isErrorDelete,
    handleDeletePayment,
  } = useDeletePayment();

  const {
    isLoading: isLoadingPaymentSuccess,
    isError: isErrorPaymentSuccess,
    handlePaymentSuccess,
  } = usePaymentSuccess();

  useEffect(() => {
    const dateEnd = new Date(booking.created_at);
    const dateEndPlus5M = new Date(booking.created_at);
    dateEndPlus5M.setMinutes(dateEnd.getMinutes() + 5);
    const interval = setInterval(() => {
      const now = new Date();
      if (now.getTime() >= dateEndPlus5M.getTime()) {
        return handleDeletePayment(undefined, {
          onSuccess: () => {
            toast.error("Het han de thanh toan");
            navigate("/");
          },
        });
      }
      const second = ((dateEndPlus5M.getTime() - now.getTime()) / 1000) % 60;
      const minus = Math.floor(
        (dateEndPlus5M.getTime() - now.getTime()) / 1000 / 60
      );

      setTime(`0${minus} : ${second.toFixed(0).toString().padStart(2, "0")}`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);
    handlePaymentSuccess(undefined, {
      onSuccess: async (data) => {
        const { error } = await stripe.confirmPayment({
          elements,

          confirmParams: {
            // Make sure to change this to your payment completion page
            return_url: `http://localhost:5173/ticket/${data.id}`,
          },
        });

        if (error.type === "card_error" || error.type === "validation_error") {
          setMessage(error.message);
        } else {
          setMessage("An unexpected error occurred.");
        }

        setIsLoading(false);
      },
    });
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <div className="flex flex-col gap-4 bg-white my-8 px-3 py-4  rounded-lg dark:bg-[#1f1f1f]">
      <div className="text-lg font-semibold text-black dark:text-white">
        Book Info:
      </div>
      <div className="flex justify-start items-start gap-5">
        <div className="w-28 ">
          <img
            className="w-full h-full object-cover"
            src={booking?.showtimes.movies.image}
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center  gap-3">
            <h1 className="text-sm text-gray-700 dark:text-white">
              Movie name:
            </h1>
            <span className="font-medium dark:text-gray-200">
              {booking?.showtimes.movies.title}
            </span>
          </div>
          <div className="flex items-center  gap-3">
            <h1 className="text-sm text-gray-700 dark:text-white">
              Seat number:
            </h1>
            <span className="font-medium dark:text-gray-200">
              {booking?.seat_number.join(", ")}
            </span>
          </div>
          <div className="flex items-center  gap-3">
            <h1 className="text-sm text-gray-700 dark:text-white">Cinema:</h1>
            <span className="font-medium dark:text-gray-200">
              {booking?.showtimes.screens.cinemas.name}
            </span>
          </div>
          <div className="flex items-center  gap-3">
            <h1 className="text-sm text-gray-700 dark:text-white">Date:</h1>
            <span className="font-medium dark:text-gray-200">
              {booking?.showtimes.show_date}
            </span>
          </div>
          <div className="flex items-center  gap-3">
            <h1 className="text-sm text-gray-700 dark:text-white">Time:</h1>
            <span className="font-medium dark:text-gray-200">
              {booking?.showtimes.show_time_start.slice(0, -3)}
            </span>
          </div>
        </div>
        <div className=" flex-1 flex justify-center ">
          <div className="bg-yellow-500 w-auto inline-flex items-center flex-col gap-2 p-2 rounded-lg">
            <h3 className="font-semibold">Time to pay</h3>
            <div className="flex items-center">
              <span className="text-red-600 font-medium">{time}</span>
            </div>
          </div>
        </div>
      </div>
      <form
        className=" flex flex-col gap-2"
        id="payment-form"
        onSubmit={handleSubmit}
      >
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <button
          className="w-full bg-[#5469d4] text-white rounded-lg px-3 py-4 cursor-pointer transition-all ease-in hover:bg-blue-700"
          disabled={isLoading || !stripe || !elements}
          id="submit"
        >
          <span className="flex items-center justify-center">
            {isLoading || isLoadingPaymentSuccess ? (
              <Loader size={20} />
            ) : (
              `${formatCurrency(booking?.total_price)} vnđ `
            )}
          </span>
        </button>
        {/* Show any error or success messages */}
        {message && <div className="text-center text-[#697386]">{message}</div>}
      </form>
    </div>
  );
}
