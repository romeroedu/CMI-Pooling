import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential);
                navigate("/dashboard");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const Header = ({ heading, paragraph, linkName, linkUrl }) => (
        <div className="mb-6">
            <div className="flex justify-center">
                <img alt="Cummins Logo" className="h-14 w-14" src="./cummins_logo.png" />
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                {heading}
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
                {paragraph}{" "}
                <a href={linkUrl} className="font-medium text-red-600 hover:text-red-500">
                    {linkName}
                </a>
            </p>
        </div>
    );

    return (
        <div className="flex flex-col items-center justify-center flex-grow bg-gray-100">
            <div className="w-full max-w-md p-6 space-y-6 bg-white rounded-lg shadow-md">
                <Header
                    heading="CMI Pooling Login"
                    paragraph="New User?"
                    linkName="Sign Up Here"
                    linkUrl="/signup"
                />
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700" htmlFor="username">
                            Cummins Username
                        </label>
                        <input
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            id="username"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                            Cummins Password
                        </label>
                        <input
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                        />
                    </div>
                    <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
