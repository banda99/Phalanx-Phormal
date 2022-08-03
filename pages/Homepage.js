import React from 'react'
import './website.css'

function Homepage(){
    return (
        // <div className="App">
        //     <h2>Homepage</h2>
        // </div>
        <div>
            <div className='head'>
                <title>Phalanx Formal</title>
            </div>
            <div className='body'>
                <div className="header">
                <div className="container">
                    <div className="row">
                        <div className="col-2">
                            <h1>Spartans, dress well<br/>For tonight we dine in Hades!</h1>
                            <p>No retreat, no surrender. That is Spartan law.</p>
                            <a href="./cart" className="btn">Shop Now</a>
                        </div>
                        <div className="col-2">
                            <img src="../667x1000 processed/1000x667 groups assorted/mixed group 2.jpeg" alt=""/> 
                        </div>
                    </div>
                </div>
                </div>      
            </div>
        </div>
    );
}

export default Homepage