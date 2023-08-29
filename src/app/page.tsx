"use client";
import Banner from "@/components/Banner";
import Fruits from "@/components/Fruits";
import HotDishes from "@/components/HotDishes";
import NewsFood from "@/components/NewsFood";

//  const Fruits = React.lazy(import("@/components/Fruits"))

export default function Home() {
  return (
    <>
      <main className="grid grid-cols-1 md:grid-cols-[45%_55%] gap-x-[10px] lg:gap-x-[20px] xl:gap-x-[140px] pt-[90px] px-7 md:px-16 w-screen relative">
        <Banner />
        <NewsFood />
        <img
          src="/img/heroBg.png"
          width={410}
          className=" absolute top-[80px] right-[64px] z-[-1]"
        />
      </main>
      <div className=" px-7 md:px-16 w-screen">
        <Fruits />
        <HotDishes />
      </div>
    </>
  );
}
