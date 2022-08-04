import React from 'react';
// import Navbar from './Navbar';
// import './Cart_Main.css'


export default function Cart({cart, images, names, clearCart, removeFromCart, setQuantity}) {
    // const [changeMade, setChange] = useState(true);
    // const [cartTemp, setCartTemp] = useState([]);
    // const [imagesTemp, setImagesTemp] = useState([]);

    // const totalCost = () => {
    //   return (getSubTotal(cart) * 1.0825).toFixed(2);
    // }

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
          <h3>{names[idx]}</h3>
          <h4>${(item[1].price*item[1].quantity).toFixed(2)}</h4>
          <div>
            
            <img src={images[idx]} alt={item[1].name} />
            <h3>Quantity:</h3>
            <input value = {item[1].quantity}
              onChange={(e) => 
              setQuantity(item[0], parseInt(e.target.value))}>
            </input>
            <button onClick={() => removeFromCart(item[0])}>
              Remove Item
            </button>
          </div>
        </div>
      ));
    }

    return (
    <div className="Cart">
      <h1>Cart</h1>
      {cart.length > 0 && (
      <button onClick={clearCart}>Clear All Items</button>
      )}
      <div className="products">
        <ShowCart />
        </div>
        {/* Discount Code:
        <input id='DiscountCode' type="text"/>
        <button value={'TEST'} onClick= {()=>setDiscount(cart, document.getElementById('DiscountCode').value)}>TEST</button>
        <div> Total: ${totalCost()}</div> */}
    </div>
  );
}