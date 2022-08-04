import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import './LoginPage.css'
import {verifyLogin} from '../dataFunctions'

function LoginPage( {setChanged}) {
  const adminUser = {
    email: "admin@admin.com",
    password:  "admin123"
  }

  const [user, setUser] = useState({name: "", email: "", password: ""}); 
  const [error, setError] = useState("");

  const Login = async (details) => {
    // console.log(details);
    const result = await verifyLogin(details.name, details.email, details.password);
    if (result){
      // console.log("Logged in");
      setChanged(true);
      setUser({
        name: details.name,
        email: details.email,
        password: details.password
      });
    }else {
      // console.log("Wrong name")
      setError("Details do not Match!")
    }
  }

  // const Logout = () => {
  //   setUser({name: "", email: ""});
  // }

  return (
    <div className="Login">
      {(user.email !== "") ? (
        <div className='Welcome'>
          <h2>Welcome, <span>{user.name}</span></h2>
          {/* <button onClick={Logout}>Logout</button> */}
        </div>
      ) : (
        <LoginForm Login={Login} error={error} sytlesheet="LoginPage.css"/>
      )}
    </div>
  );
}

export default LoginPage;
