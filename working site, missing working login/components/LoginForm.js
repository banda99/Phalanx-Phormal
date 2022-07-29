//import React from 'react'
import React, { useState} from 'react';
// import './LoginForm.css'

function LoginForm({Login, error}) {
  const [details, SetDetails] = useState({name: "", email: "", password: ""});
  
  const submitHandler = e => {
    e.preventDefault();
    Login(details);
  }
  
  return (
    <form onSubmit={submitHandler}> 
      <div className="form-inner">
        <h2>Login</h2>
        {(error !== "") ? (<div className='error'>{error}</div>): ""}
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" name="name" id="name" onChange={e => SetDetails({...details, name: e.target.value})} value = {details.name}/>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" id="email" onChange={e => SetDetails({...details, email: e.target.value})} value = {details.email} />
        </div>  
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" onChange={e => SetDetails({...details, password: e.target.value})} value = {details.password}/>
        </div>
        <input type="submit" value="LOGIN" />
      </div>
    </form>
  )
}

export default LoginForm;
