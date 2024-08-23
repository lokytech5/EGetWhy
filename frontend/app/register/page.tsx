/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, FormData } from '../utils/zodSchemas';
import { useRegister } from '../hooks/useRegister';
import Spinner from '../components/Spinner';
import { useRouter } from 'next/navigation';
import CustomModal from '../components/CustomModal';

const Register = () => {
    const { register, handleSubmit, formState: { errors, isSubmitting }, } = useForm<FormData>({ resolver: zodResolver(registerSchema),});
    const { mutate: registerUser, isLoading, isError: _isError, error: _error } = useRegister();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();

    const onSubmit = (data: FormData) => {
        registerUser(data, {
            onSuccess : () => {
                localStorage.setItem('email', data.email);
                setIsModalOpen(true);
            }
        })
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        router.push("/verify")
    }

    return (
        <main className="bg-gray-100 h-screen flex items-center justify-center pt-4 pb-4">
            {isLoading || isSubmitting ? <Spinner /> : (
            <div className="flex flex-col w-full max-w-md p-8 bg-white rounded-lg shadow-lg space-y-6">
                
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-700">Join the EGetWhy? Community</h1>
                    <p className="text-sm text-gray-600 mt-2">Create your account and start your journey with us.</p>
                    <p className="text-sm text-gray-600 mt-2">Already have an account? <a href="/login" className="text-purple-600 hover:underline">Sign in</a></p>
                </div>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input
                            id="fullName"
                            {...register('fullName')}
                            type="text"
                            className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                        />
                        {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            id="username"
                            {...register('username')}
                            type="text"
                            className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                        />
                        {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                        <input
                            id="email"
                            {...register('email')}
                            type="email"
                            autoComplete="email"
                            className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            id="password"
                            {...register('password')}
                            type="password"
                            className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                        />
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-400 to-blue-500 rounded-md shadow-sm hover:bg-gradient-to-l focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                        >
                            Create Account
                        </button>
                    </div>
                </form>
            </div>
            )}
            <CustomModal
             title="Registration Successful"
             message="Please check your email for a verification code."
             isOpen={isModalOpen}
             onClose={handleModalClose}
             onConfirm={handleModalClose}
             />
        </main>
    );
}

export default Register;
