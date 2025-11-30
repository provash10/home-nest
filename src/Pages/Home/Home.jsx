import React, { useState } from 'react';
import { useLoaderData } from 'react-router';

const Home = () => {
    const [search, setSearch] = useState('');
    const data = useLoaderData();
    // console.log(data);
    const properties = data || [];


    const filteredProperties = properties.filter(property =>
        property.name.toLowerCase().includes(search.toLowerCase()) ||
        property.category.toLowerCase().includes(search.toLowerCase()) ||
        property.location.toLowerCase().includes(search.toLowerCase())
    );
    return (
        <div>
            <div className="flex justify-between items-center m-8">
                    <h1 className='text-2xl text-black font-bold'>
                        Properties Found <span className='text-blue-600 text-xl font-bold'>({filteredProperties.length})</span>
                    </h1>
                    <input
                        type="text"
                        placeholder="Search by name, category or location..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="p-2 border border-gray-600 rounded-lg w-64 placeholder-gray-500"
                    />
                </div>
        </div>
    );
};

export default Home;
