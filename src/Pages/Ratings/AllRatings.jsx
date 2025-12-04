import React from 'react';
import { useLoaderData } from 'react-router';
import RatingCard from './RatingCard';

const AllRatings = () => {
    const data = useLoaderData();
    console.log(data)
    const ratings = data;
    
    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-center mb-8">All Ratings</h2>

            {ratings.length === 0 ? (
                <p className="text-center text-gray-500">No ratings available.</p>
            ) : (
                <div className="flex flex-col gap-6">
                    {ratings.map((rating) => (
                        <RatingCard key={rating._id} rating={rating} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllRatings;
