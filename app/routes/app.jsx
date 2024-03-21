import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData, useRouteError } from "@remix-run/react";
import polarisStyles from "@shopify/polaris/build/esm/styles.css";
import { boundary } from "@shopify/shopify-app-remix/server";
import { AppProvider } from "@shopify/shopify-app-remix/react";
import { authenticate } from "../shopify.server";
import { error } from "console";

export const links = () => [{ rel: "stylesheet", href: polarisStyles }];

export const loader = async ({ request }) => {
  await authenticate.admin(request);

  return json({ apiKey: process.env.SHOPIFY_API_KEY || "" });
};

export default function App() {
  const { apiKey } = useLoaderData();

  return (
    <AppProvider isEmbeddedApp apiKey={apiKey}>
      <ui-nav-menu>
        <Link to="/app" rel="home">
          Home
        </Link>
        <Link to="/app/additional">Additional page</Link>
      </ui-nav-menu>
      <Outlet />
    </AppProvider>
  );
}

const axios = require('axios');
// Shopify API credentials and shop URL
const shopUrl = 'https://quickstart-5a5be50d.myshopify.com';
const apiKey = '3b107af0289e08f31d90519e4c0ef68d';
const passwordsec = '555505b3386ed8a0839a3f9414312114';
// Function to add a script tag
async function addScriptTag() {
  try {
    // Create a script tag data
    const scriptTagData = {
      script_tag: {
        event: 'onload',
        src: 'http://scsportfolio.com/js/your-script.js',
        display_scope: 'all'
      }
    };
    const headers= {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': 'shpua_4cf84117537c7c8f1da715dac585873b'
    }
    
    // API endpoint for script tags
    const endpoint = `${shopUrl}/admin/api/2024-01/script_tags.json`;
    // Make the API request
    const response = await axios.post(endpoint, scriptTagData, {
    headers   
    });
    // Check if the request was successful
    if (response.status === 201) {
      console.log('Script tag added successfully.');
    } else {
      console.error('Failed to add script tag. Status code:', response.status);
      console.error('Error:', response.data);
    }
  } catch (error) {
    console.error('Error adding script tag:', error.message);
  }
}
// Call the function to add script tag
//addScriptTag();



/*

fetch('https://quickstart-5a5be50d.myshopify.com/admin/api/2024-01/script_tags.json', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Shopify-Access-Token': 'shpua_923ac62bd259fda11a3af68d6518d5b6'
  },
  body: JSON.stringify({
    "script_tag": {
      "event": "onload",
      "src": 'https://scsportfolio.com/js/test-schmea.js',
      "display_scope": 'all'
    }
  })
}).then((result)=>{console.log("Fetch method result",result)}).catch((error)=>{console.log("Error fetch",error)})
*/

// Shopify needs Remix to catch some thrown responses, so that their headers are included in the response.
export function ErrorBoundary() {
  return boundary.error(useRouteError());
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
