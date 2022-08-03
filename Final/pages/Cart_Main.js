import React, { useState, useEffect } from 'react';
import './Cart_Main.css'
import Cart from './Cart'
import Products from './Products';
import { addCartItem, changeCartItemQty, clearDataCart, removeCartItem, getCart, getProductsFromCart, applyDiscount } from '../dataFunctions';
import Checkout from './Checkout';
import Order from './Order';

const PAGE_PRODUCTS = 'products';
const PAGE_CART = 'cart';
const PAGE_CHECKOUT = 'checkout';
const PAGE_ORDER = 'order';

function Cart_Main() {
  const [cart, setCart] = useState([]);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(PAGE_PRODUCTS);
  const [initialized, setInitialized] = useState(false);

  const navigateTo = (nextPage) => {
    setPage(nextPage);
  };

  const InitializeData = () => {
    // const [cart, setCart] = useState([]);
    // const [productImages, setImages] = useState([]);

    useEffect( () => {
      if(!initialized){
        async function getData(){
          try{
            const cartItems = await getCart();
            const products = await getProductsFromCart(cartItems);
            let images = [];
            products.forEach((product) => images.push(product[1]['image']))
            setImages(images)
            setCart(cartItems);
            console.log('initialized');
            // console.log(images)
          }
          catch(err){
            console.log(err);
          }
        }
        getData();
        setInitialized(true);
      }
    }, []);
  }

  const addToCart = async (product) => {
    // let newCart = [...cart];
    // let itemInCart = newCart.find (item => product.name === item.name);
    //  if (itemInCart) {
    //   itemInCart.quantity++;
    // } else {
    //   itemInCart = {...product, quantity: 1}
    //   newCart.push(itemInCart);
    // } 
    let inCart = false;
    for(const item of cart){
      if(item[1]['product_id'] === product)
        inCart = true;
    }
    if(!inCart){
      // console.log(product);
      await addCartItem(product, 1);
      const newCart = await getCart();
      const products = await getProductsFromCart(newCart);
      let imagesTemp = [];
      products.forEach((product) => imagesTemp.push(product[1]['image']))
      setImages(imagesTemp);
      setCart(newCart);
    }
    else
      console.log("Already in cart!");
  }

  const removeFromCart = async (productToRemove) => {
    let index;
    for(let i = 0; i < cart.length; i++){
      if(productToRemove === cart[i][0]){
        index = i;
        break;
      }
    }
    await removeCartItem(productToRemove);
    setCart(
      cart.filter((product) => product[0] !== productToRemove)
    );
    const newImg = images;
    newImg.splice(index, 1)
    setImages(newImg)
  };

  const clearCart = async () => {
    await clearDataCart(cart);
    setCart([]);
    setImages([]);
  };

  const getCartTotalQty = () => {
    let totalQty = 0;
    for(const item of cart){
      totalQty += item[1]['quantity'];
    }
    // return cart.reduce((sum, item) => sum+item[1].quantity, 0);/
    return totalQty;
  }

  /*updates quantity inside of view cart page input box*/
  const setQuantity = async (product, amount) => {
    const newCartItem = await changeCartItemQty(product, amount);
    let newCart = cart;
    for(let i = 0; i < newCart.length; i++){
      if(newCart[i][0] === newCartItem[0]){
        newCart[i] = newCartItem;
        break;
      }
    }
    setCart(newCart.filter(product => true));
  }

  const setDiscount = async (cart, discCode) => {
    const newCartItem = await applyDiscount(cart, discCode);
    let newCart = cart;
    for(let i = 0; i < newCart.length; i++){
      if(newCart[i][0] === newCartItem[0]){
        newCart[i] = newCartItem;
        break;
      }
    }
    setCart(newCart.filter(product => true));
  }
  
  return (
    <div className="Cart">
      <InitializeData />
      
      {page === PAGE_PRODUCTS && (
        <Products addToCart={addToCart} stylesheet='./Cart_Main.css'/>
      )}
      {page === PAGE_CART && (
        <Cart
         cart={cart} images={images} setQuantity={setQuantity} setDiscount={setDiscount} removeFromCart={removeFromCart} clearCart={clearCart} stylesheet='./Cart_Main.css'/>
      )}
      {page === PAGE_CHECKOUT && (
        <Checkout
         cart={cart} images={images} setQuantity={setQuantity} setDiscount={setDiscount} removeFromCart={removeFromCart} clearCart={clearCart} stylesheet='./Cart_Main.css'/>
      )}
      {page === PAGE_ORDER && (
        <Order
         cart={cart} images={images} setQuantity={setQuantity} setDiscount={setDiscount} removeFromCart={removeFromCart} clearCart={clearCart} stylesheet='./Cart_Main.css'/>
      )}
      <button onClick={() => navigateTo(PAGE_CHECKOUT)}>
          CHECKOUT
        </button>
        <div>
        <button onClick={() => navigateTo(PAGE_ORDER)}>
          ORDER
        </button>
        </div>
    </div>
  );
};

export default Cart_Main;