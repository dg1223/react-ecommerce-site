import { getShoppingCart } from "../utilities/fakedb";

/**
 * The cartProductsLoader function loads the products from the product.json file and returns them as an array of objects
 *
 *
 *
 * @return A promise that resolves with an array of products
 *
 */
const cartProductsLoader = async () => {
  const loadedProducts = await fetch("products.json");
  const products = await loadedProducts.json();
  const savedCart = [];

  // if cart data is in database, you must use async await
  const storedCart = getShoppingCart();
  // console.log(storedCart);
  for (const id in storedCart) {
    const addedProduct = products.find((product) => product.id === id);
    if (addedProduct) {
      const quantity = storedCart[id];
      addedProduct.quantity = quantity;
      // stores the entire product object in an array
      savedCart.push(addedProduct);
    }
  }
  // if you need to return more than 1 item
  /* // option 1: return inside an array
  return [products, savedCart] */

  /*   // option 2: return as an object
  return {products, cart: savedCart} */

  // console.log(savedCart);
  return savedCart;
};

export default cartProductsLoader;
