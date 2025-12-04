import React from 'react';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router';

const RatingCard = ({ rating }) => {

    const { propertyName, thumbnail, reviewText, reviewerName, reviewDate, reviewTime, rating: starRating } = rating;

    return (
        <div className="flex gap-10 bg-white p-6 rounded-xl shadow hover:shadow-lg transition-all h-48">


            <div className="w-1/2 h-full overflow-hidden rounded-lg">
                <img
                    src={thumbnail}
                    alt={propertyName}
                    className="w-full h-full object-cover"
                />
            </div>


            <div className="w-1/2 flex flex-col justify-between">
                <div>
                    <h3 className="text-xl font-semibold text-gray-800">{propertyName}</h3>
                    <p className="text-gray-600 mt-1">{reviewText}</p>
                    <p className="mt-2">
                        <span className='flex items-center gap-1 text-xl  text-yellow-500 font-bold'>Rating: {starRating} <FaStar /></span>
                    </p>

                </div>

                <div className="flex justify-between items-center mt-4">
                    <div>
                        <p className="font-semibold text-gray-800">{reviewerName}</p>
                        <p className="text-gray-500 text-sm">
                            Reviewed on: {reviewDate} at {reviewTime}
                        </p>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default RatingCard;
