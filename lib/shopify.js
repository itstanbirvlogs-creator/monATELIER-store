const domain = process.env.SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

export async function shopifyFetch(query) {
  const URL = `https://${domain}/api/2023-01/graphql.json`;
  const res = await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
    },
    body: JSON.stringify({ query }),
  });
  return await res.json();
}

export async function getProducts() {
  const res = await shopifyFetch(`
    {
      products(first: 10) {
        edges {
          node {
            id, title, handle,
            priceRange { minVariantPrice { amount } },
            images(first: 1) { edges { node { url } } }
          }
        }
      }
    }
  `);
  return res;
}
