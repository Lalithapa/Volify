export const ContentModel = {
    name: "Content",
    type: "$app:content",
    access: {
        admin: "MERCHANT_READ_WRITE",
        storefront: "PUBLIC_READ",
    },
    fieldDefinitions: [
        {
            name: "Title",
            key: "title",
            type: "single_line_text_field",
        },
        {
            name: "Content Description",
            key: "contentDescription",
            type: "rich_text_field",
        },
        {
            name: "Products reference",
            key: "products_reference",
            type: "list.variant_reference"
        },
        {
            name: "Color",
            key: "color",
            type: "color"
        },
        {
            name: "Status",
            key: "status",
            type: "boolean"
        },
        {
            name: "createdAt",
            key: "createdAt",
            type: "date_time"
        }

    ],
};

// List of data types : https://shopify.dev/docs/apps/build/custom-data/metafields/list-of-data-types#supported-types
