'use client';
import Link from 'next/link';
import { HiOutlineArrowRight } from 'react-icons/hi';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

export default function Banner() {
  const slides = [
    {
      title: 'Discover Your',
      highlight: 'Perfect Aesthetic',
      desc: 'Curated collection of premium tiles that transform spaces into masterpieces.',
      img: 'https://images.unsplash.com/photo-1723639903901-a9fe1ca85774?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      title: 'Elegance in',
      highlight: 'Every Detail',
      desc: 'From rustic stone to modern geometric, find the style that speaks to you.',
      img: 'https://images.unsplash.com/photo-1684928440146-0c3fda3f5b3f?q=80&w=1045&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  ];

  return (
    <section className="h-[70vh] md:h-[85vh] relative w-full">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        autoplay={{ delay: 5000 }}
        pagination={{ clickable: true }}
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full flex items-center justify-center">
              <div className="absolute inset-0 bg-slate-900/50 z-10"></div>
              <img
                src={slide.img}
                className="absolute inset-0 w-full h-full object-cover"
                alt="Banner"
              />

              <div className="relative z-20 text-center text-white px-6 max-w-4xl animate__animated animate__fadeInUp">
                <h1 className="text-4xl md:text-7xl font-black mb-6 tracking-tighter uppercase leading-tight">
                  {slide.title} <br />
                  <span className="text-primary">{slide.highlight}</span>
                </h1>
                <p className="text-sm md:text-xl mb-10 opacity-90 font-medium max-w-2xl mx-auto">
                  {slide.desc}
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link
                    href="/all-tiles"
                    className="btn btn-primary btn-lg rounded-2xl px-10 gap-3 shadow-2xl shadow-primary/40"
                  >
                    Browse Now <HiOutlineArrowRight size={20} />
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
