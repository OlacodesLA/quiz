import React from "react";
import { Banner as Alert } from "./alert";
import { Banknote } from "lucide-react";

type Props = {};

const Banner = (props: Props) => {
  return (
    <div className="mt-3 mx-6">
      <Alert
        text="You are yet to make payments for"
        icon={<Banknote className="w-4 h-4" />}
        head="Payment"
        className="bg-red-100"
      />
    </div>
  );
};

export default Banner;
