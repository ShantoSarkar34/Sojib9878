import React from "react";
import Link from "next/link";
import Image from "next/image";
import portfolio_1 from "../app/img/1.jpg";
import portfolio_2 from "../app/img/2.jpg";
import portfolio_3 from "../app/img/3.jpg";
import portfolio_4 from "../app/img/4.jpg";
import { GoArrowRight } from "react-icons/go";

const Work = () => {
  return (
    <section id="work" className="bg-[#0f0715] py-20 w-full relative">
      <div className="container mx-auto">
        <h1 className="text_gradient text-center text-[30px] lg:text-[45px] leading-[1.2] mb-[10px] lg:mb-[15px] font-bold">
          My Recent Works
        </h1>
        <p className="text-[16px] leading-[24px] text-[#dddddd] text-center lg:px-[22rem]">
          We put your ideas and thus your wishes in the form of a unique web
          project that inspires you and you customers.
        </p>
        <span className="portfolio-box"></span>
        {/* portfolio button start  */}
        <div className="my-20 flex justify-center">
          <div className="bg-[#050709] rounded-full overflow-hidden px-4">
            <div className="flex items-center gap-4">
              <button
                type="button"
                className="text-white text-[14px] py-[10px] px-[20px] bg-transparent portfolio_hover_bg 
                 overflow-hidden transition-all duration-300 rounded-[40px] "
              >
                All
              </button>
              <button
                type="button"
                className="text-white text-[14px] py-[10px] px-[20px] bg-transparent portfolio_hover_bg
                 overflow-hidden transition-all duration-300 rounded-[40px]"
              >
                UI/UX
              </button>
              <button
                type="button"
                className="text-white text-[14px] py-[10px] px-[20px] bg-transparent portfolio_hover_bg
                 overflow-hidden transition-all duration-300 rounded-[40px] "
              >
                Branding
              </button>
              <button
                type="button"
                className="text-white text-[14px] py-[10px] px-[20px] bg-transparent portfolio_hover_bg
                 overflow-hidden transition-all duration-300 rounded-[40px] "
              >
                Apps
              </button>
            </div>
          </div>
        </div>
        <div className="  grid gap-5 md:grid-cols-2">
          <div className="relative">
            <div className="portfolio-item">
              <Image src={portfolio_2} alt="portfolio" className="" />
              <div className="content-box ">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-[25px] lg:text-[30px] leading-[1.2] font-bold text-white">
                      Deloitte
                    </h2>
                    <p className="text-[16px] leading-[24px] text-[#dddddd]">
                      Project was about precision and information.
                    </p>
                  </div>
                  <GoArrowRight className="work_icon text-3xl lg:text-[34px] rotate-[-45deg] text-white" />
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="portfolio-item">
              <Image src={portfolio_1} alt="portfolio" className="" />
              <div className="content-box ">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-[25px] lg:text-[30px] leading-[1.2] font-bold text-white">
                      New Age
                    </h2>
                    <p className="text-[16px] leading-[24px] text-[#dddddd]">
                      Project was about precision and information.
                    </p>
                  </div>
                  <GoArrowRight className="work_icon text-3xl lg:text-[34px] rotate-[-45deg] text-white" />
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="portfolio-item">
              <Image src={portfolio_3} alt="portfolio" className="" />
              <div className="content-box ">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-[25px] lg:text-[30px] leading-[1.2] font-bold text-white">
                      Sevastian
                    </h2>
                    <p className="text-[16px] leading-[24px] text-[#dddddd]">
                      Project was about precision and information.
                    </p>
                  </div>
                  <GoArrowRight className="work_icon text-3xl lg:text-[34px] rotate-[-45deg] text-white" />
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="portfolio-item">
              <Image src={portfolio_4} alt="portfolio" className="" />
              <div className="content-box ">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-[25px] lg:text-[30px] leading-[1.2] font-bold text-white">
                      Mochinix
                    </h2>
                    <p className="text-[16px] leading-[24px] text-[#dddddd]">
                      Project was about precision and information.
                    </p>
                  </div>
                  <GoArrowRight className="work_icon text-3xl lg:text-[34px] rotate-[-45deg] text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Work;
