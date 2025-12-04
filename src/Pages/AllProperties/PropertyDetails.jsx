import React, { use, useState } from 'react';
import { FaBackward } from 'react-icons/fa';
import { Link, useLoaderData, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Contexts/AuthContext/AuthContext';


const PropertyDetails = () => {
  const data = useLoaderData();
  console.log(data) //checked
  const property = data?.result;
  const navigate = useNavigate();
  const {user} = use(AuthContext);

  const [reviewText, setReviewText] = useState('');
  const [ratingValue, setRatingValue] = useState(0);

  if (!property) {
    return <p>Loading...</p>;
  }

  const handleDeleteProperty = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {

        fetch(`http://localhost:3000/properties/${property._id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },

          // body: formData  -->400 showing
          // body: JSON.stringify(formData)
        })
          .then(res => res.json())
          .then(data => {
            console.log(data)
            navigate('/all-properties')
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
          })
          .catch(err => {
            console.log(err)
          })
      }
    });
  }

  const handleSubmitReview = async () => {
    if (!reviewText || ratingValue === 0) {
      alert("Please enter review text and rating");
      return;
    }

    const reviewData = {
      userEmail: user.email,
      reviewerName: user.name,
      propertyId: property._id,
      propertyName: property.name,
      thumbnail: property.image,
      rating: ratingValue,
      reviewText,
      reviewDate: new Date().toISOString().split('T')[0],
      reviewTime: new Date().toLocaleTimeString()
    };

    try {
      const res = await fetch('http://localhost:3000/ratings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewData)
      });
      const data = await res.json();
      if (data.success) {
        Swal.fire("Success!", "Your review has been submitted.", "success");
        setReviewText('');
        setRatingValue(0);
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", "Failed to submit review.", "error");
    }
  };

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
              <button onClick={handleDeleteProperty} className="px-8 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>


      {/* rating & review */}
   
      <div className="max-w-4xl mx-auto mt-12 bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Write a Review</h2>
        <div className="mb-6 border rounded-lg p-4 bg-gray-50 flex flex-col md:flex-row gap-6">
          <div className="md:w-2/3">
            <label className="block text-gray-700 font-medium mb-2">Review:</label>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className="w-full border rounded p-3 h-32"
              placeholder="Share your experience..."
            />
          </div>
          <div className="md:w-1/3 flex flex-col justify-start gap-4 mt-4">
            <label className="block text-gray-700 font-medium">Rating (1-5):</label>
            <input
              type="number"
              min="1"
              max="5"
              value={ratingValue}
              onChange={(e) => setRatingValue(Number(e.target.value))}
              className="border w-full p-2 rounded"
              placeholder="Rate"
            />
            <button onClick={handleSubmitReview} className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Submit Review</button>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link to='/all-ratings' className="text-center px-8 py-4 bg-green-600 text-white text-xl rounded-lg hover:bg-green-700">
            See All Ratings
          </Link>
        </div>
        
      </div>
    </div>
  );
};

export default PropertyDetails;