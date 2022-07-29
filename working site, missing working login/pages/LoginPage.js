import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import './LoginPage.css'
import {verifyLogin} from '../dataFunctions'

function LoginPage() {
  const adminUser = {
    email: "admin@admin.com",
    password:  "admin123"
  }

  const [user, setUser] = useState({name: "", email: ""}); 
  const [error, setError] = useState("");

  const Login = details => {
    console.log(details);
    const result = verifyLogin(details.name, details.email, details.password);
    if (result){
      console.log("Logged in");
      setUser({
        name: details.name,
        email: details.email
      });
    }else {
      console.log("Wrong name")
      setError("Details do not Match!")
    }
  }

  const Logout = () => {
    setUser({name: "", email: ""});
  }

  return (
    <div className="Login">
      {(user.email !== "") ? (
        <div className='Welcome'>
          <h2>Welcome, <span>{user.name}</span></h2>
          <button onClick={Logout}>Logout</button>
        </div>
      ) : (
        <LoginForm Login={Login} error={error}/>
      )}
    </div>
  );
}

export default LoginPage;
