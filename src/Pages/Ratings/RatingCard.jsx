import React from 'react';
import { FaStar } from 'react-icons/fa';

const RatingCard = ({ rating }) => {
  const {
    propertyName,
    thumbnail,
    reviewText,
    reviewerName,
    reviewDate,
    rating: starRating,
  } = rating;

  const formattedDate = reviewDate ? new Date(reviewDate).toLocaleDateString() : '';

  return (
    <div className="flex flex-col md:flex-row gap-6 bg-white p-6 rounded-xl shadow hover:shadow-lg transition-all">
      {/* Property Image */}
      <div className="w-full md:w-1/3 h-48 md:h-auto overflow-hidden rounded-lg">
        <img
          src={thumbnail || 'https://via.placeholder.com/300x200?text=No+Image'}
          alt={propertyName}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Review Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{propertyName || 'Unknown Property'}</h3>
          <p className="text-gray-600 mt-2">{reviewText || 'No review text provided.'}</p>
          <p className="mt-2 flex items-center gap-1 text-yellow-500 font-bold text-lg">
            Rating: {starRating || 0} <FaStar />
          </p>
        </div>

        <div className="mt-4">
          <p className="font-semibold text-gray-800">{reviewerName || 'Anonymous'}</p>
          <p className="text-gray-500 text-sm">Reviewed on: {formattedDate}</p>
        </div>
      </div>
    </div>
  );
};

export default RatingCard;
