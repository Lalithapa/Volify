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

export default function ContentsPage() {
    return <Contents />;
}