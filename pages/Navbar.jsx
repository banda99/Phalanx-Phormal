import React, {useState, useEffect} from 'react'
import { Link, Outlet } from "react-router-dom";
import { getCurrentUser, Logout } from "../dataFunctions";

export default function Navbar({loggedIn, setLoggedIn, changed, setChanged}) {
    const logout = async () => {await Logout(); setChanged(true);};
    const Logged = () => {
      useEffect( () => {
        if(changed){
          // console.log('changed ', changed)
          async function getData(){
            try{
              const user = await getCurrentUser()
              // console.log(user)
              if(user !== null){
                setLoggedIn(true);
                // console.log(1);
              }
              else{
                setLoggedIn(false);
                // console.log(2);
              }
              setChanged(false);
            }
            catch(err){
              console.log(err);
              setChanged(false);
            }
          }
          getData();
          // console.log(loggedIn)
        // }
      }}, []);
      // return <div>{products[1].name}</div>
      return (
        <div>
            <Link to="/">Homepage</Link> |{" "}
            {/* <Link to="/page1">Page 1</Link> |{" "} */}
            {/* <Link to="/page2">Page 2</Link> |{" "} */}
            {(!loggedIn) ? (
            <Link to="/login">Log In</Link>) : (<a onClick={logout}>Log out</a>)} |{" "}
            <Link to="/cart">Products and Cart</Link>
        </div>
      );
    }
    return (
      <div>
        <nav className="Navbar">
            <div className="logo">
              <img src="../logos/no background/logo and text no bg.png" alt="" width="125px"/>
            </div>
            <Logged/>
            {/* <Link to="/">Homepage</Link> |{" "}
            <Link to="/page1">Page 1</Link> |{" "}
            <Link to="/page2">Page 2</Link> |{" "}
            {(getUser() === null) ? (
            <Link to="/login">Log In</Link>) : (<button onClick={Logout}>Log out</button>)} |{" "}
            <Link to="/cart">Products and Cart</Link> */}
        </nav>
        <Outlet />
      </div>
    );
  }
  