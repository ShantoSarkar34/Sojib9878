import React from "react";
import { GoArrowRight } from "react-icons/go";

const Service = () => {
  return (
    <section id="service" className="bg-[#050709] w-full py-20">
      <div className="container mx-auto">
        <h1 className="text_gradient text-center text-[30px] lg:text-[45px] leading-[1.2] mb-[10px] lg:mb-[15px] font-bold">
          My Quality Services
        </h1>
        <p className="text-[16px] leading-[24px] text-[#dddddd] text-center lg:px-[22rem]">
          We put your ideas and thus your wishes in the form of a unique web
          project that inspires you and you customers.
        </p>

        <div className="  pt-20">
          <div className="flex flex-col lg:flex-row justify-between lg:items-center bg-transparent service_bg_active border-b border-[#2a1454] p-4 lg:py-10 lg:px-10 gap-y-4 text-white transition-all duration-100 relative cursor-pointer">
            <div className="flex flex-col gap-4 md:flex-row lg:items-center flex-wrap md:gap-10">
              <span className=" text-[20px] font-bold transition-all">01</span>
              <h3 className="font-bold text-[25px] lg:text-[30px] leading-[1.2] text-white uppercase">
                Branding Design
              </h3>
            </div>
            <div className="lg:pr-72">
              <p className="text-[16px] leading-[24px] text-[#dddddd]">
                I break down complex user experinece problems to create <br />
                integritiy focussed solutions that connect billions of people
              </p>
              <div className=" absolute top-5 md:top-[40%] right-[5%]">
                <GoArrowRight className="text-3xl lg:text-[34px] rotate-[-45deg]" />
              </div>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row justify-between lg:items-center bg-transparent service_bg border-b border-[#2a1454] p-4 lg:py-10 lg:px-10 gap-y-4 text-[#8750f7] hover:text-white transition-all duration-100 relative cursor-pointer">
            <div className="flex flex-col gap-4 md:flex-row lg:items-center flex-wrap md:gap-10">
              <span className=" text-[20px] font-bold transition-all">02</span>
              <h3 className="font-bold text-[25px] lg:text-[30px] leading-[1.2] text-white uppercase">
                Web Design
              </h3>
            </div>
            <div className="lg:pr-72">
              <p className="text-[16px] leading-[24px] text-[#dddddd]">
                I break down complex user experinece problems to create <br />
                integritiy focussed solutions that connect billions of people
              </p>
              <div className=" absolute top-5 md:top-[40%] right-[5%]">
                <GoArrowRight className="arrow-direction-change text-3xl lg:text-[34px] rotate-[45deg] transition-all duration-500" />
              </div>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row justify-between lg:items-center bg-transparent service_bg border-b border-[#2a1454] p-4 lg:py-10 lg:px-10 gap-y-4 text-[#8750f7] hover:text-white transition-all duration-100 relative cursor-pointer">
            <div className="flex flex-col gap-4 md:flex-row lg:items-center flex-wrap md:gap-10">
              <span className=" text-[20px] font-bold transition-all">03</span>
              <h3 className="font-bold text-[25px] lg:text-[30px] leading-[1.2] text-white uppercase">
                UI/UX Design
              </h3>
            </div>
            <div className="lg:pr-72">
              <p className="text-[16px] leading-[24px] text-[#dddddd]">
                I break down complex user experinece problems to create <br />
                integritiy focussed solutions that connect billions of people
              </p>
              <div className=" absolute top-5 md:top-[40%] right-[5%]">
                <GoArrowRight className="arrow-direction-change text-3xl lg:text-[34px] rotate-[45deg] transition-all duration-500" />
              </div>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row justify-between lg:items-center bg-transparent service_bg border-b border-[#2a1454] p-4 lg:py-10 lg:px-10 gap-y-4 text-[#8750f7] hover:text-white transition-all duration-100 relative cursor-pointer">
            <div className="flex flex-col gap-4 md:flex-row lg:items-center flex-wrap md:gap-10">
              <span className=" text-[20px] font-bold transition-all">04</span>
              <h3 className="font-bold text-[25px] lg:text-[30px] leading-[1.2] text-white uppercase">
                Grapich Design
              </h3>
            </div>
            <div className="lg:pr-72">
              <p className="text-[16px] leading-[24px] text-[#dddddd]">
                I break down complex user experinece problems to create <br />
                integritiy focussed solutions that connect billions of people
              </p>
              <div className=" absolute top-5 md:top-[40%] right-[5%]">
                <GoArrowRight className="arrow-direction-change text-3xl lg:text-[34px] rotate-[45deg] transition-all duration-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Service;
