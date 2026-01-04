import React, { use } from 'react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import ReviewCard from './ReviewCard';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

const Reviews = ({ reviewPromise }) => {
  const reviews = use(reviewPromise);

  return (
    <section className="py-4 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-4">
        
        <div className="text-center mb-14">
          <h3 className="text-4xl font-bold text-slate-800 dark:text-white">
            What Our Clients Say
          </h3>
          <p className="mt-3 text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            Real experiences from verified users who found their perfect place with us.
          </p>
        </div>

        <Swiper
          loop
          grabCursor
          centeredSlides
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          effect="coverflow"
          coverflowEffect={{
            rotate: 20,
            stretch: 0,
            depth: 120,
            modifier: 1,
            slideShadows: false,
          }}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          modules={[EffectCoverflow, Pagination, Autoplay]}
        >
          {reviews.map(review => (
            <SwiperSlide key={review._id} className="pb-12">
              <ReviewCard review={review} />
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
};

export default Reviews;

