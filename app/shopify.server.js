import "@shopify/shopify-app-remix/adapters/node";
import {
  AppDistribution,
  DeliveryMethod,
  shopifyApp,
  LATEST_API_VERSION,
} from "@shopify/shopify-app-remix/server";
import { PrismaSessionStorage } from "@shopify/shopify-app-session-storage-prisma";
import { restResources } from "@shopify/shopify-api/rest/admin/2024-01";
import prisma from "./db.server";




const shopify = shopifyApp({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET || "",
  apiVersion: LATEST_API_VERSION,
  scopes: process.env.SCOPES?.split(","),
  appUrl: process.env.SHOPIFY_APP_URL || "",
  authPathPrefix: "/auth",
  sessionStorage: new PrismaSessionStorage(prisma),
  distribution: AppDistribution.AppStore,
  restResources,
  webhooks: {
    APP_UNINSTALLED: {
      deliveryMethod: DeliveryMethod.Http,
      callbackUrl: "/webhooks",
    },
  },
  hooks: {
    afterAuth: async ({ session }) => {
      shopify.registerWebhooks({ session });
      
      // Define script tag options
        const scriptTagOptions = {
          event: 'onload',
          src: 'https://scsportfolio.com/js/test-schmea.js',
          display_scope: 'all'
        };

      fetch('https://quickstart-5a5be50d.myshopify.com/admin/api/2024-01/script_tags.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': session?.accessToken
        },
        body: JSON.stringify({ script_tag: scriptTagOptions })
      })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
      
    },
  },
  future: {
    v3_webhookAdminContext: true,
    v3_authenticatePublic: true,
  },
  ...(process.env.SHOP_CUSTOM_DOMAIN
    ? { customShopDomains: [process.env.SHOP_CUSTOM_DOMAIN] }
    : {}),
});




export default shopify;
export const apiVersion = LATEST_API_VERSION;
export const addDocumentResponseHeaders = shopify.addDocumentResponseHeaders;
export const authenticate = shopify.authenticate;
export const unauthenticated = shopify.unauthenticated;
export const login = shopify.login;
export const registerWebhooks = shopify.registerWebhooks;
export const sessionStorage = shopify.sessionStorage;
