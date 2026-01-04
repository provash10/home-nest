import React, { use } from 'react';
import ServiceCard from './ServiceCard';

const Services = ({ servicesPromise }) => {
  const services = use(servicesPromise);

  return (
    <section className="py-4 bg-white dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-4">

        <div className="text-center mb-14">
          <h3 className="text-4xl font-bold text-slate-800 dark:text-white">
            Our Services
          </h3>
          <p className="mt-3 text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            Professional services designed to simplify your property journey.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map(service => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Services;
