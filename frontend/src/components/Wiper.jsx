import React from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "../styles/Wiper.css";

function Wiper() {
  return (
    <div style={{ padding: "0.1rem" }}>
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        <SwiperSlide>
          <div className="swipe" id="swipe1">
            <div className="contents">
              <h1 className="contentHeading">Evolution of EV cars</h1>
              <p className="contentDes">The concept of the electric car is not new. In fact, they predate gasoline-powered vehicles! However, early challenges with battery technology and lack of charging infrastructure limited their widespread use. The latter half of the 20th century saw a renewed interest in electric vehicles due to environmental concerns, but charging options remained scarce.</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="swipe" id="swipe2">
            <div className="contents">
              <h1 className="contentHeading">switching to EV cars</h1>
              <p className="contentDes">There are compelling reasons to consider switching to an electric vehicle. First and foremost, electric cars are champions for the environment. They produce zero tailpipe emissions, contributing to cleaner air and a healthier planet. Additionally, electric vehicles boast lower operating costs as electricity is generally cheaper than gasoline.  Furthermore, electric motors are more efficient, meaning you can travel farther on a single charge compared to a gasoline car.</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="swipe" id="swipe3">
            <div className="contents">
              <h1 className="contentHeading">Additional considerations for electric car ownership</h1>
              <p className="contentDes">While electric car charging technology is progressing rapidly, the availability of charging stations, particularly DC Fast Chargers for long journeys, is still a factor to consider.  Additionally, it's important to understand battery range and potential degradation over time.  However, the good news is that battery technology is constantly evolving, offering greater range and improved longevity.</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="swipe" id="swipe4">
            <div className="contents">
              <h1 className="contentHeading">Do u know?</h1>
              <p className="contentDes">Electric vehicles are actually more efficient at capturing energy from their fuel source than gasoline cars.
              which translates to Reduced Emissions: Since they use the energy source more efficiently, electric vehicles produce significantly fewer emissions overall
              Extended Range: By capturing more usable energy from their "fuel," electric vehicles can potentially achieve a greater driving range on a single charge compared to a gasoline car</p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Wiper;
