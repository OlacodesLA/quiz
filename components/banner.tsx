import React from "react";
import { Banner as Alert } from "./alert";
import { Banknote, User } from "lucide-react";
import { redirect } from "next/navigation";
import getUser from "@/lib/get-user";
import { getPaymentById, getUserById } from "@/services/profileServices";
import { getKeysWithEmptyValues } from "@/utils/tools";

type Props = {};

const Banner = async (props: Props) => {
  const user = await getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const me = (await getUserById(user.uid)) || {};

  // await getPaymentById(me?.userId, user?.level);

  const keysWithEmptyValues = getKeysWithEmptyValues(me);
  console.log("KEYS", keysWithEmptyValues);
  return (
    <div className="my-3 mx-6 space-y-3">
      {!me?.acceptanceFee ? (
        <Alert
          text={`You are yet to make payments for ${
            me?.acceptanceFee ? null : "Acceptance Fee"
          }`}
          icon={<Banknote size={24} />}
          head="Payment"
          className="bg-red-100 flex justify-between"
          buttonText="Make Payment"
          href="/payment"
        />
      ) : null}
      {keysWithEmptyValues ? (
        <Alert
          text={`You are yet to fill your profile for ${keysWithEmptyValues}.`}
          icon={<User size={24} />}
          head="Profile"
          className="bg-red-100 flex justify-between"
          buttonText="Update"
          href="/profile"
        />
      ) : null}
    </div>
  );
};

export default Banner;
