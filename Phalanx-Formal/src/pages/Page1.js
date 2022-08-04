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

function Page1( {setChanged}){

    const Log = async () => {await verifyLogin('polycode', 'test123@test.com', 'password123'); setChanged(true)};
    const logout = async () => {await Logout(); setChanged(true)}
    const addProd = () => {addProduct(document.getElementById('name').value, document.getElementById('desc').value, parseInt(document.getElementById('qty').value), parseFloat(document.getElementById('price').value).toFixed(2), document.getElementById('cat').value, document.getElementById('img').value)};
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
            <div>
                <input id='name' placeholder='name'></input> |{" "}
                <input id='desc' placeholder='description'></input> |{" "}
                <input id='qty' placeholder='quantity'></input> |{" "}
                <input id='price' placeholder='price'></input> |{" "}
                <input id='cat' placeholder='category'></input> |{" "}
                <input id='img' placeholder='image'></input>
            </div>
            <div className='Action' onClick={addCI}>Add to Cart!</div>
            <div className='Action' onClick={getCart}>Get current user's cart!</div>
            <div className='Action' onClick={applyDisc}>Apply discount to user's cart!</div>
            <div className='Action' onClick={getTot}>Get total of user cart!</div>
            <div className='Action' onClick={search}>Search</div>
            <div className='Action' onClick={test}>Test</div>
            <div className='Action' onClick={logout}>Logout</div>
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