import { Layout } from "@shopify/polaris";
import { PageTitleBar } from "../shared/pageTitleBar";
import PageLayout from "../shared/pageLayout";

export default function Contents() {
    return (
    <PageLayout>
      <PageTitleBar title="ShipReady App" />
      <Layout>
        Contents page
      </Layout>
    </PageLayout>
  );
};
