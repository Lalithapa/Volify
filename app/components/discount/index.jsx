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
        {/* <EmptyState
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
        </EmptyState> */}
    <s-section accessibilityLabel="Empty state section">
        <s-grid gap="base" justifyItems="center" paddingBlock="large-400">
          <s-box maxInlineSize="200px" maxBlockSize="200px">
            {/* aspectRatio should match the actual image dimensions (width/height) */}
            <s-image
              aspectRatio="1/0.5"
              src="https://cdn.shopify.com/static/images/polaris/patterns/callout.png"
              alt="A stylized graphic of four characters, each holding a puzzle piece"
            />
          </s-box>
          <s-grid justifyItems="center" maxInlineSize="450px" gap="base">
            <s-stack alignItems="center">
              <s-heading>Start creating discount</s-heading>
              <s-paragraph>
                Create and manage your collection of discount for players to enjoy.
              </s-paragraph>
            </s-stack>
            <s-button-group>
              <s-button
                slot="secondary-actions"
                aria-label="Learn more about creating discount"
              >
                {" "}
                Learn more{" "}
              </s-button>
              <s-button slot="primary-action" aria-label="Add a new puzzle" href="/app/discounts/new">
                {" "}
                New Discount{" "}
              </s-button>
            </s-button-group>
          </s-grid>
        </s-grid>
      </s-section>
        </Card>
    </PageLayout>
  );
};
