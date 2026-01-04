import React from 'react';
import { useLoaderData } from 'react-router';
import RatingCard from './RatingCard';

const AllRatings = () => {
  const ratings = useLoaderData();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8 dark:text-gray-100">
        All Ratings
      </h2>

      {ratings.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 text-lg">
          No ratings available.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ratings.map((rating) => (
            <RatingCard key={rating._id} rating={rating} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllRatings;
