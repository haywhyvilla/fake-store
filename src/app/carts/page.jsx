// Cart.js
"use client"

import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '@/src/redux/actions/cartActions';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Cart = () => {
    const cartItems = useSelector((state) => state.cart.cartItems);
    console.log(cartItems)
    const dispatch = useDispatch();

    const handleRemoveFromCart = (productId) => {
        dispatch(removeFromCart(productId));
    };


    const [cartData, setCartData] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const cartResponse = await axios.get('https://fakestoreapi.com/carts');

                const productIds = cartResponse.data.map((product) => product.userId);

                // Create an object to store the count of each product
                const productCountMap = {};

                // Count occurrences of each product ID
                for (const productId of productIds) {
                    if (productCountMap[productId]) {
                        productCountMap[productId]++;
                    } else {
                        productCountMap[productId] = 1;
                    }
                }

                // Fetch product details for each product ID
                const productDetails = [];
                for (const productId of Object.keys(productCountMap)) {
                    const productDetailResponse = await axios.get(`https://fakestoreapi.com/products/${productId}`);

                    // Duplicate the product details based on its count
                    const count = productCountMap[productId];
                    for (let i = 0; i < count; i++) {
                        productDetails.push(productDetailResponse.data);
                    }
                }

                // Set the cart data to the state with product details
                setCartData(productDetails);
            } catch (error) {
                // Handle any errors
                console.error('Error fetching cart items:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Shopping Cart</h1>
            <ul>
                {cartData.map((item, index) => (
                    <li key={`${item.id}-${index}`}>
                        {/* Display cart item details */}
                        <div className="font-bold text-2xl">{item.category}</div>
                        <img src={item.image} alt='image' className='w-[50%]' />
                        <h3 className='font-medium text-xl'>{item.title}</h3>
                        {item.name} - ${item.price}
                        <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Cart;
