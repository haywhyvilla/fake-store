"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';



const Products = () => {

    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [cartResponse, setCartResponse] = useState(null);

    const addToCart = (product) => {

        setCart([...cart, product]);

        // Send a POST request to add the product to the cart API
        axios.post('https://fakestoreapi.com/carts', { productId: product.id })
            .then(response => {
                // Set the cart response state to display the API response
                setCartResponse(response.data);
                console.log(response)
            })
            .catch(error => {
                console.error('Error adding to cart:', error);
            });
    };



    useEffect(() => {
        axios.get('https://fakestoreapi.com/products')
            .then(response => {
                setProducts(response.data);
                console.log(response.data)
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, []);


    return (
        <div className='p-9'>
            <h1 className='text-center font-bold text-5xl my-2'>Product List</h1>

            <div className='grid grid-cols-3 gap-3'>
                {products.map(product => (

                    <div key={product.id} className='mb-3'>
                        <h2 className='font-bold text-2xl'>{product.category}</h2>
                        <p>Description:{product.description}</p>
                        <img src={product.image} alt='image' className='w-[30%]' />
                        <h3 className='font-medium text-xl'>{product.title}</h3>
                        <div className='flex justify-between items-center pr-12'>
                            <h4 className='font-medium text-xl'>Price: {product.price}</h4>
                            <button onClick={() => addToCart(product)} className='bg-black text-white p-2 rounded-md'>Add to Cart</button>
                        </div>
                    </div>


                ))}
            </div>

        </div>
    )
}

export default Products