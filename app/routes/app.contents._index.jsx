import { authenticateExtra } from "../config/shopify.js";
import { json } from "@remix-run/node";
import Contents from "../components/contents/index.jsx";
import appConfig from "../config/app.js";

export const loader = async ({ request }) => {
    const { admin } = await authenticateExtra(request);
    return json({});
};

export default function ContentsPage() {
    return <Contents />;
}