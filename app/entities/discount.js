export class Discount {
    constructor(admin) {
      this.admin = admin;
    }
  
    async createAutomatic({
      title,
      functionId,
      startsAt = new Date(),
      endsAt = null,
      metafields = [],
      combinesWith = {
        orderDiscounts: false,
        productDiscounts: false,
        shippingDiscounts: false
      }
    }) {
      const mutation = `#graphql
        mutation CreateAutomaticDiscount($discount: DiscountAutomaticAppInput!) {
          discountCreate: discountAutomaticAppCreate(automaticAppDiscount: $discount) {
            automaticAppDiscount {
              discountId
            }
            userErrors {
              code
              message
              field
            }
          }
        }`;
  
      const variables = {
        discount: {
          title,
          functionId,
          combinesWith,
          startsAt,
          endsAt,
          metafields
        },
      };
  
      const response = await this.admin.graphql(mutation, { variables });
      const { data: { discountCreate } } = await response.json();
      return discountCreate;
    }
  
    async updateAutomatic({
      id,
      title,
      startsAt,
      endsAt = null,
      metafields = [],
      combinesWith = {
        orderDiscounts: false,
        productDiscounts: false,
        shippingDiscounts: false
      }
    }) {
      const mutation = `#graphql
        mutation discountAutomaticAppUpdate($automaticAppDiscount: DiscountAutomaticAppInput!, $id: ID!) {
          discountAutomaticAppUpdate(automaticAppDiscount: $automaticAppDiscount, id: $id) {
            automaticAppDiscount {
              discountId
              title
              startsAt
              endsAt
              status
              appDiscountType {
                appKey
                functionId
              }
              combinesWith {
                orderDiscounts
                productDiscounts
                shippingDiscounts
              }
            }
            userErrors {
              code
              field
              message
            }
          }
        }`;
  
      const variables = {
        id,
        automaticAppDiscount: {
          title,
          combinesWith,
          startsAt,
          endsAt,
          metafields
        }
      };
  
      const response = await this.admin.graphql(mutation, { variables });
      const { data: { discountAutomaticAppUpdate } } = await response.json();
      return discountAutomaticAppUpdate;
    }
  
    async deactivateAutomatic(automaticDiscountId) {
      const mutation = `#graphql
        mutation discountAutomaticDeactivate($id: ID!) {
          discountAutomaticDeactivate(id: $id) {
            automaticDiscountNode {
              automaticDiscount {
                ... on DiscountAutomaticBxgy {
                  status
                  startsAt
                  endsAt
                }
              }
            }
            userErrors {
              field
              message
            }
          }
        }`;
  
      const variables = { id: automaticDiscountId };
      const response = await this.admin.graphql(mutation, { variables });
      const { data: { discountAutomaticDeactivate } } = await response.json();
      return discountAutomaticDeactivate;
    }
  
    async activateAutomatic(automaticDiscountId) {
      const mutation = `#graphql
        mutation discountAutomaticActivate($id: ID!) {
          discountAutomaticActivate(id: $id) {
            automaticDiscountNode {
              automaticDiscount {
                ... on DiscountAutomaticBxgy {
                  status
                  startsAt
                  endsAt
                }
              }
            }
            userErrors {
              field
              message
            }
          }
        }`;
  
      const variables = { id: automaticDiscountId };
      const response = await this.admin.graphql(mutation, { variables });
      const { data: { discountAutomaticActivate } } = await response.json();
      return discountAutomaticActivate;
    }
  
    async deleteAutomatic(automaticDiscountId) {
      const mutation = `#graphql
        mutation discountAutomaticDelete($id: ID!) {
          discountAutomaticDelete(id: $id) {
            deletedAutomaticDiscountId
            userErrors {
              field
              code
              message
            }
          }
        }`;
  
      const variables = { id: automaticDiscountId };
      const response = await this.admin.graphql(mutation, { variables });
      const { data: { discountAutomaticDelete } } = await response.json();
      return discountAutomaticDelete;
    }
  
    async queryAutomaticDiscounts() {
      const query = `#graphql
        {
          discountNodes(first: 10) {
            edges {
              node {
                id
                discount {
                  __typename
                  ... on DiscountAutomaticApp {
                    status
                    title
                  }
                }
              }
            }
          }
        }`;
  
      const response = await this.admin.graphql(query);
      const { data: { discountNodes: { edges } } } = await response.json();
      return edges;
    }
  
    async setAutomaticMetafields(discountId, data) {
      const mutation = `#graphql
        mutation MetafieldsSet($metafields: [MetafieldsSetInput!]!) {
          metafieldsSet(metafields: $metafields) {
            metafields {
              key
              namespace
              value
              createdAt
              updatedAt
            }
            userErrors {
              field
              message
              code
            }
          }
        }`;
  
      const variables = {
        metafields: [
          {
            key: "function-configuration",
            namespace: "discount",
            ownerId: discountId,
            value: JSON.stringify(data),
            type: "json"
          }
        ]
      };
  
      const response = await this.admin.graphql(mutation, { variables });
      return await response.json();
    }
  
    async getAutomaticWithMetafield(id, metafieldKey, metafieldNamespace) {
      const query = `#graphql
        query {
          automaticDiscountNode(id: "${id}") {
            id
            metafield(key: "${metafieldKey}", namespace: "${metafieldNamespace}") {
              id
              value
            }
          }
        }`;
  
      const response = await this.admin.graphql(query);
      const { data: { automaticDiscountNode } } = await response.json();
      return automaticDiscountNode;
    }
  
    async createCode({
      appliesOncePerCustomer,
      title,
      code,
      usageLimit,
      functionId,
      startsAt = new Date(),
      endsAt = null,
      metafields = [],
      combinesWith = {
        orderDiscounts: false,
        productDiscounts: false,
        shippingDiscounts: false
      }
    }) {
      const mutation = `#graphql
        mutation discountCodeAppCreate($codeAppDiscount: DiscountCodeAppInput!) {
          discountCreate: discountCodeAppCreate(codeAppDiscount: $codeAppDiscount) {
            codeAppDiscount {
              discountId
            }
            userErrors {
              field
              message
            }
          }
        }`;
  
      const variables = {
        codeAppDiscount: {
          title,
          functionId,
          combinesWith,
          startsAt,
          endsAt,
          metafields,
          appliesOncePerCustomer,
          code,
          usageLimit
        },
      };
  
      const response = await this.admin.graphql(mutation, { variables });
      const { data: { discountCreate } } = await response.json();
      return discountCreate;
    }
  
    async getCodeWithMetafield(id, metafieldKey, metafieldNamespace) {
      const query = `#graphql
        query {
          codeDiscountNode(id: "${id}") {
            id
            metafield(key: "${metafieldKey}", namespace: "${metafieldNamespace}") {
              id
              value
            }
          }
        }`;
  
      const response = await this.admin.graphql(query);
      const { data: { codeDiscountNode } } = await response.json();
      return codeDiscountNode;
    }
  
    async updateCode({
      id,
      title,
      appliesOncePerCustomer,
      code,
      usageLimit,
      startsAt,
      endsAt = null,
      metafields = [],
      combinesWith = {
        orderDiscounts: false,
        productDiscounts: false,
        shippingDiscounts: false
      }
    }) {
      const mutation = `#graphql
        mutation discountCodeAppUpdate($codeAppDiscount: DiscountCodeAppInput!, $id: ID!) {
          discountCodeAppUpdate(codeAppDiscount: $codeAppDiscount, id: $id) {
            codeAppDiscount {
              discountId
            }
            userErrors {
              field
              message
            }
          }
        }`;
  
      const variables = {
        id,
        codeAppDiscount: {
          title,
          combinesWith,
          startsAt,
          endsAt,
          metafields,
          appliesOncePerCustomer,
          code,
          usageLimit
        }
      };
  
      const response = await this.admin.graphql(mutation, { variables });
      const { data: { discountCodeAppUpdate } } = await response.json();
      return discountCodeAppUpdate;
    }
  
    async deleteCode(discountId) {
      const mutation = `#graphql
        mutation discountCodeDelete($id: ID!) {
          discountCodeDelete(id: $id) {
            deletedCodeDiscountId
            userErrors {
              field
              message
            }
          }
        }`;
  
      const variables = { id: discountId };
      const response = await this.admin.graphql(mutation, { variables });
      const { data: { discountCodeDelete } } = await response.json();
      return discountCodeDelete;
    }
  
    async deactivateCode(discountId) {
      const mutation = `#graphql
        mutation discountCodeDeactivate($id: ID!) {
          discountCodeDeactivate(id: $id) {
            codeDiscountNode {
              id
            }
            userErrors {
              field
              message
            }
          }
        }`;
  
      const variables = { id: discountId };
      const response = await this.admin.graphql(mutation, { variables });
      const { data: { discountCodeDeactivate } } = await response.json();
      return discountCodeDeactivate;
    }
  
    async activateCode(discountId) {
      const mutation = `#graphql
        mutation discountCodeActivate($id: ID!) {
          discountCodeActivate(id: $id) {
            codeDiscountNode {
              id
            }
            userErrors {
              field
              message
            }
          }
        }`;
  
      const variables = { id: discountId };
      const response = await this.admin.graphql(mutation, { variables });
      const { data: { discountCodeActivate } } = await response.json();
      return discountCodeActivate;
    }
  }