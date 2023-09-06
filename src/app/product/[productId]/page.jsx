"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { selectedProduct, removeSelectedProduct } from '@/src/redux/actions/productActions';
import { addToCart } from '@/src/redux/actions/cartActions';
import { storeToken } from '@/src/redux/actions/authActions';
import Link from 'next/link';
import { useRouter } from 'next/navigation';



const ProductDetails = ({ params }) => {
    const router = useRouter();
    console.log(params)
    const productId = params.productId
    console.log(productId)
    let product = useSelector((state) => state.product);
    const { image, title, price, category, description } = product;
    const dispatch = useDispatch();
    const fetchProductDetail = async (id) => {
        const response = await axios
            .get(`https://fakestoreapi.com/products/${id}`)
            .catch((err) => {
                console.log("Err: ", err);
            });
        dispatch(selectedProduct(response.data));
    };

    useEffect(() => {
        if (productId && productId !== "") fetchProductDetail(productId);
        return () => {
            dispatch(removeSelectedProduct());
        };
    }, [productId]);


    const handleAddToCart = () => {

        dispatch(addToCart(product));


        const cartData = {
            userId: 5,
            date: '2020-02-03',
            products: [
                {
                    productId: product.id,
                    quantity: 1,
                },
            ],
        };


        axios.post('https://fakestoreapi.com/carts', cartData)
            .then((response) => {

                console.log(response.data);
            })
            .catch((error) => {

                console.error('Error adding to cart:', error);
            });
    };


    const handleNavigateToCart = () => {
        // Make the API call to obtain the token
        axios
            .post('https://fakestoreapi.com/auth/login', {
                username: 'mor_2314',
                password: '83r5^_',
            })
            .then((res) => res.data)
            .then((data) => {
                // Assuming the API response contains a token field
                const { token } = data;

                // Dispatch the storeToken action to store the token in Redux
                dispatch(storeToken(token));

                // Redirect to the login page
                router.push('/login');
            })
            .catch((error) => {
                // Handle any errors
                console.error('Error fetching token:', error);
            });
    };



    return (
        <div className='mt-12'>
            <Link href={"/login"} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full transition duration-300 ease-in-out">
                Go to Cart
            </Link>
            <div className="flex justify-center items-center" >

                {Object.keys(product).length === 0 ? (
                    <div>...Your cart is Empty</div>
                ) : (
                    <div className="bg-gray-200 p-4 md:w-[60%] w-full">
                        <div>
                            {/* <div className="border-r-2 border-gray-400 text-center">
                <span className="text-2xl">AND</span>
            </div> */}
                            <div className="md:grid grid-cols-2 gap-1 items-center">
                                <div className="w-1/2">
                                    <img className="w-full" src={image} alt={title} />
                                </div>
                                <div className="w-1/2">
                                    <h1 className="text-2xl font-bold">{title}</h1>
                                    <h2 className="text-green-500">${price}</h2>
                                    <h3 className="text-brown-500 font-semibold">{category}</h3>
                                    <p>{description}</p>
                                    <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full transition duration-300 ease-in-out" onClick={handleAddToCart}>
                                        Add to Cart
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>

                )}

            </div>

        </div>

    )
}

export default ProductDetails