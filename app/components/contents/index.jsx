import { Layout, Button } from "@shopify/polaris";
import { useLoaderData } from "@remix-run/react";
import { PageTitleBar } from "../shared/pageTitleBar";
import PageLayout from "../shared/pageLayout";
import ShipReadyTable from "../shared/shipReadyTable";

export default function Contents() {
    const { contentsObject } = useLoaderData();

    const headings = [
        { title: 'Title' },
        { title: 'Status' },
        { title: 'Created At' },
        { title: 'Actions' },
      ];

    return (
        <PageLayout 
            showBackButton 
            title="Contents" 
            subtitle="Manage your content: Example of how you can use Shipready metaobjects"
            primaryAction={<Button variant="primary" url='/app/contents/new'>New content</Button>}>
            <PageTitleBar title="Discounts" />
  
            {contentsObject?.nodes?.length < 1 ? (
            <Card>
                <EmptyState
                heading="Manage your contents"
                action={{content: 'Add content', url: '/app/discounts/new'}}
                secondaryAction={{
                    content: 'Learn more',
                    url: 'https://help.shopify.com',
                }}
                image="https://cdn.shopify.com/b/shopify-guidance-dashboard-public/m66z0a57ues1gygrane8proz6gqn.svgz"
                >
                <p>
                    Create discounts for your products and collections.
                </p>
                </EmptyState>
            </Card>
            ) : (
            <ShipReadyTable
                data={contentsObject}
                resourceName={{ singular: 'Content', plural: 'Contents', handle: 'contents' }}
                selectable={false}
                headings={headings}
                pagination={true}
                actions={true}
            />
            )}
        </PageLayout>
  );
};
