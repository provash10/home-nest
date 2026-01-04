import React, { useContext, useState } from 'react';
import { FaArrowLeft, FaStar } from 'react-icons/fa';
import { Link, useLoaderData, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Contexts/AuthContext/AuthContext';
import toast from 'react-hot-toast';

const PropertyDetails = () => {
  const data = useLoaderData();
  const property = data?.result;
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [reviewText, setReviewText] = useState('');
  const [ratingValue, setRatingValue] = useState(0);

  if (!property) return null;

  const handleDeleteProperty = () => {
    Swal.fire({
      title: 'Delete Property?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2563eb',
      cancelButtonColor: '#dc2626',
      confirmButtonText: 'Delete',
    }).then(result => {
      if (result.isConfirmed) {
        fetch(`https://homenest-server-ten.vercel.app/properties/${property._id}`, {
          method: 'DELETE',
        })
          .then(() => {
            toast.success('Property deleted');
            navigate('/all-properties');
          })
          .catch(() => toast.error('Delete failed'));
      }
    });
  };

  const handleSubmitReview = async () => {
    if (!reviewText || ratingValue === 0) {
      toast.error('Please add review and rating');
      return;
    }

    const reviewData = {
      reviewerEmail: user.email,
      reviewerName: user.name,
      propertyId: property._id,
      propertyName: property.name,
      rating: ratingValue,
      reviewText,
    };

    try {
      const res = await fetch(
        'https://homenest-server-ten.vercel.app/ratings',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(reviewData),
        }
      );
      const data = await res.json();
      if (data.success) {
        toast.success('Review submitted');
        setReviewText('');
        setRatingValue(0);
      }
    } catch {
      toast.error('Failed to submit review');
    }
  };

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-4">

        <Link
          to="/all-properties"
          className="inline-flex items-center gap-2 text-sm text-blue-600 mb-6"
        >
          <FaArrowLeft /> Back to properties
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* nmage & description */}
          <div>
            <div className="rounded-2xl overflow-hidden border mb-6">
              <img
                src={property.image}
                alt={property.name}
                className="w-full h-[420px] object-cover"
              />
            </div>

            <div className="bg-white dark:bg-slate-800 border rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-white">
                Description
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {property.description}
              </p>
            </div>
          </div>

          {/* Info */}
          <div className="bg-white dark:bg-slate-800 border rounded-2xl p-6">
            <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-3">
              {property.name}
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              {property.short_description}
            </p>

            <div className="space-y-4 text-sm">
              <Info label="Category" value={property.category} />
              <Info label="Price" value={property.price} />
              <Info label="Location" value={property.location} />
            </div>

            <div className="mt-6 border rounded-xl p-4 flex items-center gap-4">
              <img
                src={property.image}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="text-xs text-slate-500">Posted by</p>
                <p className="font-semibold text-slate-800 dark:text-white">
                  {property.userName}
                </p>
                <p className="text-xs text-slate-500">{property.userEmail}</p>
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <Link
                to={`/update-property/${property._id}`}
                className="flex-1 text-center py-2 rounded-xl border border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                Update
              </Link>
              <button
                onClick={handleDeleteProperty}
                className="flex-1 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mt-16 bg-white dark:bg-slate-800 border rounded-2xl p-6">
          <h3 className="text-2xl font-bold mb-6 text-slate-800 dark:text-white">
            Write a Review
          </h3>

          <textarea
            value={reviewText}
            onChange={e => setReviewText(e.target.value)}
            placeholder="Share your experience..."
            className="w-full border rounded-xl p-4 mb-4 bg-transparent"
          />

        <p className='font-bold'>Select Your Review by click Star: </p>
          <div className="flex items-center gap-2 mb-4">   
            {[1, 2, 3, 4, 5].map(star => (
              <FaStar
                key={star}
                onClick={() => setRatingValue(star)}
                className={`cursor-pointer ${
                  star <= ratingValue ? 'text-amber-400' : 'text-slate-400'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleSubmitReview}
            className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
          >
            Submit Review
          </button>
        </div>
      </div>
    </section>
  );
};

const Info = ({ label, value }) => (
  <div className="flex justify-between border-b pb-2">
    <span className="text-slate-500">{label}</span>
    <span className="font-medium text-slate-800 dark:text-white">{value}</span>
  </div>
);

export default PropertyDetails;
