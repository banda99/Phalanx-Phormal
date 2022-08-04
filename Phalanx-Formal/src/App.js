import logo from './logo.svg';
import './App.css';
// Import the functions you need from the SDKs you need
import db from './firebase.js';
import {collection, getDocs, addDoc, query, where, getDoc, doc, FieldValue, updateDoc} from 'firebase/firestore';
import {User, Cart, userConverter, cartConverter, printDict, cartItemConverter, productConverter, discountConverter} from './dataTypes.js';
import AllRoutes from "./pages/AllRoutes"

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
    const userRef = docu.data()['user_id'];
    const docRef = doc(db, userRef).withConverter(userConverter)
    const user = await getDoc(docRef);
    console.log("User:");
    printDict(user.data());
  };
}

async function getCart(user_id){
  const q = query(collection(db, 'shopping_session').withConverter(cartConverter), where('user_id', '==', 'users/'+user_id));
  const querySnapshot = await getDocs(q);
  const cart_id = "";
  const cart_items = [];
  if(querySnapshot.size === 1){
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      cart_id = doc.id;
    });
    q = query((collection(db, 'cart_item')).withConverter(cartItemConverter), where('cart_id', '==', 'shopping_session/'+cart_id));
    querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      cart_items.push([doc.ref.path, doc]);
    });
  }
  //get dict of item with cart_items[?][1].data();
  return cart_items;
}

async function getCartItem(cart_item_id){
  const ref = doc(db, 'cart_item', cart_item_id).withConverter(cartItemConverter);
  const cart_item = await getDoc(ref);
  return cart_item;
}

async function applyDiscount(cart_items, code){
  for(const i = 0; i < cart_items.length; i++){
    const product_id = cart_items[i][1].data()['product_id'];
    const ref = doc(db, product_id).withConverter(productConverter);
    const product = await getDoc(ref);
    const discount_id = product.data()['discount_id'];
    ref = doc(db, discount_id).withConverter(discountConverter);
    const discount = await getDoc(ref);
    if(code === discount.data()['name']){
      const off = discount.data()['discount_percent'];
      //print code valid!
      const cart_item_ref = doc(db, cart_items[i][0]).withConverter(cartItemConverter);
      const discountPrice = product.data()['price'] * (1-(off/100.0));
      await updateDoc(cart_item_ref, ({
          price: discountPrice
      }));
      cart_items[i][1] = await getDoc(cart_item_ref);
    }
  }
  return cart_items;
}

async function getCurrentUser(){
  if ('localStorage' in window && window['localStorage'] !== null) {
    // We can use localStorage object to store data.
    return "users/"+localStorage.getItem("user_id");
  } else {
    console.log("No user signed in");
    return null;
  }
}

// async function createUser() {
//   const newUser = new User('polycode', 'password123', 'test123@test.com', 'Poly', 'Code', undefined, 1234567890);
//   // const ref = doc(db, "users").withConverter(userConverter);
//   const docID = await addDoc(collection(db, "users").withConverter(userConverter), newUser);
//   const newCart = new Cart(docID.path, 0.0)
//   await addDoc(collection(db, "shopping_session").withConverter(cartConverter), newCart);
//   // const res = await collection(db, 'users').withConverter(userConverter).add(newUser);
//   console.log(docID);
// }

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
function App() {
  // console.log(getUsers());
  // await const getUsers = () => {
  //   console.log(typeof db)
  //   var userCol = collection(db, 'users');
  //   console.log(userCol);
  //   var userSnapshot = await getDocs(userCol);
  //   console.log(userSnapshot);
  //   var userList = userSnapshot.docs.map(doc => doc.data());
  //   console.log(userList);
  // }

  return (
    // <main style={{ padding: "1rem 0" }}>
    //     <h2>App</h2>
    // </main>
    <div className="App">
      <AllRoutes/>
    </div>
    // <div className="App">
    //   <header className="App-header">
    //     {/* <img src={logo} className="App-logo" alt="logo" /> */}
    //     <div className='Action' onClick={getUsers}>Get Users!</div>
    //     {/* <div className='Action' onClick={createUser}>Add User!</div> */}
    //     {/* <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p> */}
    //     {/* <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a> */}
    //   </header>
    // </div>
  );
}

export default App;
