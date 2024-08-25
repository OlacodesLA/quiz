// import { LoginUserType, UserTypes } from "@types";
import $ from "../index";

type ResponsTypes = Promise<{
  error: boolean;
  serverResponse: {
    [key: string]: any;
  };
}>;

export function makePayment(data: any): ResponsTypes {
  return $({
    url: `/api/payment`,
    method: "post",
    data: data,
    headers: {
      Authorization: "Bearer sk_test_dfd3420d808dfbdfdd37deb7460a9a7362b476e5",
    },
  });
}