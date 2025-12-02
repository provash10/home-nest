import React from 'react';
import { Link } from 'react-router';

const PropertyCard = ({property}) => {
    const { _id, name, category, short_description, location, price, image, postedBy } = property
    return (
         <div className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <img
                className="w-full h-44 sm:h-48 object-cover"
                src={image}
                alt={name}
            />
            <div className="p-3 m-2 text-center">
                <h2 className="text-lg font-bold text-black">{name}</h2>
                <p className="text-xl font-semibold p-2  text-black mb-1">{category}</p>
                <p className="text-black mb-2 p-2 text-sm">{short_description}</p>
                <div className="flex justify-between items-center mb-2 px-4">
                    <span className="text-black font-bold text-sm"> {price}</span>
                    <span className="text-black font-bold text-xs">{location}</span>
                </div>

              
                <div className='flex justify-between items-center gap-4'>
                    <Link to={`/property-details/${_id}`} className="flex-1 bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"> See Details</Link>
                    
                </div>
                <p className="text-xs text-black mt-2">Posted by {postedBy}</p>
            </div>

        </div>
    );
};

export default PropertyCard;