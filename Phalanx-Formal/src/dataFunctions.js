import db from './firebase.js';
import {collection, getDocs, addDoc, query, where, getDoc, doc, FieldValue, updateDoc, deleteDoc, orderBy} from 'firebase/firestore';
import {User, Cart, CartItem, userConverter, cartConverter, printDict, cartItemConverter, productConverter, discountConverter, Product, Order, orderConverter, OrderItem, orderItemConverter, Address, addressConverter} from './dataTypes.js';

async function getUsers() {
    // console.log(typeof db)
    // const userCol = collection(db, 'users');
    // // console.log(userCol);
    // const userSnapshot = await getDocs(userCol);
    // // console.log(userSnapshot);
    // const userList = userSnapshot.docs.map(doc => doc.data());
    let q = query(collection(db, "users").withConverter(userConverter));

    let querySnapshot = await getDocs(q);
    console.log("Users:")
    const paths = [];
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        for(const [key, value] of Object.entries(doc.data())){
        console.log(key + ": " + value);
        }
        // paths.push(doc.ref.path);
        console.log(doc.id, " => ", doc.data());
    });
    // console.log(paths);
    // for(let i = 0; i < paths.length; i++){
    //   q = query(collection(db, "shopping_session").withConverter(cartConverter), where("user_id", "==", paths[i]));

    //   querySnapshot = await getDocs(q);
    //   console.log("Carts:")
    //   querySnapshot.forEach((doc) => {
    //     // doc.data() is never undefined for query doc snapshots
    //     console.log(doc.id, " => ", doc.data());
    //   });
    // }
    // for(var i = 0; i < userList.length; i++){
    //   for(const [key, value] of Object.entries(userList[i])){
    //     console.log(key + ": " + value);
    //   }
    //   // console.log("Cart: " + )
    //   console.log(userSnapshot);
    //   const q = query(collection(db, "shopping_session"), where("user_id", "==", userSnapshot.docs[i].path));

    //   const querySnapshot = await getDocs(q);
    //   console.log("Cart:")
    //   querySnapshot.forEach((doc) => {
    //     // doc.data() is never undefined for query doc snapshots
    //     console.log(doc.id, " => ", doc.data());
    //   });
    // }
}


async function getUsersFromCart() {
    let q = query(collection(db, "shopping_session").withConverter(cartConverter));

    let querySnapshot = await getDocs(q);
    console.log("Carts:")
    for(const docu of querySnapshot.docs){
        // doc.data() is never undefined for query doc snapshots
        printDict(docu.data());
        let userRef = docu.data()['user_id'];
        let docRef = doc(db, userRef).withConverter(userConverter);
        const user = await getDoc(docRef);
        console.log("User:");
        printDict(user.data());
    };
}

//gets all cart_items of the current user
//returns array of [cart_item reference string, cart_item dictionary]
async function getCart(){
    const user_id = await getCurrentUser();
    if(user_id !== null){
        const cart_ref = await getCartPath();
        if(cart_ref !== ''){
            let cart_items = [];
            let q = query((collection(db, 'cart_item')).withConverter(cartItemConverter), where('session_id', '==', cart_ref));
            let querySnapshot = await getDocs(q);
            querySnapshot.forEach(doc => {
                cart_items.push([doc.ref.path, doc.data()]);
            });
            console.log(cart_items);
            return cart_items;
        }
    }
    else
        alert("Not logged in");
}

//clears the current user's cart
async function clearDataCart(cart_items){
    // const cart_items = await getCart();
    for(let i = 0; i < cart_items.length; i++){
        let delRef = doc(db, cart_items[i][0]);
        await deleteDoc(delRef);
    }
}

//gets path of the current user's cart
//returns string
async function getCartPath(){
    const user_id = await getCurrentUser();
    let cartPath = '';
    if(user_id !== null){
        let q = query(collection(db, 'shopping_session').withConverter(cartConverter), where('user_id', '==', user_id));
        let querySnapshot = await getDocs(q);
        if(querySnapshot.size === 1){
            querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.ref.path);
            cartPath = doc.ref.path;
        });
        }
    }
    else{
        console.log("twas null");
    }
    return cartPath;
}

//given an item reference, returns that item as dictionary
async function getCartItem(cart_item_ref){
    let ref = doc(db, cart_item_ref).withConverter(cartItemConverter);
    const cart_item = await getDoc(ref);
    // return cart_item;
    console.log(cart_item.data());
    return cart_item.data();
}

//given an item reference, removes that item from the database
//recommended to remove document from any local variables
async function removeCartItem(cart_item_ref){
    let ref = doc(db, cart_item_ref).withConverter(cartItemConverter);
    await deleteDoc(ref)
}

//given a product reference and quantity
//adds that product to the user's cart
async function addCartItem(product_ref, qty){
    let ref = doc(db, product_ref).withConverter(productConverter);
    let prod = await getDoc(ref);
    // console.log(qty + " vs " + prod.data()['quantity'])
    if(qty <= prod.data()['quantity']){
        const cartPath = await getCartPath();
        // console.log(cartPath);
        const cartItem = new CartItem(cartPath, product_ref, qty, prod.data()['price'], false)
        await addDoc(collection(db, 'cart_item').withConverter(cartItemConverter), cartItem);
    }
}

//given cart_item reference and qty
//changes qty of the item in database
//return updated cart_item if enough qty, else null
async function changeCartItemQty(cart_item_ref, qty){
    let ref = doc(db, cart_item_ref).withConverter(cartItemConverter);
    let cart_item = await getDoc(ref);
    let prodRef = doc(db, cart_item.data()['product_id']).withConverter(productConverter);
    const product = await getDoc(prodRef);
    console.log(qty + " vs " + product.data()['quantity'])
    if(qty <= product.data()['quantity']){
        await updateDoc(ref, {
            quantity: qty
        });
        cart_item = await getDoc(ref);
        // return cart_item;
        // console.log(cart_item);
        return [cart_item.ref.path, cart_item.data()];
    }
    else{
        alert("Not enough left in stock!");
        return null;
    }
}

//create a new product and add to database
async function addProduct(name, desc, qty, price, cat, img){
    const product = new Product(name, desc,
                                undefined, qty, price, undefined, cat, img);
    printDict(product);
    await product.addSku();
    await addDoc(collection(db, 'product').withConverter(productConverter), product);
}

//product data from each item in cart
//returns array of [product reference path, product dictionary]
async function getProductsFromCart(cart_items){
    let products = [];
    for(let i = 0; i < cart_items.length; i++){
        const product_id = cart_items[i][1]['product_id'];
        let ref = doc(db, product_id).withConverter(productConverter);
        const product = await getDoc(ref);
        products.push([product.ref.path, product.data()]);
    }
    return products;
}

//search all products in database
//search: string, searches for matches in product names
//category; string, filters products by category or price
//returns all products that match specific query
async function searchProducts(search, category, price){
    // const searchArr = search.split(" ", 10);
    let q;
    console.log(search)
    console.log(category);
    if(typeof price === 'undefined')
        price = '';
    let searchArr = [];
    if(typeof search === 'string' && search !== "")
        searchArr = search.split(" ", 10);
        // console.log(searchArr);
    if((typeof search === 'string' && search !== "") && (typeof category === 'string' && category !== "")){
        if(category !== 'availability'){
            if(price === 'Ascending')
                q = query(collection(db, 'product').withConverter(productConverter), where('name', 'array-contains-any', searchArr), where('category', '==', category), orderBy('price', 'asc'));
            else if(price === 'Descending')
                q = query(collection(db, 'product').withConverter(productConverter), where('name', 'array-contains-any', searchArr), where('category', '==', category), orderBy('price', 'desc'));
            else
                q = query(collection(db, 'product').withConverter(productConverter), where('name', 'array-contains-any', searchArr), where('category', '==', category));
        }
        else if(category === 'availability'){
            if(price === 'Ascending')
                q = query(collection(db, 'product').withConverter(productConverter), where('name', 'array-contains-any', searchArr), where('quantity', '>', 0), orderBy('quantity', 'desc'), orderBy('price', 'asc'));
            else if(price === 'Descending')
                q = query(collection(db, 'product').withConverter(productConverter), where('name', 'array-contains-any', searchArr), where('quantity', '>', 0), orderBy('quantity', 'desc'),orderBy('price', 'desc'));
            else
                q = query(collection(db, 'product').withConverter(productConverter), where('name', 'array-contains-any', searchArr), where('quantity', '>', 0), orderBy('quantity', 'desc'));
        }
    }  
    else if(typeof search === 'string' && search !== ""){
        if(price === 'Ascending')
            q = query(collection(db, 'product').withConverter(productConverter), where('name', 'array-contains-any', searchArr), orderBy('price', 'asc'));
        else if(price === 'Descending')
            q = query(collection(db, 'product').withConverter(productConverter), where('name', 'array-contains-any', searchArr), orderBy('price', 'desc'));
        else
            q = query(collection(db, 'product').withConverter(productConverter), where('name', 'array-contains-any', searchArr));
    }
    else if(typeof category === 'string' && category !== ""){
        if(category !== 'availability'){
            if(price === 'Ascending')
                q = query(collection(db, 'product').withConverter(productConverter), where('category', '==', category), orderBy('price', 'asc'));
            else if(price === 'Descending')
                q = query(collection(db, 'product').withConverter(productConverter), where('category', '==', category), orderBy('price', 'desc'));
            else
                q = query(collection(db, 'product').withConverter(productConverter), where('category', '==', category));
        }
        else if(category === 'availability')
            if(price === 'Ascending')
                q = query(collection(db, 'product').withConverter(productConverter), where('quantity', '>', 0), orderBy('quantity', 'desc'), orderBy('price', 'asc'));
            else if(price === 'Descending')
                q = query(collection(db, 'product').withConverter(productConverter), where('quantity', '>', 0), orderBy('quantity', 'desc'), orderBy('price', 'desc'));
            else
                q = query(collection(db, 'product').withConverter(productConverter), where('quantity', '>', 0), orderBy('quantity', 'desc'));
    }
    else if(price !== ''){
        if(price === 'Ascending')
            q = query(collection(db, 'product').withConverter(productConverter), orderBy('price', 'asc'));
        else if(price === 'Descending')
            q = query(collection(db, 'product').withConverter(productConverter), orderBy('price', 'desc'));
    }
        // q = query(collection(db, 'product').withConverter(productConverter), where('category', 'array-contains', category));
    else
        q = query(collection(db, 'product').withConverter(productConverter));
    // console.log(q);
    let querySnapshot = await getDocs(q);
    let products = [];
    querySnapshot.forEach(doc => {
        if(doc.id !== 'skuNum')
            products.push([doc.ref.path, doc.data()])
    });

    return products;
}

//checks if any items in the cart have 'code' as a discount code
//if so, apply the discount and update the item in the database
//returns updated cart_items array
async function applyDiscount(cart_items, code){
    let code_applied = false;
    // let already_applied = false;
    for(let i = 0; i < cart_items.length; i++){
        if(cart_items[i][1]['discount_applied'] === false){
            const product_id = cart_items[i][1]['product_id'];
            let ref = doc(db, product_id).withConverter(productConverter);
            const product = await getDoc(ref);
            const discount_id = product.data()['discount_id'];
            // console.log(product.data());
            if(discount_id !== ''){
                ref = doc(db, discount_id).withConverter(discountConverter);
                const discount = await getDoc(ref);
                if(code === discount.data()['name']){
                    const off = discount.data()['discount_percent'];
                    //print code valid!
                    const cart_item_ref = doc(db, cart_items[i][0]).withConverter(cartItemConverter);
                    const discountPrice = product.data()['price'] * (1-(off/100.0));
                    await updateDoc(cart_item_ref, ({
                        price: discountPrice,
                        discount_applied: true
                    }));
                    const item = await getDoc(cart_item_ref);
                    cart_items[i][1] = item.data()
                    code_applied = true;
                    // console.log('Discount code ' + code + " applied!")
                }
            }
        }
        // else{
        //     already_applied = true;
        // }
    }
    // return cart_items;
    // if(already_applied){
    //     console.log('Code "' + code +'" already applied')
    // }
    console.log(code_applied ? ('Discount code "' + code + '" applied!') : ('Discount code "' + code + '" not valid!'))
    console.log(cart_items);
    return cart_items;
}

//once order is placed, creates order_details and turns cart_items into order_items
//returns order_details path if user logged in, else false
async function processOrder(cart_items){
    const user_ref = await getCurrentUser();
    if(user_ref !== null){
        let order = new Order(user_ref, undefined, getSubTotal(cart_items)*1.0825, 'USPS', 'undelivered');
        let orderRef = await addDoc(collection(db, 'order_details').withConverter(orderConverter), order);
        for(let i = 0; i < cart_items.length; i++){
            let orderItem = new OrderItem(orderRef, cart_items[i][1]['product_id'], cart_items[i][1]['quantity'], cart_items[i][1]['price']);
            await addDoc(collection(db, 'order_item').withConverter(orderItemConverter), orderItem);
            let delRef = doc(db, cart_items[i][0]);
            await deleteDoc(delRef);
        }
        return orderRef.path;
    }
    return false;
}

//calculates total price for all cart_items with tax
function getSubTotal(cart_items){
    let total = 0.0;
    for(let i = 0; i < cart_items.length; i++){
        total += (cart_items[i][1]['price'] * cart_items[i][1]['quantity']);
    }
    console.log(total);
    return total;
}

//returns the reference path of the current user as string
async function getCurrentUser(){
    // if ('localStorage' in window && window['localStorage'] !== null) {
    if(localStorage.getItem('user_id') !== null){
        console.log("users/"+localStorage.getItem("user_id"));
        return "users/"+localStorage.getItem("user_id");
    } else {
        console.log("No user signed in");
        return null;
    }   
}

//creates new user in the database
async function registerUser(username, password, email, first_name, last_name, address, phone_num) {
    // const newAddress = new Address()
    // const addRef = await addDoc(collection(db, "address").withConverter(addressConverter), newAddress);
    const newUser = new User(username, password, email, first_name, last_name, undefined/*addRef.ref.path*/, phone_num);
    // const newUser = new User('polycode', 'password123', 'test123@test.com', 'Poly', 'Code', undefined, 1234567890);
    // const ref = doc(db, "users").withConverter(userConverter);
    const docID = await addDoc(collection(db, "users").withConverter(userConverter), newUser);
    const newCart = new Cart(docID.path, 0.0)
    await addDoc(collection(db, "shopping_session").withConverter(cartConverter), newCart);
    // const res = await collection(db, 'users').withConverter(userConverter).add(newUser);
    console.log(docID);
}

//verifies that a credentials combo is correct, and if so, log user in by setting cookie
//returns true if successfully logged in, false if not
async function verifyLogin(username, email, password){
    let validLogin = false;
    let q = query(collection(db, 'users').withConverter(userConverter), where('username', '==', username));
    let user_id = "";

    let querySnapshot = await getDocs(q);
    if(querySnapshot.size === 1){
        querySnapshot.forEach(doc => {
            if(doc.data()['username'] === username && doc.data()['email'] === email && doc.data()['password'] === password){
                validLogin = true;
                user_id = doc.id;
            }
        });
    }
    else{
        console.log(querySnapshot.size + " accounts found.")
    }

    if(validLogin === true){
        console.log("Login successful.")
        localStorage.setItem('user_id', user_id);
        return true;
    }
    else{
        alert("Login not successful.");
        return false;
    }
}

// async function updateProducts(){
//     const products = await searchProducts(undefined, undefined);
//     for(let i = 0; i < products.length; i++){
//         if(products[i][0] === 'product/skuNum')
//             continue;
//         const arrName = stringToArr(products[i][1]['name'])
//         const arrDesc = stringToArr(products[i][1]['description'])
//         const prodRef = doc(db, products[i][0]);
//         await updateDoc(prodRef, {
//             name: arrName,
//             description: arrDesc
//         })
//     }
// }

//logs out current user by clearing cookies
async function Logout(){
    localStorage.clear();
    console.log("Logged out.");
}

//turns any string array into a string
//used to when get products from database
function arrToString(arr){
    let string = "";
    for(let i = 0; i < arr.length; i++){
        string += arr[i];
        if(i !== arr.length-1)
            string += " ";
    }
    return string;
}

//trusn any array into a string
//used when set products in database
//needed so search works properly
function stringToArr(string){
    let arr = string.split(" ");
    return arr;
}

export {
    getUsers,
    getCart,
    clearDataCart,
    getCartItem,
    addCartItem,
    removeCartItem,
    changeCartItemQty,
    addProduct,
    searchProducts,
    getProductsFromCart,
    processOrder,
    applyDiscount,
    getCurrentUser,
    registerUser,
    verifyLogin,
    getSubTotal,
    Logout,
    arrToString,
    stringToArr
}