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
  const imageSrc = thumbnail || 'https://via.placeholder.com/300x200?text=No+Image';

  return (
    <div className="flex flex-col md:flex-row gap-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition-all">
      
      {/* Property image */}
      <div className="w-full md:w-1/3 h-48 md:h-auto overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
        <img
          src={imageSrc}
          alt={propertyName}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Rating info */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{propertyName || 'Unknown Property'}</h3>
          <p className="text-gray-600 dark:text-gray-300 mt-2">{reviewText || 'No review text provided.'}</p>
          <p className="mt-2 flex items-center gap-1 text-yellow-500 font-bold text-lg">
            Rating: {starRating || 0} <FaStar />
          </p>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <div>
            <p className="font-semibold text-gray-800 dark:text-gray-100">{reviewerName || 'Anonymous'}</p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Reviewed on: {formattedDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingCard;
