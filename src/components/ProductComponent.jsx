"use client"
import { useSelector } from "react-redux";
import Link from "next/link";






const ProductComponent = () => {
    const products = useSelector((state) => state.allProducts.products);
    const renderList = products.map((product) => {
        const { id, title, image, price, category, } = product;
        return (
            <div className="bg-[#C9C8D3] px-6 py-4 rounded mb-4" key={id}>
                <Link href={`/product/${id}`}>
                    <div className="mb-3">
                        <div className="font-bold text-2xl">{category}</div>
                        <div className="card">
                            <img src={image} alt='image' className='w-[50%]' />
                            <h3 className='font-medium text-xl'>{title}</h3>

                            <div className='flex justify-between items-center pr-12'>
                                <h4 className='font-medium text-xl'>Price: ${price}</h4>
                                <button className='bg-black text-white p-2 rounded-md'>Add to Cart</button>
                            </div>

                        </div>
                    </div>
                </Link>
            </div>
        );
    });


    return <div className="md:grid block grid-cols-3 gap-4 px-8" >{renderList}</div>;
}

export default ProductComponent