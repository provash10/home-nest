import React, { Suspense, useState } from 'react';
import { useLoaderData } from 'react-router';
import PropertyCard from '../AllProperties/PropertyCard';
import ChooseUs from './ChooseUs';
import Banner from './Banner';
import Reviews from './Reviews';
import Services from './Services';


const reviewPromise = fetch('/reviews.json').then(res=>res.json());
const servicesPromise = fetch('/services.json').then(res=>res.json());

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
            <Banner></Banner>
            <div className='text-center text-3xl font-bold mt-5 underline'>
                Featured Property
            </div>

            <div className="flex justify-between items-center mb-5">
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

            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {
                    data.map(property => <PropertyCard key={property._id} property={property}></PropertyCard>)
                }
            </div>

            <ChooseUs></ChooseUs>
            {/* <Reviews reviewPromise={reviewPromise}></Reviews> */}
             <Suspense fallback={<p className="text-center my-10">Loading Reviews...</p>}>
        <Reviews reviewPromise={reviewPromise} />
      </Suspense>

      <Suspense fallback={<p className="text-center my-10">Loading Services...</p>}>
        <Services servicesPromise={servicesPromise}></Services>
      </Suspense>
         

        </div>
    );
};

export default Home;
