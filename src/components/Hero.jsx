import React from "react";
import Link from "next/link";
import Image from "next/image";
import hero_img from "../app/img/hero_img.png";
import { FaTwitter, FaDribbble, FaLinkedinIn, FaGithub } from "react-icons/fa";
import CountUp from "react-countup";

const Hero = () => {
  return (
    <section className="bg-[#0f0715] w-full relative overflow-hidden z-[1] pt-20 lg:pt-32 pb-[50px] text_animation">
      {/* gradient start  */}
      <div className="before_gradient hero-section"></div>
      {/* text animation start  */}
      <div className="intro_text">
        <svg viewBox="0 0 1320 300">
          <text x="50%" y="50%" textAnchor="middle" className="animate-stroke">
            HI
          </text>
        </svg>
      </div>
      {/* text animation end  */}
      <div className="container mx-auto ">
        {/* content start  */}
        <div className="grid gap-10 mt-16 md:grid-cols-2 md:items-center">
          <div>
            <h3 className="text-[#dddddd] font-bold text-[22px] lg:text-[36px] mb-[10px]">
              I am Sojib
            </h3>
            <h1 className="text-[35px] lg:text-[65px] text_gradient font-bold leading-[1.2]">
              Web Developer +<br /> UX Designer
            </h1>
          </div>
          {/* hero image start  */}
          <div className="flex justify-center md:justify-end md:row-span-2 relative">
            <div className="hero-image-box2"></div>
            <Image
              src={hero_img}
              alt="hero_img"
              className="hero-image-box w-80 lg:w-[25rem]"
            />
          </div>
          <div className="space-y-5 lg:space-y-2">
            <p className=" max-w-[550px] w-full mb-0 text-[20px] font-light text-[#dddddd]">
              I break down complex user experinece problems to create integritiy
              focussed solutions that connect billions of people
            </p>
            {/* button start  */}
            <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-8 pt-10">
              <div>
                <Link
                  href={"#"}
                  className="text-[15px] leading-[1] font-medium text-[#8750f7] rounded-[50px]
                 py-[17px] px-[35px] border border-[#8750f7] tracking-[1px] transition-all
                  duration-300 hover:bg-[#8750f7] hover:text-[#dddddd]"
                >
                  Download CV
                </Link>
              </div>
              <div className="flex items-center gap-5">
                <Link
                  href={"#"}
                  className="border border-[#8750f7] rounded-full p-[10px] text-[#8750f7]
                   hover:text-white transition-all duration-300 hvr-radial-out bg-transparent overflow-hidden"
                >
                  <FaTwitter />
                </Link>
                <Link
                  href={"#"}
                  className="border border-[#8750f7] rounded-full p-[10px] text-[#8750f7]
                   hover:text-white transition-all duration-300 hvr-radial-out bg-transparent overflow-hidden"
                >
                  <FaDribbble />
                </Link>
                <Link
                  href={"#"}
                  className="border border-[#8750f7] rounded-full p-[10px] text-[#8750f7]
                   hover:text-white transition-all duration-300 hvr-radial-out bg-transparent overflow-hidden"
                >
                  <FaLinkedinIn />
                </Link>
                <Link
                  href={"#"}
                  className="border border-[#8750f7] rounded-full p-[10px] text-[#8750f7]
                   hover:text-white transition-all duration-300 hvr-radial-out bg-transparent overflow-hidden"
                >
                  <FaGithub />
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* exprience content start  */}
        <div className="mt-14 md:mt-20 lg:mt-28 grid grid-cols-2 lg:grid-cols-4 gap-10 justify-items-center lg:justify-items-start">
          <div className="flex items-center gap-4">
            <h3 className="text-white text-[45px] lg:text-[64px] font-semibold leading-[1.1em]">
              <CountUp start={0} end={14} duration={5} />
            </h3>
            <p className="text-center lg:text-start text-[#dddddd] text-[16px] leading-[24px] font-normal">
              Years of <br />
              Experience
            </p>
          </div>
          <div className="flex items-center gap-4">
            <h3 className="text-white text-[45px] lg:text-[64px] font-semibold leading-[1.1em]">
              <CountUp start={0} end={50} duration={5} />+
            </h3>
            <p className="text-center lg:text-start text-[#dddddd] text-[16px] leading-[24px] font-normal">
              Project <br />
              Completed
            </p>
          </div>
          <div className="flex items-center gap-4">
            <h3 className="text-white text-[45px] lg:text-[64px] font-semibold leading-[1.1em]">
              <CountUp start={0.0} end={1.5} duration={5} decimals={1} />K
            </h3>
            <p className="text-center lg:text-start text-[#dddddd] text-[16px] leading-[24px] font-normal">
              Happy <br />
              Clients
            </p>
          </div>
          <div className="flex items-center gap-4">
            <h3 className="text-white text-[45px] lg:text-[64px] font-semibold leading-[1.1em]">
              <CountUp start={0} end={14} duration={5} />
            </h3>
            <p className="text-center lg:text-start text-[#dddddd] text-[16px] leading-[24px] font-normal">
              Years of <br />
              Experience
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
