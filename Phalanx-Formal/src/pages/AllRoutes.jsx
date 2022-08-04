import React, {useState, } from "react";
import {
  Routes,
  Route,
} from "react-router-dom";
// import App from '../App'
// import Homepage from "./Narayan/Homepage";
// import Cart from "../Pages/Anurag/Cart";
// import About from "../Pages/Anurag/About";
import Navbar from "./Navbar";
import Page1 from './Page1'
// import Page2 from './Page2'
import Homepage from './Homepage'
import LoginPage from './LoginPage'
import Cart_Main from "./Cart_Main";


const AllRoutes = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [changed, setChanged] = useState(true);
  const changeState = (state) => {
    // console.log('state ', state)
    setChanged(state);
  }
  const login = (state) => {
    setLoggedIn(state)
  }
  return (
    // <BrowserRouter>
    <div>
     <Navbar loggedIn={loggedIn} setLoggedIn={login} changed={changed} setChanged={changeState}/>
      <Routes>
        <Route path="/" element={<Homepage stylesheet='./website.css'/>} stylesheet='./website.css'/>
        <Route path="/dev" element={<Page1 setChanged={changeState} stylesheet='../App.css'/>} />
        {/* <Route path="/page2" element={<Page2 />} stylesheet='../App.css'/> */}
        <Route path="/login" element={<LoginPage setChanged={changeState} stylesheet='./LoginPage.css'/>} />
        <Route path="/cart" element={<Cart_Main stylesheet='./Cart_Main.css'/>} />
        {/* <Route path="/checkout" element={<Checkout />} stylesheet='./checkout.css'/> */}
        {/* </Route> */}
        {/* <Route path="/cart" element={<Cart/>} />
        <Route path="/about" element={<About/>} /> */}
      </Routes>
      {/* <Footer/> */}
    {/* // </BrowserRouter> */}
    </div>
  );
};
export default AllRoutes;
