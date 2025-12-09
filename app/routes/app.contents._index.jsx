import { authenticateExtra } from "../config/shopify.js";
import { json } from "@remix-run/node";
import Contents from "../components/contents/index.jsx";
import { ContentModel } from "../models/content.model.js";

export const loader = async ({ request }) => {
    const { metaobject } = await authenticateExtra(request);

    const url = new URL(request.url);
    const cursor = url.searchParams.get('cursor');
    const limit = 10; // You can adjust this or make it dynamic.
    const contentsObject = await metaobject.list(ContentModel, limit, cursor);

    return json({
        contentsObject
    });
};

export async function action({ request }) {
    const { metaobject } = await authenticateExtra(request);
    let formData = await request.json();

    if(formData.deleteObject){
      await metaobject.delete(formData.objectId);
    }

    return ({
      status: {
        success: true,
        message: "Content deleted successfully",
      }
    });
}

export default function ContentsPage() {
    return <Contents />;
}
// https://plumgoodness.com/checkouts/cn/hWN5HdVu5pzTeJD7yKH8qWW4/en-in?_r=AQABfqbjKuDo7Kcdufq6AbvhNagScUDf_GG8Ttql00FPrDw
// https://plumgoodness.com/checkouts/cn/hWN5HdVu5pzTeJD7yKH8qWW4/en-in/thank-you?_r=AQAB8UaNxnNnF-ZqLp8TELQ6zirkrhxduduMKNScyP-pLvI
