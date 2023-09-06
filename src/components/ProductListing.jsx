"use client"
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import ProductComponent from "./ProductComponent";
import { setProducts } from "../redux/actions/productActions"
import axios from "axios";



const ProductListing = () => {
    const products = useSelector((state) => state.allProducts.products);

    
    const dispatch = useDispatch();
    const fetchProducts = async () => {
        const response = await axios
            .get("https://fakestoreapi.com/products")
            .catch((err) => {
                console.log("Err: ", err);
            });
        dispatch(setProducts(response.data));
    };


    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        // <div className='p-9'>
        //     <h1 className='text-center font-bold text-5xl my-2'>Product List</h1>

        //     <div className='grid grid-cols-3 gap-3'>
        //         {products.map(product => (

        //             <div key={product.id} className='mb-3'>
        //                 <h2 className='font-bold text-2xl'>{product.category}</h2>
        //                 <p>Description:{product.description}</p>
        //                 <img src={product.image} alt='image' className='w-[30%]' />
        //                 <h3 className='font-medium text-xl'>{product.title}</h3>
        //                 <div className='flex justify-between items-center pr-12'>
        //                     <h4 className='font-medium text-xl'>Price: {product.price}</h4>
        //                     <button onClick={() => addToCart(product)} className='bg-black text-white p-2 rounded-md'>Add to Cart</button>
        //                 </div>
        //             </div>


        //         ))}
        //     </div>

        // </div>

        <div>
            <ProductComponent />
        </div>
    )
}

export default ProductListing