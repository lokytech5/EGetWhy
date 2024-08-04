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
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<VerificationData>({ resolver: zodResolver(verificationSchema) });
    const { mutate: verifyUser, isLoading, isError, isSuccess, error} = useVerify();
    const [verificationStatus, setVerificationStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const setIsVerified = useUserStore((state) => state.setIsVerified);
    const router = useRouter();

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
                <div className="text-center text-green-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1.707-5.293a1 1 0 011.414 0l3-3a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2z" clipRule="evenodd" />
                    </svg>
                    <p className="mt-2 text-lg">Verification successful! Redirecting to login...</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium">Email</label>
                        <input
                            id="email"
                            {...register('email')}
                            type="email"
                            className="p-2 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="code" className="block text-sm font-medium">Verification Code</label>
                        <input
                            id="code"
                            {...register('code')}
                            type="text"
                            className="p-2 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {errors.code && <p className="mt-1 text-xs text-red-600">{errors.code.message}</p>}
                    </div>
                    {verificationStatus === 'error' && (
                        <div className="text-center text-red-600">
                            <p className="mt-2 text-lg">Verification failed. Please try again.</p>
                            {error?.response?.data.error && <p className="mt-1 text-sm">{error.response.data.error}</p>}
                        </div>
                    )}
                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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