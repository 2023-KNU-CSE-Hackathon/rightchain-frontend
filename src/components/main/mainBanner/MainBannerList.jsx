import React, { useState, useEffect } from "react";
import * as S from "./style";
import Banner from "./Banner";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "./pagination.css";

import b2gPoster from "./img/b2gPoster.jpg";
import b2gPosterMobile from "./img/b2gPosterMobile.png";
import hackathon from "./img/hackathon.png";
import hackathonMobile from "./img/hackathonMobile.png";

import { Link } from "react-router-dom";

function MainBannerList() {
  const bannersDesktop = [
    { img: b2gPoster, url: "https://www.moe.go.kr/main.do?s=moe" },
    { img: hackathon, url: "https://computer.knu.ac.kr/bbs/board.php?bo_table=sub5_1&wr_id=27600&page=3" }
  ];
  const bannersMobile = [
    { img: b2gPosterMobile, url: "https://www.moe.go.kr/main.do?s=moe" },
    { img: hackathonMobile, url: "https://computer.knu.ac.kr/bbs/board.php?bo_table=sub5_1&wr_id=27600&page=3" }
  ];

  const [currentBanners, setCurrentBanners] = useState(bannersDesktop);
  //윈도우가 640px 이하면  모바일버전을 연다
  const resizingHandler = () => {
    if (window.innerWidth <= 550) {
      setCurrentBanners(bannersMobile);
    } else {
      setCurrentBanners(bannersDesktop);
    }
  };

  useEffect(() => {
    if (window.innerWidth <= 550) {
      setCurrentBanners(bannersMobile);
    }
    window.addEventListener("resize", resizingHandler);

    return () => {
      window.removeEventListener("resize", resizingHandler);
    };
  }, []);

  return (
    <>
      <S.BannerListWrapper>
        <Swiper
          slidesPerView={1}
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
        >
          {currentBanners.map((banner, idx) => (
            <SwiperSlide key={idx}>
              <Link to={banner.url} target="_blank">
                <Banner bannerImg={banner.img} />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </S.BannerListWrapper>
    </>
  );
}

export default MainBannerList;
