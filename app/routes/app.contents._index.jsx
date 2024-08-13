import { authenticateExtra } from "../config/shopify.js";
import { json } from "@remix-run/node";
import Contents from "../components/contents/index.jsx";

export const loader = async ({ request }) => {
    const { admin } = await authenticateExtra(request);
    return json({});
};

export default function ContentsPage() {
    return <Contents />;
}