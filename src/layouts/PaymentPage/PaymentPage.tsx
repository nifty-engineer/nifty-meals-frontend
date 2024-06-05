import { useAuth } from "../../Auth/AuthContext";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PaymentInfoRequest from "../../models/PaymentInfoRequest";
import { SpinnerLoading } from "../Utils/SpinnerLoading";

export const PaymentPage = () => {
  const { authState, isAuthenticated } = useAuth();
  const [numberOfCheckouts] = useState(
    Number(window.localStorage.getItem("numberOfCheckouts"))
  );
  const [httpError, setHttpError] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loadingFees, setLoadingFees] = useState(true);

  useEffect(() => {
    const fetchFees = async () => {
      if (authState && isAuthenticated) {
        const url = `http://localhost:8080/api/payments/search/findByUserEmail?userEmail=${authState.email}`;
        const requestOptions = {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        };
        const paymentResponse = await fetch(url, requestOptions);
        if (!paymentResponse.ok) {
          throw new Error("Something went wrong!");
        }
        const paymentResponseJson = await paymentResponse.json();
        const { payments } = paymentResponseJson._embedded;

        let totalAmountDue = 0;
        for (const payment of payments) {
          totalAmountDue += payment.amount;
        }
        totalAmountDue = Math.round(totalAmountDue * 100) / 100;

        setTotalPrice(totalAmountDue);
        setLoadingFees(false);
      }
    };
    fetchFees().catch((error: any) => {
      setLoadingFees(false);
      setHttpError(error.message);
    });
  }, [authState]);

  const elements = useElements();
  const stripe = useStripe();

  async function checkout() {
    if (!stripe || !elements || !elements.getElement(CardElement)) {
      return;
    }

    setSubmitDisabled(true);

    let paymentInfo = new PaymentInfoRequest(
      Math.round(totalPrice * 100),
      "USD",
      authState?.email
    );

    const url = `http://localhost:8080/api/payment/secure/payment-intent`;
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authState?.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentInfo),
    };
    const stripeResponse = await fetch(url, requestOptions);

    if (!stripeResponse.ok) {
      setHttpError(true);
      setSubmitDisabled(false);
      throw new Error("Something went wrong!");
    }

    const stripeResponseJson = await stripeResponse.json();

    stripe
      .confirmCardPayment(
        stripeResponseJson.client_secret,
        {
          payment_method: {
            card: elements.getElement(CardElement)!,
            billing_details: {
              email: authState?.email,
            },
          },
        },
        { handleActions: false }
      )
      .then(async function (result: any) {
        if (result.error) {
          setSubmitDisabled(false);
          alert("There was an error");
        } else {
          const url = `http://localhost:8080/api/payment/secure/payment-complete`;
          const requestOptions = {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${authState?.token}`,
              "Content-Type": "application/json",
            },
          };
          const stripeResponse = await fetch(url, requestOptions);
          if (!stripeResponse.ok) {
            setHttpError(true);
            setSubmitDisabled(false);
            throw new Error("Something went wrong!");
          }
          setTotalPrice(0);
          setSubmitDisabled(false);
        }
      });
    setHttpError(false);
  }

  if (loadingFees) {
    return <SpinnerLoading />;
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  return (
    <div className="container">
      {numberOfCheckouts >= 3 && totalPrice > 0 && (
        <div className="card mt-3">
          <h5 className="card-header">
            Your Total: <span className="text-danger">${totalPrice}</span>
          </h5>
          <div className="card-body">
            <h5 className="card-title mb-3">Credit Card</h5>
            <CardElement id="card-element" />
            <button
              disabled={submitDisabled}
              type="button"
              className="btn btn-md main-color text-white mt-3"
              onClick={checkout}
            >
              Place Order
            </button>
          </div>
        </div>
      )}

      {numberOfCheckouts >= 3 && totalPrice === 0 && (
        <div className="mt-3">
          <br />
          <h5>You have no scheduled payments.</h5>
          <br />
          <Link type="button" className="btn main-color text-white" to="search">
            Explore top meals
          </Link>
        </div>
      )}

      {numberOfCheckouts < 3 && (
        <div className="mt-3">
          <br />
          <h5>You would need three or more meals to place an order.</h5>
          <br />
          <Link type="button" className="btn main-color text-white" to="search">
            Explore top meals
          </Link>
        </div>
      )}
      {submitDisabled && <SpinnerLoading />}
    </div>
  );
};
