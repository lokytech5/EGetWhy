import Hero from "./components/Hero";
import HomePageBanner from "./components/HomePageBanner";


export default function Home() {
  return (
    <>
      <HomePageBanner />

      {/* Hero Section */}
      <Hero/>

      {/* Local Knowledge Sharing Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">Local Knowledge Sharing</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 shadow-lg rounded-lg bg-gray-50">
              <h3 className="text-2xl font-bold mb-2">Local Insight 1</h3>
              <p>Details about the local knowledge or cultural wisdom shared.</p>
            </div>
            <div className="p-6 shadow-lg rounded-lg bg-gray-50">
              <h3 className="text-2xl font-bold mb-2">Local Insight 2</h3>
              <p>Details about the local knowledge or cultural wisdom shared.</p>
            </div>
            <div className="p-6 shadow-lg rounded-lg bg-gray-50">
              <h3 className="text-2xl font-bold mb-2">Local Insight 3</h3>
              <p>Details about the local knowledge or cultural wisdom shared.</p>
            </div>
          </div>
          
        </div>
      </section>

      

      

      {/* Call to Action Section */}
      <section className="bg-white py-20 text-black">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Join the EGetWhy? Community</h2>
          <p className="text-lg mb-6">
            Become a part of our supportive network. Share your story, find support, and connect with others.
          </p>
          <div className="flex justify-center space-x-4">
            <a href="/register" className="btn bg-green-600 hover:bg-base-300 hover:border-green-600 hover:text-green-600 ">Register Now</a>
          </div>
        </div>
      </section>
    </>
  );
}
