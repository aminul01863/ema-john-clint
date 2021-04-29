import React from 'react';
import './ReviewItem.css'
const ReviewItem = (props) => {
    const { name, quantity, key, price } = props.product;
    const reviewItemStyle = {
        borderBottom: '1px solid black',
        marginBottom: '5px',
        paddingBottom: '5px',
        marginLeft: '200px'
    }
    return (
        <div style={reviewItemStyle} className="review-item">
            <h3 className="product-name">{name}</h3>
            <p>Quantity: {quantity}</p>
            <p><small>${price}</small></p>
            <br />
            <button onClick={() => props.removeProduct(key)} className="order-remove-btn">Order Remove</button>
        </div>
    );
};

export default ReviewItem;