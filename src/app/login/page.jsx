"use client"

import { useSelector, useDispatch } from 'react-redux';
import { storeToken } from '@/src/redux/actions/authActions';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);




    const handleLogin = async (e) => {
        e.preventDefault();

        // Fetch user token from the server upon successful authentication
        try {
            const response = await fetch('https://fakestoreapi.com/auth/login', {
                method: 'POST',
                body: JSON.stringify({
                    username: 'mor_2314',
                    password: '83r5^_',
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                const userToken = data.token;

                // Store the token in Redux
                dispatch(storeToken(userToken));

                // Redirect to the cart page upon successful login
                router.push('/carts');
            } else {
                // Handle authentication error
                console.error('Authentication failed');
            }
        } catch (error) {
            // Handle other errors
            console.error('Error during login:', error);
        }
    };

    // If the user is already authenticated, redirect to the cart page
    if (token) {
        router.push('/carts');
        return null; // You can render a loading message here if needed
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-2xl font-semibold mb-4">Login</h1>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            className="border border-gray-400 rounded-md py-2 px-3 w-full"
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Enter your username"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="border border-gray-400 rounded-md py-2 px-3 w-full"
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out"
                        type="submit"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
