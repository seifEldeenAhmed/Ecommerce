# KOKO&S Website

## Features

1. **Product Listing:**

   - Display a grid of products on the home page, retrieved from the [Fake Store API](https://fakestoreapi.com/products).
   - Each product includes an image, title, price, and a wishlist icon.

2. **Product Detail Page:**

   - Clicking on a product takes the user to a detailed view.
   - Detailed view shows the product image, name, price, description, category, and rating.
   - Users can add the product to their cart.

3. **Related Products:**

   - Display related products on the product detail page based on the category of the current product.
   - Initially, show up to four related products.
   - A "Show More" button allows users to see additional related products.

4. **Responsive Design:**

   - The web application is responsive, adapting to different screen sizes.
   - On larger screens, the product grid has four columns, and the product detail page has a two-column layout.
   - On medium-sized screens (e.g., tablets), the product grid has three columns, and the product detail page adjusts accordingly.
   - On smaller screens (e.g., mobile devices), the product grid has two columns, and the product detail page is optimized for a single-column layout.

5. **Navigation:**

   - Products on the products page are clickable, directing users to the respective product detail page.
   - Users can navigate back to the products page from the product detail page.

6. **Error Handling:**

   - If a product with the specified ID is not found, the application redirects the user to the products page.

7. **Cart Functionality (Not Fully Implemented):**
   - The product detail page includes an "Add to Cart" button.
   - The cart functionality is not fully implemented in the provided code but can be extended for further development.
