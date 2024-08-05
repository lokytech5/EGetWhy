"use client"
import React, { useEffect, useState } from 'react'
import { VerificationData, verificationSchema } from '../utils/zodSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Spinner from '../components/Spinner';
import { useVerify } from '../hooks/useVerify';
import { useUserStore } from '../components/useUserStore';
import { useRouter } from 'next/navigation';

const VerifyPage = () => {
    const email = typeof window !== 'undefined' ? localStorage.getItem('email') || '' : '';
    const { register, handleSubmit, formState: { errors, isSubmitting }, setValue } = useForm<VerificationData>({ resolver: zodResolver(verificationSchema), defaultValues: {email} });
    const { mutate: verifyUser, isLoading, isError, isSuccess, error} = useVerify();
    const [verificationStatus, setVerificationStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const setIsVerified = useUserStore((state) => state.setIsVerified);
    const router = useRouter();

    if(email) {
        setValue('email', email);  
    }

    useEffect(() => {
        if(isSuccess) {
            setVerificationStatus('success');
            setIsVerified(true);
            setTimeout(() => {
                router.push('/login')
            }, 2000);
        } else if(isError) {
            setVerificationStatus('error');
        }
    }, [isSuccess, isError, router, setIsVerified]);

    const onSubmit = (data: VerificationData) => {
        //handle submit logic here
        verifyUser(data)
    }

   
    
  return (
    <main className="bg-base-300 h-screen flex items-center justify-center">
    {isLoading || isSubmitting ? (
        <Spinner />
    ) : (
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow">
            <h2 className="text-2xl font-bold text-center">Verify Your Account</h2>
            {verificationStatus === 'success' ? (
                <div className="text-center text-green-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1.707-5.293a1 1 0 011.414 0l3-3a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2z" clipRule="evenodd" />
                    </svg>
                    <p className="mt-2 text-lg">Verification successful! Redirecting to login...</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">Email</label>
                        <div className="mt-2">
                        <input
                            id="email"
                            {...register('email')}
                            type="email"
                            className="p-2 block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 bg-gray-800"
                            readOnly
                        />
                        {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="code" className="block text-sm font-medium leading-6 text-white">Verification Code</label>
                        <div>
                        <input
                            id="code"
                            {...register('code')}
                            type="text"
                            className="p-2 block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 bg-gray-800"
                            />
                        {errors.code && <p className="text-xs text-red-500 mt-1">{errors.code.message}</p>}
                        </div>
                    </div>
                    {verificationStatus === 'error' && (
                        <div className="text-center text-red-500">
                            <p className="mt-2 text-lg">Verification failed. Please try again.</p>
                            {error?.response?.data.error && <p className="mt-1 text-sm">{error.response.data.error}</p>}
                        </div>
                    )}
                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                            Verify
                        </button>
                    </div>
                </form>
            )}
        </div>
    )}
</main>
  )
}

export default VerifyPage