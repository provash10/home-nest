import React, { useState } from 'react';
import { useLoaderData } from 'react-router';
import PropertyCard from './PropertyCard';

const AllProperties = () => {
  const data = useLoaderData();
  const [search, setSearch] = useState('');

  console.log(data);

  const term = search.trim().toLocaleLowerCase();
  const filteredProperties = term
    ? data.filter(property =>
      property.name.toLowerCase().includes(term) ||
      property.category.toLowerCase().includes(term) ||
      property.location.toLowerCase().includes(term)
    )
    : data;

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center my-4 gap-2 sm:gap-0">
        <h2 className="text-2xl font-bold">
          Properties Found <span className="text-blue-600 text-xl">({filteredProperties.length})</span>
        </h2>

        <input
          type="text"
          placeholder="Search by name, category or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg w-full sm:w-64"
        />
      </div>

      <div>
        <h3 className="text-2xl text-center font-bold">All Properties</h3>
        <p className=" text-center ">Choose Your Best</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {
          data.map(property=><PropertyCard key={property._id} property={property}></PropertyCard>)
        }
      </div>
            

    </div>
  );
};

export default AllProperties;