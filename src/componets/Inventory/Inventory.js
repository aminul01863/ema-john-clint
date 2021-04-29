import React from 'react';
import './Inventory.css'

const Inventory = () => {
    const handelAddProduct = () => {
        const product = {};
        fetch('https://vast-brushlands-34070.herokuapp.com/addProduct', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
        })

    }
    return (
        <div className="containers">
            <form action="">
                <p><span>Name: </span><input type="text" /></p>
                <p><span>Price: </span><input type="text" /></p>
                <p><span>Quantity: </span><input type="text" /></p>
                <p><span>Product Image </span><input type="file" /></p>
                <button className="main-btn" onClick={handelAddProduct}>Add product</button>

            </form>
        </div>
    );
};

export default Inventory;