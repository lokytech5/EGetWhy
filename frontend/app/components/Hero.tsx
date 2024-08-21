import React from 'react';
import Image from 'next/image';

const Hero = () => {
  return (
    <section className="hero bg-base-300 min-h-screen">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-1 gap-4 p-6">
        <div className="flex flex-col p-0 md:p-8">
          {/* Welcome Section */}
          <div className='flex items-center justify-center'>
            <h2 className="text-2xl md:text-5xl font-bold text-green-600 mb-4 mr-4 text-center">
              Welcome to EGetWhy
            </h2>
            <Image
              className="object-cover"
              width={60}
              height={60}
              src="/images/Egetwhy-logo.webp"
              alt="bg-image"
            />
          </div>

          {/* Tagline Section */}
          <div className="mt-4 md:mt-10 lg:mt-14 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className='text-1xl md:text-2xl'>
                Connecting Nigerians through shared experiences and support.
              </p>
              <br />
              <p className='text-1xl md:text-2xl'>
                Join our community to gain advice, find job opportunities, share local knowledge, and make your voice heard.
              </p>
            </div>

            {/* Video Section */}
            <div className='text-center'>
              <video autoPlay muted loop className="w-full h-auto rounded-lg">
                <source src='/videos/Video-intro.mp4' type='video/mp4'></source>
              </video>
            </div>
          </div>
        </div>
      </div>

      

     
    </section>
  )
}

export default Hero;
