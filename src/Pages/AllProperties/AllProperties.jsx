import React, { useState } from 'react';
import { useLoaderData } from 'react-router';
import PropertyCard from './PropertyCard';
import { FaSearch } from 'react-icons/fa';

const AllProperties = () => {
  const data = useLoaderData();
  const [search, setSearch] = useState('');

  const term = search.trim().toLowerCase();
  const filteredProperties = term
    ? data.filter(property =>
        property.name.toLowerCase().includes(term) ||
        property.category.toLowerCase().includes(term) ||
        property.location.toLowerCase().includes(term)
      )
    : data;

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          <div>
            <h2 className="text-4xl font-bold text-slate-800 dark:text-white">
              Explore Properties
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              {filteredProperties.length} properties available
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, category or location"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                w-full pl-11 pr-4 py-3 rounded-xl
                border border-slate-300 dark:border-slate-700
                bg-white dark:bg-slate-800
                text-slate-800 dark:text-white
                placeholder-slate-400
                focus:outline-none focus:ring-2 focus:ring-blue-500
              "
            />
          </div>
        </div>

        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProperties.map(property => (
              <PropertyCard
                key={property._id}
                property={property}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              No properties found matching your search.
            </p>
          </div>
        )}

      </div>
    </section>
  );
};

export default AllProperties;
