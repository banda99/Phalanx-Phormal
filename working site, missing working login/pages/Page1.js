import React from 'react'
// import '../App.css'
import { getCurrentUser, 
    getUsers,
    getCart,
    // getCartItem,
    applyDiscount,
    verifyLogin,
    Logout,
    addProduct,
    addCartItem, 
    getSubTotal,
    searchProducts} from '../dataFunctions';

function Page1(){

    const Log = () => {verifyLogin('polycode', 'test123@test.com', 'password123')};
    const addProd = () => {addProduct('Polo Shirt', 'An orange polo shirt', 100, 19.99, 'Short Sleeve', 'https://www.fjallraven.com/49431c/globalassets/catalogs/fjallraven/f8/f815/f81511/f206/ovik_polo_shirt_m_81511-206_a_main_fjr.jpg?width=2000&height=2000&mode=BoxPad&bgcolor=fff&quality=80')};
    const addCI = () => {addCartItem('product/by6y8besquj4socKs82H', 1)}
    const applyDisc = async () => {
        const cartItems = await getCart();
        await applyDiscount(cartItems, 'ILOVEPOLO')}
    const getTot = async () => {
        const cartItems = await getCart();
        getSubTotal(cartItems)}
    const search = async () => {
        const products = await searchProducts(undefined, undefined, 'high_price');
        // let ret = [];
        // for(let i = 0; i < products.length; i++){
        //     ret.push((
            // return products.map((product) => {
            //     // console.log(product);
            //     <div>  
            //         <h3>{product[1].name}</h3>
            //         <h4>${product[1].price}</h4>
            //         <img src={product[1].image} alt={product[1].name} />
            //         <button onClick={() => addCartItem(product[0])}>
            //         Add to Cart
            //         </button>
            //     </div>
            //  });
        // }
        // console.log(products)
        return products;
    }
    const test = () => {
        
        // console.log(typeof ['yes', 'no']);
    }
    return (
        <div className="Page1">
            <h2>Page 1</h2>
            <div className='Action' onClick={Log}>Login</div>
            <div className='Action' onClick={getCurrentUser}>Get current User!</div>
            <div className='Action' onClick={getUsers}>Get Users!</div>
            <div className='Action' onClick={addProd}>Add Product!</div>
            <div className='Action' onClick={addCI}>Add to Cart!</div>
            <div className='Action' onClick={getCart}>Get current user's cart!</div>
            <div className='Action' onClick={applyDisc}>Apply discount to user's cart!</div>
            <div className='Action' onClick={getTot}>Get total of user cart!</div>
            <div className='Action' onClick={search}>Search</div>
            <div className='Action' onClick={test}>Test</div>
            <div className='Action' onClick={Logout}>Logout</div>
            {/* //search().then(products => console.log(products)).catch(error => console.log('ew')) */}
            {/* {search().then((products) => products.map((product) => {
                //  console.log(product[1].name);
                 <div>  
                     <h3>{product[1].name}</h3>
                    <h4>${product[1].price}</h4>
                    <img src={product[1].image} alt={product[1].name} /> 
                    <div className='Action' onClick={() => addCartItem(product[0])}>
                    Add to Cart
                    </div>
                 </div> 
             }))} */}
            {/* <div className='Action' onClick={getCurrentUser}>Get current User!</div> */}
        </div>
    );
}

export default Page1