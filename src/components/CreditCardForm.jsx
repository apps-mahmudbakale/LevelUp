import { useState } from "react";
import PaymentIcon from "react-payment-icons";

const CreditCardForm = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCVV] = useState("");
  const [cardType, setCardType] = useState("");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const getCardType = (cardNumber) => {
    // Define regular expressions to identify card types
    const visaPattern = /^4/;
    const mastercardPattern = /^5[1-5]/;
    const amexPattern = /^3[47]/;
    const discoverPattern = /^6(?:011|5)/;

    if (visaPattern.test(cardNumber)) {
      return "visa";
    } else if (mastercardPattern.test(cardNumber)) {
      return "mastercard";
    } else if (amexPattern.test(cardNumber)) {
      return "amex";
    } else if (discoverPattern.test(cardNumber)) {
      return "discover";
    } else {
      return "Unknown";
    }
  };

  const handleCardNumberChange = (e) => {
    const newCardNumber = e.target.value;
    setCardNumber(newCardNumber);
    const cardType = getCardType(newCardNumber);
    setCardType(cardType);
    console.log(cardType);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Make an API request to validate the credit card here
    // You can use the code from the previous answer for making the API request.

    // Get the response from the API
    const response = await fetch("http://localhost:3000/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        card_number: cardNumber,
        cvv: cvv,
        expiry_date: expirationDate,
      }),
    });

    let data = await response.json();
    if (data.success) {
      setErrors({});
      setSuccess("Validation Successful !");
    } else {
      setErrors(data.errors);
      setSuccess("");
    }
    setErrors(data.errors);
    Object.keys(errors).map((error) => console.log(errors[error]));
  };

  return (
    <div>
      <div className="bg-slate-100 flex flex-col items-center justify-center px-6 pt-8 mx-auto md:h-screen pt:mt-0 dark:bg-gray-900">
        <div className="w-full max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow dark:bg-gray-800">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Credit Card Form
          </h2>
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <label
              htmlFor="credit-card"
              className="block text-sm font-medium text-gray-700"
            >
              Credit Card Number
            </label>
            <div className="relative mt-1 rounded-md shadow-sm">
              <input
                type="text"
                id="credit-card"
                value={cardNumber}
                onChange={handleCardNumberChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="1234 5678 9012 3456"
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <PaymentIcon
                  id={cardType}
                  style={{ margin: 10, width: 40 }}
                  className="payment-icon"
                />
              </div>
            </div>
            <div className="flex space-x-4">
              <div className="w-1/2 min-w-0 flex-1">
                <label htmlFor="card-expiration-date" className="sr-only">
                  Expiration date
                </label>
                <input
                  type="text"
                  name="card-expiration-date"
                  value={expirationDate}
                  onChange={(e) => setExpirationDate(e.target.value)}
                  id="card-expiration-date"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="MM / YY"
                />
              </div>
              <div className="min-w-0 flex-1">
                <label htmlFor="card-cvc" className="sr-only">
                  CVC
                </label>
                <input
                  type="text"
                  name="card-cvc"
                  value={cvv}
                  onChange={(e) => setCVV(e.target.value)}
                  id="card-cvc"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="CVC"
                />
              </div>
            </div>
            <button
              type="submit"
              className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Submit
            </button>
          </form>
          {success && (
            <div
              className="bg-green-100 border-t-4 border-green-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
              role="alert"
            >
              <div className="flex">
                <div className="py-1">
                  <svg
                    className="w-6 h-6 text-green-500 dark:text-green-500 mr-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m7 10 2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-bold">{success}</p>
                </div>
              </div>
            </div>
          )}
          {errors && Object.keys(errors).length > 0 && (
            <div
              className="bg-red-100 border-t-4 border-red-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
              role="alert"
            >
              {Object.keys(errors).map((error, index) => (
                <div key={index} className="flex">
                  <div className="py-1">
                    <svg
                      className="fill-current h-6 w-6 text-red-500 mr-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold p-1">{errors[error]}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreditCardForm;
