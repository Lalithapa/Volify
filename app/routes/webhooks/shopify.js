// app/routes/webhooks/shopify.ts
import { json } from "@remix-run/node";
import crypto from "crypto";

const SHOPIFY_SECRET = process.env.SHOPIFY_API_SECRET || "";

function verifyShopifyWebhook(rawBody, hmacHeader) {
  // Create Buffer from ArrayBuffer
  const rawBuffer = Buffer.from(rawBody);

  // Compute HMAC-SHA256 and Base64 encode
  const digest = crypto
    .createHmac("sha256", SHOPIFY_SECRET)
    .update(rawBuffer)
    .digest("base64");

  // Timing-safe compare
  try {
    const digestBuf = Buffer.from(digest, "utf8");
    const headerBuf = Buffer.from(hmacHeader, "utf8");
    if (digestBuf.length !== headerBuf.length) return false;
    return crypto.timingSafeEqual(digestBuf, headerBuf);
  } catch {
    return false;
  }
}

export const action = async ({ request }) => {
  // Read raw bytes of request body
  const raw = await request.arrayBuffer();

  const hmacHeader = request.headers.get("x-shopify-hmac-sha256") ?? "";

  if (!verifyShopifyWebhook(raw, hmacHeader)) {
    // invalid signature
    return new Response("Invalid signature", { status: 401 });
  }

  // Verified: parse the payload now
  const text = Buffer.from(raw).toString("utf8");
  let body = null;
  try {
    body = JSON.parse(text);
  } catch (err) {
    // If payload isn't JSON, handle accordingly
    body = text;
  }

  // Process webhook asynchronously if expensive (push to queue / job)
  // Example: handle `orders/create`, `app/uninstalled`, etc.
  // For demo, we just log:
  console.log("Shopify webhook verified. Topic:", request.headers.get("x-shopify-topic"));
  console.log("Payload:", body);

  // Shopify expects a 200-range status quickly
  return json({ ok: true });
};
