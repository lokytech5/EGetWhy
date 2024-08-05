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

    // handle form submission
    const onSubmit = (data: FormData) => {
        console.log(data);
        registerUser(data, {
            onSuccess : () => {
                //Storing user email in local storage
                localStorage.setItem('email', data.email);
                setIsModalOpen(true);
            }
        })
    };

    //handle close modal
    const handleModalClose = () => {
        setIsModalOpen(false);
        router.push("/verify")
    }

    return (
        <main className="bg-base-300 h-screen flex items-center justify-center">
            {isLoading || isSubmitting ? <Spinner /> : (
            <div className="grid w-full h-full grid-cols-1 bg-white box-anim md:grid-cols-2">
                <div className="bg-base-300 text-white flex items-center justify-center flex-col">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h6 className="mt-0 text-center text-2xl font-semibold leading-9 tracking-tight text-white">
                            Register to EgetWhy
                        </h6>
                    </div>
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <p className='font-semibold pb-5'>Please enter your details</p>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div>
                                <label htmlFor="fullName" className="block text-sm font-medium leading-6 text-white">
                                    Full Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="fullName"
                                        {...register('fullName')}
                                        type="text"
                                        className="p-2 block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 bg-gray-800"
                                    />
                                    {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="username" className="block text-sm font-medium leading-6 text-white">
                                    Username
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="username"
                                        {...register('username')}
                                        type="text"
                                        className="p-2 block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 bg-gray-800"
                                    />
                                    {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        {...register('email')}
                                        type="email"
                                        autoComplete="email"
                                        className="p-2 block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 bg-gray-800
"
                                    />
                                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                                        Password
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        {...register('password')}
                                        type="password"
                                        className="p-2 block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 bg-gray-800"
                                    />
                                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                        <p className="mt-10 text-center text-sm text-gray-400">
                            Already have an account?{' '}
                            <a href="/login" className="font-semibold leading-6 text-green-600 hover:text-green-500">
                                Log in
                            </a>
                        </p>
                    </div>
                </div>

                <div className="relative hidden md:block">
                    <Image
                        className="object-cover justify-center"
                        fill={true}
                        src="/images/nigeria-register.webp"
                        alt="bg-image"
                    />
                </div>
                
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

export default Register