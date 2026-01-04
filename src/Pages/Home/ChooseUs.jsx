import React from 'react';
import { FaCheckCircle, FaShieldAlt, FaThumbsUp, FaMobileAlt, FaUsers, FaClock } from 'react-icons/fa';

const WhyChooseUs = () => {
  const features = [
    {
      icon: <FaCheckCircle />,
      title: "Verified Listings",
      description: "All properties are verified for authenticity so you can trust what you see."
    },
    {
      icon: <FaShieldAlt />,
      title: "Secure Transactions",
      description: "We ensure safe and secure communication between buyers and sellers."
    },
    {
      icon: <FaThumbsUp />,
      title: "Easy to Use",
      description: "Simple and intuitive interface for searching, adding, or managing properties."
    },
    {
      icon: <FaMobileAlt />,
      title: "Mobile Friendly",
      description: "Fully responsive design for smooth experience on mobile and tablet devices."
    },
    {
      icon: <FaUsers />,
      title: "Community Support",
      description: "Join a large community of buyers, sellers, and real estate enthusiasts."
    },
    {
      icon: <FaClock />,
      title: "Quick Updates",
      description: "Stay updated with the latest property listings and instant notifications."
    }
  ];

  return (
    <section className="py-4 bg-gray-50 dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-3 text-slate-800 dark:text-white">
          Why Choose Us
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto">
          Discover why thousands of users trust HomeNest for their real estate needs.
        </p>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="
                group bg-white dark:bg-slate-800
                p-8 rounded-2xl border border-slate-200 dark:border-slate-700
                transition-all duration-300
                hover:-translate-y-1 hover:border-blue-500
              "
            >
              <div className="w-14 h-14 flex items-center justify-center rounded-xl
                bg-blue-50 dark:bg-blue-900/30 mb-6 mx-auto
                text-blue-600 dark:text-blue-400 text-2xl
                group-hover:scale-105 transition">
                {feature.icon}
              </div>

              <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


export default WhyChooseUs;
