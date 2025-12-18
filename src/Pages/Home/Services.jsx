import React, { use } from 'react';
import ServiceCard from './ServiceCard';

const Services = ({ servicesPromise }) => {
    const services = use(servicesPromise);

    return (
        <div className="my-24">
            <div className="text-center mb-12">
                <h3 className="text-3xl font-bold my-8">Our Services</h3>
                <p>Key services to help you with your property needs</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {services.map(service => (
                    <ServiceCard key={service.id} service={service} />
                ))}
            </div>
        </div>
    );
};

export default Services;
