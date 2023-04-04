/**
 * The cartProductsLoader function loads the products from the product.json file and returns them as an array of objects
 *
 *
 *
 * @return A promise that resolves with an array of products
 *
 */
const cartProductsLoader = async () => {
  const loadedProducts = await fetch("product.json");
  const products = await loadedProducts.json();
  console.log(products);
};

export default cartProductsLoader;
