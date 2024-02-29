# Shopify Theme Update 2024 Winter Edition ❄️

## Description
Shopify Winter Editions 2024 bring a fresh wave of innovation and style to the e-commerce platform. Explore new features, designs, and enhancements that empower businesses to thrive in the digital landscape.✨

_Some of the key enhancements:_
- Nested Blocks: Up to eight layers deep nesting for flexible theme customization.
- Reuse Theme Blocks: Defining blocks once and reusing them across sections.

- **Reference Theme**: Check out Shopify's [Reference Theme](https://github.com/Shopify/reference-theme/tree/main) 

## Shopify Winter Editions 2024: Theme Features Setup

To leverage the new features introduced in the Winter Editions of Shopify, follow these steps:

**Create a Development Store with Theme Blocks Preview:**
   - Ensure that you have a development store set up with the Theme Blocks preview enabled. This is crucial for testing and using the updated features.
   
      ![image](https://github.com/dear-digital/shopify-theme-skeleton/assets/70633140/dfcd0108-6603-493b-9e53-305b22dcc4b7)
     
       - The `github-task-store` won't support updated features ❌
       - The `winter edition store` will support updated features ✅
 
   - Also, [documentation](https://shopify.dev/docs/themes/architecture/blocks/theme-blocks) displays such warning!
     ![image](https://github.com/dear-digital/shopify-theme-skeleton/assets/70633140/b7911c33-7be1-4485-b2a3-891f698f7077)

## Error Handling

If your store doesn't have the Development selected option as Theme Blocks preview, you may encounter errors. Common issues and error messages include:

- **New Folder Structure:** The new folder structure, such as creating a 'blocks' folder in the root directory, might not be supported.

   Example Errors:
   
   > 14:57:34 ERROR  » update sections/dev__winter.liquid:
   Liquid syntax error (line 1): Unknown tag 'content_for'
   
   > ERROR  » update blocks/text.liquid:
   404

## Resources 

- **Theme Blocks** - [View Documentation](https://shopify.dev/docs/themes/architecture/blocks/theme-blocks)
  - Theme blocks are blocks that are defined at the theme level which can be reused across different sections.
- **Shopify CLI** - [Learn More](https://shopify.dev/docs/themes/tools/cli)
  - Use Shopify CLI to run and test your theme locally, streamlining development and debugging.
- **Shopify Theme Documentation** - [Getting Started](https://shopify.dev/docs/themes/getting-started)
  - This is the most important documentation for understanding the basics of Shopify theme development.

---
🚀 Happy Coding! 🚀
