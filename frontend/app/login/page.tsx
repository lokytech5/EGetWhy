/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import Image from 'next/image';
import { useLogin } from '../hooks/useLogin';
import { LoginFormData, loginSchema } from '../utils/zodSchemas';
import { useForm } from 'react-hook-form';
import Spinner from '../components/Spinner';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

const Login = () => {
    const { register, handleSubmit, formState: { errors, isSubmitting }, } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema),});
    const { mutate: loginUser, isLoading, isError: _isError, error: _error } = useLogin();
    const router = useRouter();

    const onSubmit = (data: LoginFormData) => {
        console.log(data);
        loginUser(data);
    };

    return (
        <main className="bg-gray-100 h-screen flex items-center justify-center">
            {isLoading || isSubmitting ? <Spinner /> : (
            <div className="flex flex-col w-full max-w-md p-8 bg-white rounded-lg shadow-lg space-y-6">
                
                <div className="text-center">
                    <h1 className="text-2xl font-extrabold  text-gray-700">Welcome Back to EGetWhy?</h1>
                    <p className="text-sm text-gray-600 mt-2">Access your account, stay connected, and never miss out!</p>
                    <p className="text-sm text-gray-600 mt-2">Don't have an account? <a href="/register" className="text-purple-600 hover:underline">Sign up</a></p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                        <input
                            id="email"
                            type="email"
                            {...register('email')}
                            className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <a href="#" className="text-sm text-purple-600 hover:underline">Forgot Password?</a>
                        </div>
                        <input
                            id="password"
                            type="password"
                            {...register('password')}
                            className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                        />
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-400 to-blue-500 rounded-md shadow-sm hover:bg-gradient-to-l focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                        >
                            Sign In
                        </button>
                    </div>
                </form>
            </div>
            )}
        </main>
    );
}

export default Login;
