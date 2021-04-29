import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'
import { Link } from 'react-router-dom';
const Shop = () => {
    // const first10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([])
    const [search, setSearch] = useState('')
    document.title = "Shop More"

    useEffect(() => {
        fetch('https://vast-brushlands-34070.herokuapp.com/products?search=' + search)
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [search])

    useEffect(() => {
        const saveCart = getDatabaseCart();
        const productKeys = Object.keys(saveCart);
        fetch('https://vast-brushlands-34070.herokuapp.com/productsByKeys ', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(productKeys)
        })
            .then(res => res.json())
            .then(data => setCart(data))
    }, [products])

    const handelSearch = event => {
        setSearch(event.target.value);
    }

    const handelAddProduct = (product) => {
        const ToBeAddedKey = product.key
        const sameProduct = cart.find(pd => pd.key === ToBeAddedKey);
        let count = 1;
        let newCart;
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter((pd) => pd.key !== ToBeAddedKey)
            newCart = [...others, sameProduct]
        }
        else {
            product.quantity = 1
            newCart = [...cart, product]
        }

        setCart(newCart)

        addToDatabaseCart(product.key, count)
    }
    return (

        <div className='twin-container'>
            <div className="product-container">
                <input type="text" onBlur={handelSearch} placeholder='product-search' />

                {
                    products.map(pd => <Product
                        key={pd.key}
                        showAddToCard={true}
                        handelAddProduct={handelAddProduct}
                        product={pd}></Product>)

                }

            </div>
            <div className="card-container">
                <Cart cart={cart}>
                    <Link to="/review">
                        <button className="main-button">Review Order</button>
                    </Link>
                </Cart>
            </div>

        </div>
    );
};

export default Shop;