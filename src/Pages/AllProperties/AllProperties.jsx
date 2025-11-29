import React from 'react';

const AllProperties = () => {
    return (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
//   {properties.map(property => (
//     <div key={property._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
//       <img src={property.image} alt={property.name} className="w-full h-48 object-cover"/>
//       <div className="p-4">
//         <h2 className="text-lg font-semibold mb-1">{property.name}</h2>
//         <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">{property.category}</span>
//         <p className="text-gray-700 mt-2 font-medium">Price: ${property.price}</p>
//         <p className="text-gray-500 text-sm mt-1"><i className="fas fa-map-marker-alt"></i> {property.location}</p>
//         <p className="text-gray-400 text-xs mt-1">Posted by: {property.userName}</p>
//         <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors">
//           See Details
//         </button>
//       </div>
//     </div>
//   ))}
// </div>
<div className="min-h-screen bg-gray-50">
  {/* Page Title */}
  <div className="bg-white shadow py-8 text-center">
    <h1 className="text-3xl font-bold text-gray-800">All Properties</h1>
    <p className="text-gray-500 mt-2">Browse & Discover Your Dream Property</p>
  </div>

  {/* Filter / Search Section */}
  <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 bg-gray-100 gap-3">
    <div className="relative w-full sm:w-1/3">
  <input
    type="text"
    placeholder="Search by Property Name"
    className="w-full p-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
  />
  <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400">
    🔍
  </span>
</div>
    <select className="w-full sm:w-1/5 p-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
      <option>All Categories</option>
      <option>Rent</option>
      <option>Sale</option>
      <option>Commercial</option>
      <option>Land</option>
    </select>
    <select className="w-full sm:w-1/5 p-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
      <option>All Locations</option>
      <option>City A</option>
      <option>City B</option>
      <option>City C</option>
    </select>
    <button className="w-full sm:w-1/6 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
      Search
    </button>
  </div>

  {/* Properties Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
    {[...Array(8)].map((_, index) => (
      <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <div className="h-48 bg-gray-200 flex items-center justify-center text-gray-400 text-lg">
          Image
        </div>
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-1">Property Name</h2>
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Category</span>
          <p className="text-gray-700 mt-2 font-medium">Price: $123,000</p>
          <p className="text-gray-500 text-sm mt-1">📍 Location</p>
          <p className="text-gray-400 text-xs mt-1">Posted by: User Name</p>
          <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors">
            See Details
          </button>
        </div>
      </div>
    ))}
  </div>

  {/* Pagination Mockup */}
  <div className="flex justify-center my-8 gap-2">
    <button className="px-3 py-1 bg-white border rounded hover:bg-gray-100">1</button>
    <button className="px-3 py-1 bg-white border rounded hover:bg-gray-100">2</button>
    <button className="px-3 py-1 bg-white border rounded hover:bg-gray-100">3</button>
    <button className="px-3 py-1 bg-white border rounded hover:bg-gray-100">Next</button>
  </div>
</div>

    );
};

export default AllProperties;