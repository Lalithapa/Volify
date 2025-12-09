import { json } from "@remix-run/react";
import { DiscountPage } from "../components/discount";
import { authenticate } from "../config/shopify";

export const loader = async ({ request }) => {
  const { admin } = await authenticate.admin(request);
  return json({});
};

export const action = async ({ request }) => {
  // todo handle the action only if needed!
};

export default function FaqPage() {
  return <DiscountPage />;
}
