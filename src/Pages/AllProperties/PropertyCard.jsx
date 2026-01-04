import React from 'react';
import { Link } from 'react-router';

const PropertyCard = ({ property }) => {
  const {
    _id,
    name,
    category,
    short_description,
    location,
    price,
    image,
    postedBy,
  } = property;

  return (
    <div
      className="
        h-full bg-white dark:bg-slate-800
        border border-slate-200 dark:border-slate-700
        rounded-2xl overflow-hidden
        transition-all duration-300
        hover:-translate-y-1 hover:border-blue-500
      "
    >
      <div className="relative h-48">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />

        <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
          {category}
        </span>
      </div>

      <div className="p-5 flex flex-col h-[calc(100%-12rem)]">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-1 line-clamp-1">
          {name}
        </h3>

        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
          {short_description}
        </p>

        <div className="flex justify-between items-center text-sm text-slate-600 dark:text-slate-400 mb-4">
          <span className="font-medium text-slate-800 dark:text-white">
            $ {price}
          </span>
          <span>{location}</span>
        </div>

        {/* C=cta */}
        <Link
          to={`/property-details/${_id}`}
          className="
            mt-auto block text-center
            bg-blue-600 hover:bg-blue-700
            text-white py-2.5 rounded-xl
            text-sm font-medium transition
          "
        >
          View Details
        </Link>

        {/* footer */}
        <p className="mt-3 text-xs text-slate-500 dark:text-slate-400 text-center">
          Posted by {postedBy}
        </p>
      </div>
    </div>
  );
};

export default PropertyCard;
