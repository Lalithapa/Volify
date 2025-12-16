import { Button, EmptyState, Card, Text, Layout, BlockStack, TextField, Select, FormLayout } from "@shopify/polaris";
import PageLayout from "../components/shared/pageLayout";
import { useState } from "react";

export default function Discounts() {
  // const { volumeDiscounts } = useLoaderData();
  const [title, setTitle] = useState("");
  const [discountValues, setDiscountValues] = useState([
    {
      title: "Buy one",
      quantity: 1,
      discount: 0,
      discount_type: "percentage",
      discount_message: "",
      subtitle: "Standard price",
      label: "",
      badge: "",
      selected: false,
      label_bg: "#f7f7f7",
      label_color: "#000000",
      badge_bg: "#f55276",
      badge_color: "#ffffff",
    },
    {
      title: "Buy two get discount",
      quantity: 2,
      discount: 10,
      discount_type: "percentage",
      discount_message: "You save 10%",
      subtitle: "You save 10%",
      label: "Most popular",
      badge: "Recommended",
      selected: true,
      label_bg: "#48cae4",
      label_color: "#000000",
      badge_bg: "#0096c7",
      badge_color: "#ffffff",
    },
    {
      title: "Buy three get discount",
      quantity: 3,
      discount: 20,
      discount_type: "percentage",
      discount_message: "You save 20%",
      subtitle: "You save 20%",
      label: "Best value",
      badge: "Special offer",
      selected: false,
      label_bg: "#fbc4ab",
      label_color: "#000000",
      badge_bg: "#f08080",
      badge_color: "#ffffff",
    },
  ]);



  return (
    <PageLayout showBackButton title="Discounts" >
      <s-grid
        gridTemplateColumns="repeat(3, 1fr)"
        gap="large-100"
        justifyContent="center"
      >
        <s-grid-item gridColumn="span 2" >
        <BlockStack gap="400">
          <s-section heading="Basic Settings">
            <BlockStack gap="400">
              <TextField
                label="Discount Title"
                defaultValue="Buy one" value={title} onChange={(value) => setTitle(value)}
              />
              </BlockStack>
          </s-section>
            { discountValues.map((item, index) => (
                <Card key={index} sectioned>
                  <BlockStack gap="200">
                    <Text variant="headingMd" as="h2" fontWeight="semibold">
                      Discount {index + 1}
                    </Text>
                    <BlockStack gap="200">
                       <FormLayout.Group condensed>
                      <TextField
                        label="Title"
                        defaultValue="Buy one" value={item.title} onChange={(value) => {
                          const newDiscountValues = [...discountValues];
                          newDiscountValues[index].title = value;
                          setDiscountValues(newDiscountValues);
                        }}
                      />
                      <TextField
                        label="Quantity"
                        type="number"
                         defaultValue={item.quantity.toString()} value={item.quantity.toString()} onChange={(value) => {
                          const newDiscountValues = [...discountValues];
                          newDiscountValues[index].quantity = parseInt(value);
                          setDiscountValues(newDiscountValues);
                        }}
                      />
                      </FormLayout.Group>
                      <Select
                        label="Discount type"
                        options={[
                          { label: "Percentage", value: "percentage" },
                          { label: "Fixed amount", value: "fixed" },
                        ]}
                      />
                      <TextField
                        label="Discount value"
                        type="number"
                        suffix="%"
                      />
                    </BlockStack>
                  </BlockStack>
                </Card>
            ))}
          </BlockStack>
        </s-grid-item>
        <s-grid-item gridColumn="span 1">
          <Card>
              <Text variant="headingMd" as="h2" fontWeight="semibold" blockAlign="center">
                Discount Name : {title}
              </Text>
          </Card>
        </s-grid-item>
      </s-grid>

    </PageLayout>
  );
}
