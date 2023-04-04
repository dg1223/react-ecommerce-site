import React, { useEffect, useState } from "react";
import {
  addToDb,
  deleteShoppingCart,
  getShoppingCart,
} from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";
import { Link } from "react-router-dom";

const Shop = () => {
  // load data and store it in a state
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  // Handle side effect: loading data from outside is a side effect
  useEffect(() => {
    fetch("products.json")
      .then((res) => res.json())
      // get an array of objects (products)
      .then((data) => setProducts(data));
  }, []);

  useEffect(() => {
    const storedCart = getShoppingCart();
    const savedCart = [];
    // step 1: Get ID of the added / stored product
    // for...in: on object; for...of: on array (of objects)
    for (const id in storedCart) {
      // step 2: Get product from products state by using ID
      // an object
      const addedProduct = products.find((product) => product.id === id);
      // if product is found in local storage (shopping cart)
      if (addedProduct) {
        // step 3: Add quantity
        // get quantity from local storage
        const quantity = storedCart[id];
        // update quantity of the product object stored as addedProduct
        addedProduct.quantity = quantity;
        // step 4: add the added product to the saved cart
        savedCart.push(addedProduct);
      }
      // console.log("added Product: ", addedProduct);
    }
    // step 5: set the cart
    setCart(savedCart);
    /* Since hooks are asynchronous, we get the default value of
    at first, which is an empty array. The product will get
    loaded a little later. As a result, if we use empty array
    [] as useEffect's dependency, we won't see the product. So,
    we need to use 'products' as the dependency so see the
    actual products after their values are loaded. */
  }, [products]);

  const handleAddToCart = (product) => {
    let newCart = [];
    // const newCart = [...cart, product];
    // if product doesn't exist in the cart, then set quantity = 1
    // if product exists, update quantity by 1
    const exists = cart.find((pd) => pd.id === product.id);
    if (!exists) {
      product.quantity = 1;
      newCart = [...cart, product];
    } else {
      exists.quantity = exists.quantity + 1;
      const remaining = cart.filter((pd) => pd.id !== product.id);
      newCart = [...remaining, exists];
    }

    setCart(newCart);
    addToDb(product.id);
  };

  const handleClearCart = () => {
    setCart([]);
    deleteShoppingCart();
  };

  return (
    <div className="shop-container">
      <div className="products-container">
        {products.map((product) => (
          <Product
            key={product.id}
            product={product}
            handleAddToCart={handleAddToCart}
          ></Product>
        ))}
      </div>
      <div className="cart-container">
        <Cart cart={cart} handleClearCart={handleClearCart}>
          <Link className="proceed-link" to="/orders">
            <button className="btn-proceed">Review Order</button>
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Shop;
