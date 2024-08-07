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
        setTimeout(() => {
            router.push('/');
        }, 2000)
    };

    return (
        <main className="bg-base-300 h-screen flex items-center justify-center">
            {isLoading || isSubmitting ? <Spinner /> : (
            <div className="grid w-full h-full grid-cols-1 bg-white box-anim md:grid-cols-2">
                <div className="bg-base-300 text-white flex items-center justify-center flex-col">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h6 className="mt-0 text-center text-2xl font-semibold leading-9 tracking-tight text-white">
                            Welcome Back
                        </h6>
                    </div>
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <p className='font-semibold pb-5'>Log in to your account</p>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        type="email"
                                        {...register('email')}
                                        className="p-2 block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 bg-gray-800"
                                    />
                                 {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                                        Password
                                    </label>
                                    <div className="text-sm">
                                        <a href="#" className="font-semibold text-green-600 hover:text-green-500">
                                            Forgot password?
                                        </a>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        type="password"
                                        {...register('password')}
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
                            Not a member?{' '}
                            <a href="/register" className="font-semibold leading-6 text-green-600 hover:text-green-500">
                                Register
                            </a>
                        </p>
                    </div>
                </div>

                <div className="relative hidden md:block">
                    <Image
                        className="object-cover justify-center"
                        fill={true}
                        src="/images/nigeria-login.webp"
                        alt="bg-image"
                    />
                </div>
            </div>
            )}
        </main>
    );
}

export default Login