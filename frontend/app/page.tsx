import Hero from "./components/Hero";
import HomePageBanner from "./components/HomePageBanner";
import Image from "next/image";


export default function Home() {
  return (
    <>
      <HomePageBanner />

      {/* Hero Section */}
      <Hero/>

      {/* Additional Section - Trending Hashtags / Discussions */}
      <div className="container mx-auto py-12">
        <h3 className="text-2xl md:text-4xl font-bold text-center mb-6">
          #Trending on EGetWhy
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h4 className="text-lg font-semibold mb-2">#JobScarcity</h4>
            <p>Explore discussions around the job market in Nigeria and find expert advice on improving job prospects.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h4 className="text-lg font-semibold mb-2">#FinancialChallenges</h4>
            <p>Gain insights into dealing with financial issues, and discover local solutions to transaction problems.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h4 className="text-lg font-semibold mb-2">#CommunitySupport</h4>
            <p>Join the conversation on mutual support, tackling societal issues, and making your voice heard.</p>
          </div>
        </div>
      </div>

      

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

      

       {/* Community/Engagement Section */}
       <div className="container mx-auto py-12 bg-base-100">
        <h3 className="text-2xl md:text-4xl font-bold text-center mb-6">
          Why Join EGetWhy? Community
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-6">
            <Image
              src="/images/community-icon.png"
              alt="Community"
              width={50}
              height={50}
              className="mx-auto"
            />
            <h4 className="text-xl font-semibold mt-4">Community and Support</h4>
            <p className="mt-2">Connect with others, share your experiences, and get the support you need.</p>
          </div>
          <div className="p-6">
            <Image
              src="/images/info-icon.png"
              alt="Info"
              width={50}
              height={50}
              className="mx-auto"
            />
            <h4 className="text-xl font-semibold mt-4">Actionable Information</h4>
            <p className="mt-2">Get expert advice and insights on common issues like job scarcity and financial challenges.</p>
          </div>
          <div className="p-6">
            <Image
              src="/images/engagement-icon.png"
              alt="Engagement"
              width={50}
              height={50}
              className="mx-auto"
            />
            <h4 className="text-xl font-semibold mt-4">Engagement and Interaction</h4>
            <p className="mt-2">Engage in meaningful conversations and build networks that can help you professionally and personally.</p>
          </div>
        </div>
      </div>
    </>
  );
}
