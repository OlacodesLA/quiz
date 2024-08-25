import { Button } from "@/components/ui/button";
import React from "react";

type Props = {
  level: string;
  price: number;
  pay: () => void;
  fees: Record<string, number>;
};

const formatFeeName = (feeName: string) => {
  // Assuming feeName is in camelCase
  const words = feeName.split(/(?=[A-Z])/);
  return words.join(" ");
};

const Pricing = ({ level, price, pay, fees }: Props) => {
  const formatAmount = (amount: number) => {
    const formattAmount = new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
    return formattAmount;
  };

  return (
    <div className="p-6 sm:px-8">
      <h2 className="text-lg font-semibold capitalize text-gray-900">
        {/* {level} */}
        {formatFeeName(level)}
        <span className="sr-only">Plan</span>
      </h2>

      <p className="mt-2 text-gray-700">Initiate your journey. Make Payment.</p>

      <p className="mt-2 sm:mt-4">
        <strong className="text-3xl font-bold text-gray-900 sm:text-4xl">
          {" "}
          {formatAmount(price)}
        </strong>

        <span className="text-sm font-medium text-gray-700">/level</span>
      </p>

      <button
        className="mt-4 block rounded border border-slate-900 bg-slate-900 px-12 py-3 text-center text-sm font-medium text-white hover:bg-transparent hover:text-slate-900 focus:outline-none focus:ring active:text-slate-900 sm:mt-6"
        onClick={pay}
      >
        Make Payment
      </button>

      <div className="">
        {/* <ul className="">

      </ul> */}
        <ul className="mt-2 space-y-2 sm:mt-4">
          {Object.entries(fees).map(([feeName, feeAmount]) => (
            <li key={feeName} className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-5 w-5 text-indigo-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
              <span className="text-gray-700 capitalize">
                {formatFeeName(feeName)}: {formatAmount(feeAmount)}
              </span>

              {/* <Button onClick={() => pay()}>Initiate Payment</Button> */}
            </li>
            // <Pricing key={feeName} />
          ))}
          <li></li>
        </ul>
      </div>
    </div>
  );
};

export default Pricing;
