import React, {useState, useEffect} from 'react';
import { getCart, getProductsFromCart, getSubTotal, changeCartItemQty} from "../dataFunctions"
import Navbar from './Navbar';
// import './Cart_Main.css'


export default function Order({cart, images, names, clearCart, removeFromCart, setQuantity, setDiscount}) {
    // const [changeMade, setChange] = useState(true);
    // const [cartTemp, setCartTemp] = useState([]);
    // const [imagesTemp, setImagesTemp] = useState([]);



    const ShowCart = () => {
      // const [cartTemp, setCartTemp] = useState([]);
      // const [imagesTemp, setImagesTemp] = useState([]);
      // // const [productImages, setImages] = useState([]);

      // useEffect( () => {
      //   // if(changeMade){
      //     async function getData(){
      //       try{
      //         // const temp1 = images;
      //         // const temp2 = cart;
      // // //         const cartItems = await getCart();
      // // //         const products = await getProductsFromCart(cartItems);
      // // //         let images = [];
      // // //         products.forEach((product) => images.push(product[1]['image']))
      //         // setImagesTemp(images)
      //         // setCartTemp(cart);
      // // //         // console.log(images)
      //       }
      //       catch(err){
      //         console.log(err);
      //       }
      //     }
      //     getData();
      //     // setChange(false);
      //   // }
      // }, []);
      // return <div>{products[1].name}</div>
      return cart.map((item, idx) => (
        // {console.log(product[1].name + " " + product[1].price)}
        // {console.log(item)}
        // {console.log(item)}
        <div className="product" key={idx}>
        </div>
      ));
    }

    return (
    <div className="Checkout">
        <h2>ORDER SUCCESSFULLY PLACED</h2>
    </div>
  );
}