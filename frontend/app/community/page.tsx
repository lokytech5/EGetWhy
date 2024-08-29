"use client"
import React, { useState } from 'react';

// Dummy data for communities
const dummyCommunities = [
  {
    communityId: '1',
    name: 'Confession',
    members: '178K',
    description: 'A place to share your confessions anonymously.',
    emoji: '😳🤐',
    image: '/path/to/confession-image.jpg',
  },
  {
    communityId: '2',
    name: 'Job Referrals!',
    members: '534K',
    description: 'Best way to get your foot in the door with your favorite company!',
    emoji: '',
    image: '/path/to/job-referrals-image.jpg',
  },
  {
    communityId: '3',
    name: 'Politics Talk',
    members: '250K',
    description: 'Discuss the latest political news and events.',
    emoji: '',
    image: '/path/to/politics-image.jpg',
  },
  {
    communityId: '4',
    name: 'Personal Finance',
    members: '180K',
    description: 'Get advice and share tips on managing personal finances.',
    emoji: '',
    image: '/path/to/finance-image.jpg',
  },
];

const CommunitiesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter communities based on the search term
  const filteredCommunities = dummyCommunities.filter(community =>
    community.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen p-8 bg-gradient-to-r from-blue-50 via-purple-50 to-blue-100">
      <h1 className="text-3xl font-bold text-center mb-8">Explore Communities</h1>

      {/* Search Bar */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search communities..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md p-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Community Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCommunities.map((community) => (
          <div key={community.communityId} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-200">
            <img src={community.image} alt={community.name} className="w-full h-40 object-cover" />
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{community.name}</h2>
              <p className="text-sm text-gray-500 mb-4">{community.members} Members</p>
              <p className="text-sm text-gray-700 mb-4">{community.description}</p>
              <div className="flex justify-between">
                <button className="btn btn-outline btn-sm hover:bg-gray-100 transition duration-200">Preview</button>
                <button className="btn btn-primary btn-sm hover:bg-blue-600 transition duration-200">Join</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Communities Found */}
      {filteredCommunities.length === 0 && (
        <div className="text-center mt-16">
          <p className="text-lg text-gray-600">No communities found. Try a different search.</p>
        </div>
      )}
    </div>
  );
};

export default CommunitiesPage;
