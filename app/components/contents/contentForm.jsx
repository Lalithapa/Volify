import {
  Card,
  TextField,
  BlockStack,
  FormLayout,
  Button,
  Text,
  Layout,
  InlineStack,
  Select,
  Checkbox,
  AppProvider as PolarisAppProvider,
} from "@shopify/polaris";
import { useCallback, useState, useEffect } from "react";
import PageLayout from "../shared/pageLayout";
import ShipReadyProductSelector from "../shared/shipReadyProductSelector";
import ShipReadyColorPicker from "../shared/shipReadyColorPicker";
import ShipReadyDatePicker from "../shared/shipReadyDatePicker";

import { Form, useSubmit, useLoaderData } from "@remix-run/react";

export const ContentForm = ({ isEditing = false }) => {
  const submit = useSubmit();
  const loaderData = useLoaderData();

  const [title, setTitle] = useState("");
  const [products, setProducts] = useState([]);
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("#000000");
  const [status, setStatus] = useState("draft");
  const [publishAt, setPublishAt] = useState("");

  useEffect(() => {
    if (isEditing && loaderData) {
      setTitle(loaderData.title || "");
      setProducts(loaderData.products || []);
    }
  }, [isEditing, loaderData]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      title,
      products,
      created_at: isEditing ? loaderData.created_at : new Date().toISOString(),
      [isEditing ? "updateObject" : "createObject"]: true,
    };

    if (isEditing) {
      data.id = loaderData.id; // Include the discount ID when updating
    }

    await submit(data, { method: "POST", encType: "application/json" });
  };

  return (
    <PageLayout
      showBackButton
      title={isEditing ? "Edit Content" : "New Content"}
    >
      <Form
        method="POST"
        data-save-bar
        data-discard-confirmation
        onSubmit={handleSubmit}
        onReset={() => {}}
      >
        <Layout>
          <Layout.Section>
            <BlockStack gap="500">
              <Card sectioned>
                <FormLayout>
                  <TextField
                    name="title"
                    label="Title"
                    value={title}
                    onChange={setTitle}
                  />

                  <TextField
                    name="description"
                    label="Description"
                    value={description}
                    onChange={setDescription}
                    multiline={5}
                  />

                  <ShipReadyProductSelector
                    title="Select Content Products"
                    subtitle="Choose the products that will be part of this campaign"
                    products={products}
                    setProducts={setProducts}
                    multiple={true}
                  />
                </FormLayout>
              </Card>
            </BlockStack>
          </Layout.Section>

          {/* Sidebar */}
          <Layout.Section variant="oneThird">
            <Card>
              <BlockStack gap="500">
                <Select
                  label="Status"
                  options={[
                    { label: "Draft", value: "draft" },
                    { label: "Published", value: "published" },
                  ]}
                  onChange={setStatus}
                  value={status}
                />
                <ShipReadyDatePicker
                  date={publishAt}
                  setDate={setPublishAt}
                  label="Publish at"
                />
                <ShipReadyColorPicker color={color} setColor={setColor} />
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>
      </Form>
    </PageLayout>
  );
};

export default ContentForm;
