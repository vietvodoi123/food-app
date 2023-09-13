"use client";
import React, { Suspense } from "react";
import Banner from "@/components/home/Banner";
const Fruits = React.lazy(() => import("../components/home/Fruits"));
const HotDishes = React.lazy(() => import("../components/home/HotDishes"));
import NewsFood from "@/components/home/NewsFood";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Loading from "@/components/ui/Loading";

export default function Home() {
  return (
    <>
      <main className="grid grid-cols-1 md:grid-cols-[45%_55%] gap-x-[10px] lg:gap-x-[20px] xl:gap-x-[140px] pt-[90px] px-7 md:px-16 w-screen relative">
        <Banner />
        <NewsFood />
        <LazyLoadImage
          src="/img/heroBg.png"
          width={410}
          effect="blur"
          wrapperClassName=" absolute top-[80px] right-[64px] z-[-1]"
        />
      </main>
      <div className=" px-7 md:px-16 w-screen">
        <Suspense fallback={<Loading />}>
          <Fruits />
        </Suspense>
        <Suspense fallback={<Loading />}>
          <HotDishes />
        </Suspense>
      </div>
    </>
  );
}
