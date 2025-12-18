import React from 'react';

const ServiceCard = ({ service }) => {
    const { title, description } = service;

    return (
        <div className="max-w-sm w-full bg-white shadow-lg rounded-2xl p-6 mx-auto hover:shadow-2xl transition-shadow duration-300">
            <h3 className="font-semibold text-gray-900 text-xl mb-2">{title}</h3>
            <p className="text-gray-700 text-sm leading-relaxed">{description}</p>
        </div>
    );
};

export default ServiceCard;
