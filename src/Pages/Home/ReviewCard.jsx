import React from 'react';

const ReviewCard = ({review}) => {
    const {name, review: testimonial,address} = review;

    return (
        <div className="max-w-sm w-full bg-white shadow-lg rounded-2xl p-6 mx-auto hover:shadow-2xl transition-shadow duration-300">

    
      <p className="text-gray-700 text-sm mb-6 leading-relaxed">{testimonial}</p>

    
      <div className="border-t border-gray-200 mb-4"></div>

      
      <div className="flex items-center gap-4">

        <div>
          <h3 className="font-semibold text-gray-900">{name}</h3>
          <p className="text-xs text-gray-500">{address}</p>
        </div>
      </div>
    </div>
    );
};

export default ReviewCard;