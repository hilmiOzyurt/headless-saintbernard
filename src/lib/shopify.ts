async function shopifyFetch({
  query,
  variables,
}: {
  query: string;
  variables: { [key: string]: string | number | boolean };
}) {
  const endpoint = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  const key = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

  const shopifyApiUrl = `https://${endpoint}/api/2024-07/graphql.json`;

  const headers = new Headers();
  headers.append("X-Shopify-Storefront-Access-Token", key ?? "");
  headers.append("Content-Type", "application/json");

  try {
    const result = await fetch(shopifyApiUrl, {
      method: "POST",
      headers,
      body: JSON.stringify({ query, variables }),
      cache: "no-store",
    });

    return {
      status: result.status,
      body: await result.json(),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      status: 500,
      error: "Error receiving data",
    };
  }
}

export async function getProducts() {
  const query = `
       query {
      products(first: 100) {
        edges {
          node {
            id
            title
            handle
            description
            descriptionHtml
            vendor
            productType
            tags
            createdAt
            updatedAt
            publishedAt
            availableForSale
            onlineStoreUrl
            options(first: 10) {
              id
              name
              values
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
              maxVariantPrice {
                amount
                currencyCode
              }
            }
            compareAtPriceRange {
              minVariantPrice {
                amount
                currencyCode
              }
              maxVariantPrice {
                amount
                currencyCode
              }
            }
            featuredImage {
              id
              url
              altText
              width
              height
            }
            images(first: 10) {
              edges {
                node {
                  id
                  url
                  altText
                  width
                  height
                }
              }
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  sku
                  availableForSale
                  quantityAvailable
                  price {
                    amount
                    currencyCode
                  }
                  compareAtPrice {
                    amount
                    currencyCode
                  }
                  selectedOptions {
                    name
                    value
                  }
                  image {
                    id
                    url
                    altText
                  }
                }
              }
            }
            seo {
              title
              description
            }
          }
        }
      }
    }
  `;

  const variables = { productId: "some-product-id" };

  const response = await shopifyFetch({ query, variables });

  if (response.body.errors) {
    console.error(
      "Shopify API Hatası Detayları:",
      JSON.stringify(response.body.errors, null, 2)
    );

    throw new Error(response.body.errors[0].message);
  }

  return response.body.data.products.edges;
}

export async function getProductByHandle(handle: string) {
  const query = `
    query getProductByHandle($handle: String!) {
      product(handle: $handle) {
        id
        title
        handle
        description
        descriptionHtml
        vendor
        tags
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
             maxVariantPrice {
             amount
             currencyCode
          }
        }
        options {
          id
          name
          values
        }
        featuredImage {
          url
          altText
        }
        images(first: 10) {
          edges {
            node {
              url
              altText
            }
          }
        }
        variants(first: 10) {
          edges {
            node {
              id
              title
              availableForSale
              price {
                amount
                currencyCode
              }
                compareAtPrice {
                amount
                currencyCode
              }
              selectedOptions {
                name
                value
              }
            }
          }
        }
      }
    }
  `;

  const variables = {
    handle: handle,
  };

  const response = await shopifyFetch({ query, variables });

  if (response.body.errors) {
    console.error("Shopify API Hatası:", response.body.errors);
    throw new Error(response.body.errors[0].message);
  }

  return response.body.data.product;
}
