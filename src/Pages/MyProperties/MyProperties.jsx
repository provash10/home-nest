import React from 'react';
import Card from '../../Components/Uiverse/Card';

const MyProperties = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-10 px-5">
      <h1 className="text-3xl font-bold text-center mb-8">My Properties</h1>
     
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

       
    
         <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
          <img
            src="https://i.ibb.co/y89y5cF/house.jpg"
            alt="Property 1"
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">Cozy Apartment</h2>
            <p className="text-gray-600 text-sm mb-1">Category: Rent</p>
            <p className="text-gray-600 text-sm mb-1">Price: $500</p>
            <p className="text-gray-600 text-sm mb-1">Location: Dhaka, Banani</p>
            <p className="text-gray-400 text-xs mb-4">Posted: 30-11-2025</p>

            <div className="flex justify-between">
              <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                Update
              </button>
              <button className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
                Delete
              </button>
            </div>

            <button className="mt-3 w-full bg-gray-200 text-gray-800 py-1 rounded hover:bg-gray-300">
              View Details
            </button>
          </div>
        </div>


       
        <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
          <img
            src="https://i.ibb.co/2nXKxvT/villa.jpg"
            alt="Property 2"
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">Luxury Villa</h2>
            <p className="text-gray-600 text-sm mb-1">Category: Sale</p>
            <p className="text-gray-600 text-sm mb-1">Price: $120000</p>
            <p className="text-gray-600 text-sm mb-1">Location: Chittagong, Foy’s Lake</p>
            <p className="text-gray-400 text-xs mb-4">Posted: 25-11-2025</p>

            <div className="flex justify-between">
              <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                Update
              </button>
              <button className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
                Delete
              </button>
            </div>

            <button className="mt-3 w-full bg-gray-200 text-gray-800 py-1 rounded hover:bg-gray-300">
              View Details
            </button>
          </div>
        </div>

       
        <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
          <img
            src="https://i.ibb.co/3z5Y5cF/commercial.jpg"
            alt="Property 3"
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">Commercial Space</h2>
            <p className="text-gray-600 text-sm mb-1">Category: Commercial</p>
            <p className="text-gray-600 text-sm mb-1">Price: $25000</p>
            <p className="text-gray-600 text-sm mb-1">Location: Dhaka, Gulshan</p>
            <p className="text-gray-400 text-xs mb-4">Posted: 20-11-2025</p>

            <div className="flex justify-between">
              <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                Update
              </button>
              <button className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
                Delete
              </button>
            </div>

            <button className="mt-3 w-full bg-gray-200 text-gray-800 py-1 rounded hover:bg-gray-300">
              View Details
            </button>
          </div>
        </div>

      </div>
    
      
    </div>
    );
};

export default MyProperties;