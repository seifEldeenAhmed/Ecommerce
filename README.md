# KOKO&S Website

## Demo

Check out the live demo of the project [here](https://drive.google.com/file/d/1QcaD3_-EoTV_lk5lPnedU58WJx3GuEg5/view?usp=sharing).
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

7. **Search by Product Name [Extra Feature]:**

   - Users can search for products by their name using a search bar.
   - Search results are displayed dynamically as users type, providing a seamless search experience.

8. **Add to Cart:**

   - The product detail page includes an "Add to Cart" button.
   - Users can add products to their cart for future purchase.

9. **Filter by Category:**

   - Users can filter products based on their category.
   - This feature helps users narrow down their product search within a specific category.

10. **Category Page:**

    - Clicking on a category directs users to a dedicated category page.
    - The category page displays products exclusively within the selected category.

11. **Logout Restriction:**

    - Users who are not logged in cannot add products to their cart.
    - This ensures that the cart functionality is reserved for registered users.

12. **Top Rated Products on Home Page [Extra Feature]:**

    - The home page includes a section showcasing top-rated products.
    - These products are highlighted based on user ratings for added visibility.

13. **Wishlist [Extra Feature]:**

    - Users can add products to their wishlist for future reference or purchase.
    - The wishlist is accessible from the user's account and provides a personalized shopping experience.

14. **Lazy Loading in Products Page [Extra Feature]:**

    - Products on the product grid are loaded dynamically as the user scrolls down the page.
    - This optimizes page loading times, especially when dealing with a large number of products.
