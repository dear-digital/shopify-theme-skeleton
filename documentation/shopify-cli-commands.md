## Shopify CLI Setup for Theme Development 

#### [Shopify CLI Docs](https://shopify.dev/docs/apps/tools/cli)

1. **Install Shopify CLI 3.x:**
   - Run the following commands to install the required Shopify CLI version:
   
     ```bash
     npm install -g @shopify/cli @shopify/theme
     ```

2. **Login to Your Shopify Store:**
   - Use the following command to log in to your Shopify store:
   
     ```bash
     shopify theme list -s your-store-name
     ```

3. **Run the Shopify Development Environment:**
   - Initiate the Shopify development environment with the following command:
   
     ```bash
     shopify theme dev
     ```

4. **Logout from Your Store:**
   - To logout from your store:
   
     ```bash
     shopify auth logout
     ```

#### [View More Commands](https://shopify.dev/docs/apps/tools/cli/commands)

_Note: These commands only works for CLI_