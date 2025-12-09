import {
  Button,
  Card,
  EmptyState,
} from "@shopify/polaris";
import PageLayout from "../shared/pageLayout";
import { PageTitleBar } from "../shared/pageTitleBar";

export const DiscountPage = () => {

  return (
    <PageLayout showBackButton title="Discount page"
                subtitle="Manage your Discount"
                primaryAction={<Button variant="primary" url='/app/discounts/new'>New Discount</Button>}>
      <PageTitleBar title="Discount page" />
      <Card >
        <EmptyState
        heading="Manage your discount"
        action={{content: 'Add Discount', url: '/app/discounts/new'}}
        secondaryAction={{
            content: 'Learn more',
            url: 'https://help.shopify.com',
        }}
        image="https://cdn.shopify.com/s/files/1/0579/8749/8059/files/create-content.svg?v=1723585472"
        >
        <p>
            Create and discount your contents here. You can add, edit, and delete
            Discount.
        </p>
        </EmptyState>
        </Card>
    </PageLayout>
  );
};
