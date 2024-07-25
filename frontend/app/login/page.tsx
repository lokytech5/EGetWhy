import Image from 'next/image';

const login = () => {
    return (
        <main className="bg-base-300 h-screen flex items-center justify-center">
            <div className="grid w-full h-full grid-cols-1 bg-white box-anim md:grid-cols-2">
                <div className="bg-base-300 text-white flex items-center justify-center flex-col">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h6 className="mt-0 text-center text-2xl font-semibold leading-9 tracking-tight text-white">
                            Welcome Back
                        </h6>
                    </div>
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <p className='font-semibold pb-5'>Log in to your account</p>
                        <form action="#" method="POST" className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        autoComplete="email"
                                        className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 bg-gray-800
"
                                    />
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
                                        name="password"
                                        type="password"
                                        required
                                        autoComplete="current-password"
                                        className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 bg-gray-800"
                                    />
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
                            <a href="#" className="font-semibold leading-6 text-green-600 hover:text-green-500">
                                Sign Up
                            </a>
                        </p>
                    </div>
                </div>

                <div className="relative hidden md:block">
                    <Image
                        className="object-cover justify-center"
                        fill={true}
                        src="/nigeria-login.webp"
                        alt="bg-image"
                    />
                </div>
            </div>
        </main>
    );
}

export default login