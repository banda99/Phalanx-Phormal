import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import App from '../App'
// import Homepage from "./Narayan/Homepage";
// import Cart from "../Pages/Anurag/Cart";
// import About from "../Pages/Anurag/About";
import Navbar from "./Navbar";
import Page1 from './Page1'
import Page2 from './Page2'
import Homepage from './Homepage'
import LoginPage from './LoginPage'
import Cart_Main from "./Cart_Main";


const AllRoutes = () => {
  return (
    // <BrowserRouter>
    <div>
     <Navbar/>
      <Routes>
        <Route path="/" element={<Homepage />} stylesheet='./website.css'/>
        <Route path="/page1" element={<Page1 />} stylesheet='../App.css'/>
        <Route path="/page2" element={<Page2 />} stylesheet='../App.css'/>
        <Route path="/login" element={<LoginPage />} stylesheet='./LoginForm.css'/>
        <Route path="/cart" element={<Cart_Main />} stylesheet='./Cart_Main.css'/>
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
