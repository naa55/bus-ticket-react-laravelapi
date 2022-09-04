import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [invalid, setInvalid] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        setLoading(!loading);
        // axios.get('http://localhost:8000/sanctum/csrf-cookie').then(response => {
        //     axios.post('/api/login', {email, password}).then(res => {
        //         if(res.data.status === 200) {
        //             localStorage.setItem('auth-token', res.data.token);
        //             localStorage.setItem('auth_name', res.data.username);
        //             alert(res.data.message)
        //             navigate('/')
        //         } 
    
        //         if(res.data.status === 401) {
        //             alert(res.data.errors)
        //         }
        //     })
        //     .catch((error) => {
        //         setErrors(Object.entries(error.response.data.errors));
        //     });
        // })
        // axios.get('http://localhost:8000/sanctum/csrf-cookie').then(response => {
            axios.post('/api/login', {email, password}).then(res => {
                if(res.data.status === 200) {
                    localStorage.setItem('auth-token', res.data.token);
                    localStorage.setItem('auth_name', res.data.username);
                    localStorage.setItem('auth_id', res.data.id);
                    setLoading(loading);
                    alert(res.data.message)
                    navigate('/')
                } 
    
                if(res.data.status === 401) {
                    setInvalid(res.data.message)
                    console.log(res.data)
                }
            })
            .catch((error) => {
                setErrors(Object.entries(error.response.data.errors));
            });

        // })

    };

    // const handleSpinner = () => {
    //     return (
    //         <div>Hello</div>
    //     )
    // }
    return (
        <div className="w-full md:mx-auto  sm:max-w-md mt-12 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg mb-12">
             <p className="text-red-500">{invalid}</p>

            {errors.length > 0 && (
                <div>
                    <div className="font-medium text-red-600">
                        Whoops! Something went wrong.
                    </div>
                    <ul class="mt-3 mb-4 list-disc list-inside text-sm text-red-600">
                        {errors.map((error, index) => {
                            return <li key={index}>{error[1][0]}</li>;
                        })}
                    </ul>
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div>
                    <label
                        htmlFor="email"
                        className="block font-medium text-sm text-gray-700"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        className="block mt-1 w-full p-2 bg-gray-100 rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        autoFocus
                    />
                </div>

                {/* Password */}
                <div className="mt-4">
                    <label
                        htmlFor="password"
                        className="block font-medium text-sm text-gray-700"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        className="block mt-1 w-full p-2 bg-gray-100 rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            
                    />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150 ml-3"
                    >
                        Log in
                    </button>
                    {/* <button type="submit" disabled={loading && true}  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
                        {errors ? '':<svg role="status" className="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                        </svg>}
                        Login
                    </button> */}
                </div>
                <div className="">
                    <Link
                        to="/register"
                        className="flex items-center px-3 py-2 text-blue-600 hover:underline"
                    >
                        Create an account
                    </Link>
                </div>
            </form>
        </div>
    );
}
