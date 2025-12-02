import React from 'react';
import { FaBackward } from 'react-icons/fa';
import { Link, useLoaderData } from 'react-router';


const PropertyDetails = () => {
  const data = useLoaderData();
  console.log(data) //checked
  const property = data?.result;

  if (!property) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">


        <div>
          <div className="w-full h-[380px] rounded-xl overflow-hidden shadow">
            <img
              src={property?.image}
              alt="property image"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="mt-6 bg-white p-5 rounded-xl shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Description</h2>
            <p className="text-gray-600 leading-relaxed">
              {property.description}
            </p>
          </div>
        </div>


        <div className="bg-white rounded-xl shadow p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {property.name}
          </h1>

          <p className="text-gray-600 leading-relaxed mb-6">
            {property.short_description}
          </p>

          <div className="space-y-4">
            <div className="flex items-center justify-between border-b pb-2">
              <span className="font-medium text-gray-600">Category :</span>
              <span className="text-gray-800 font-semibold">{property.category}</span>
            </div>
            <div className="flex items-center justify-between border-b pb-2">
              <span className="font-medium text-gray-600">Price:</span>
              <span className="text-gray-800 font-semibold">{property.price}</span>
            </div>
            <div className="flex items-center justify-between border-b pb-2">
              <span className="font-medium text-gray-600">Location:</span>
              <span className="text-gray-800 font-semibold">{property.location}</span>
            </div>

            <div className="border rounded-lg p-4 flex items-center gap-3 mt-4 bg-gray-50">
              <img
                src={property?.image}
                className="w-12 h-12 rounded-full object-cover border"
                alt=""
              />
              <div>
                <p className="text-sm text-gray-500">Posted by</p>
                <p className="text-lg font-semibold text-gray-800">{property.userName}</p>
                <p className="text-sm text-gray-600">{property.userEmail}</p>
              </div>
              <div className="ml-auto text-right">
                <p className="text-sm text-gray-500">Posted on</p>
                <p className="text-lg font-semibold text-gray-700">{property.createdAt}</p>
              </div>
            </div>

            <div className='flex justify-center'>
              <Link to='/all-properties' className="px-4 text-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white p-2 rounded-2xl text-lg font-semibold hover:scale-105 transform transition-all shadow-lg flex items-center gap-2">
                <FaBackward /> Back
              </Link>
            </div>

            <div className="flex gap-2 mt-5 justify-between">
              <Link to={`/update-property/${property._id}`} className="px-8 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700">
                Update
              </Link>
              <button className="px-8 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>


      {/* rating & review */}
      <div className="max-w-4xl mx-auto mt-12 bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Ratings & Reviews</h2>



        <div className="mb-6 border rounded-lg p-4 bg-gray-50">
          <div className="flex flex-col md:flex-row gap-6">


            <div className="md:w-2/3">
              <label className="block text-gray-700 font-medium mb-2">
                Write a Review:
              </label>
              <textarea
                className="w-full border rounded p-3 h-32"
                placeholder="Share your experience..."
              ></textarea>
            </div>


            <div className="md:w-1/3 flex flex-col justify-start gap-4 mt-4">
              <div>
                <label className="block text-gray-700 font-medium">
                  Rating (1-5):
                </label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  className="border w-full p-2 rounded"
                  placeholder="Rate"
                />
              </div>

              <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Submit Review
              </button>
            </div>

          </div>
        </div>



        <div className="space-y-4">


          <div className="border p-4 rounded-lg">
            <div className="flex justify-between">
              <p className="font-semibold text-gray-800">Michael Brown</p>
              <p className="text-yellow-500 font-bold"> star</p>
            </div>
            <p className="text-gray-600 text-sm mt-1">
              Very beautiful home with peaceful environment, absolutely worth visiting.
            </p>
            <p className="text-xs text-gray-500 mt-2">Reviewed on: 14 Nov 2024</p>
          </div>

          <div className="border p-4 rounded-lg">
            <div className="flex justify-between">
              <p className="font-semibold text-gray-800">Sarah Lee</p>
              <p className="text-yellow-500 font-bold">star</p>
            </div>
            <p className="text-gray-600 text-sm mt-1">
              Good location, interior design is premium, recommended.
            </p>
            <p className="text-xs text-gray-500 mt-2">Reviewed on: 15 Nov 2024</p>
          </div>

        </div>
      </div>

    </div>
  );
};

export default PropertyDetails;