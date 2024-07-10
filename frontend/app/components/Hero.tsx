import React from 'react'

const Hero = () => {
  return (
    <div>
        <section className="hero bg-base-200 min-h-screen">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-green-600 mb-4">WELCOME to EGetWhy?</h1>
          <p className="text-lg mb-6">
            Connecting Nigerians through shared experiences and support. Join our community to gain advice, find job opportunities, share local knowledge, and make your voice heard.
          </p>
          <button className="btn btn-outline btn-primary">GET STARTED</button>
        </div>
      </section>
    </div>
  )
}

export default Hero