import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import bannerImg1 from "../../assets/bannerImg1.webp";
import bannerImg2 from "../../assets/bannerImg2.webp";
import bannerImg3 from "../../assets/bannerImg3.webp";
import bannerImg4 from "../../assets/bannerImg4.webp";
import bannerImg5 from "../../assets/bannerImg5.webp";

const slides = [
  bannerImg1,
  bannerImg2,
  bannerImg3,
  bannerImg4,
  bannerImg5,
];

const Banner = () => {
  return (
    <section className="relative">
      <Carousel
        autoPlay
        infiniteLoop
        interval={4000}
        showThumbs={false}
        showStatus={false}
        swipeable
      >
        {slides.map((img, index) => (
          <div key={index} className="relative h-[60vh] md:h-[70vh]">
            {/* background image */}
            <img
              src={img}
              className="h-full w-full object-cover"
              alt="Hero Banner"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

            {/* Content */}
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-6xl mx-auto px-6 text-left">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-2xl">
                  Find Your Perfect Place to Call Home
                </h1>
                <p className="mt-4 text-gray-200 max-w-xl">
                  Explore verified properties, trusted sellers, and seamless
                  real estate experiences tailored just for you.
                </p>

                <div className="mt-6 flex gap-4">
                  <button className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition">
                    Explore Listings
                  </button>
                  <button className="px-6 py-3 rounded-xl border border-white/70 text-white hover:bg-white/10 transition">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-sm opacity-80 animate-bounce">
        ↓ Scroll
      </div>
    </section>
  );
};

export default Banner;
