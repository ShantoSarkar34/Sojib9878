import React from "react";

const Experience = () => {
  return (
    <section id="exp" className="bg-[#050709] w-full py-20">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 md:gap-x-8 lg:gap-x-40">
          {/* Experience section start  */}
          <div className="Experienct_grid_start">
            <h1 className="mb-[50px] text_gradient text-[30px] lg:text-[45px] font-bold leading-[1.2]">
              My Experience
            </h1>
            <div className="flex flex-col ">
              <div className="resume-item text-[#8750f7] hover:text-white transition-all duration-300">
                <h3 className="text-[15px] lg:text-[20px] font-extrabold mb-[8px]">
                  2022-Present
                </h3>
                <h2 className="text-[18px] text-white font-bold lg:text-[25px] lg:mb-[8px] uppercase leading-[1.2]">
                  LEAD DEVELOPER
                </h2>
                <p className="text-[#dddddd] font-normal text-[16px] ">
                  Blockdots, London
                </p>
              </div>
              <div className="resume-item text-[#8750f7] hover:text-white transition-all duration-300">
                <h3 className="text-[15px] lg:text-[20px] font-extrabold mb-[8px]">
                  2021 - 2022
                </h3>
                <h2 className="text-[18px] text-white font-bold lg:text-[25px] lg:mb-[8px] uppercase leading-[1.2]">
                  FULL STACK WEB DEVELOPER
                </h2>
                <p className="text-[#dddddd] font-normal text-[16px] ">
                  Parsons, The New School
                </p>
              </div>
              <div className="resume-item text-[#8750f7] hover:text-white transition-all duration-300">
                <h3 className="text-[15px] lg:text-[20px] font-extrabold mb-[8px]">
                  2020 - 2021
                </h3>
                <h2 className="text-[18px] text-white font-bold lg:text-[25px] lg:mb-[8px] uppercase leading-[1.2]">
                  UI DESIGNER
                </h2>
                <p className="text-[#dddddd] font-normal text-[16px] ">
                  House of Life, Leeds
                </p>
              </div>
              <div className="resume-item text-[#8750f7] hover:text-white transition-all duration-300">
                <h3 className="text-[15px] lg:text-[20px] font-extrabold mb-[8px]">
                  2018 - 2020
                </h3>
                <h2 className="text-[18px] text-white font-bold lg:text-[25px] lg:mb-[8px] uppercase leading-[1.2]">
                  JUNIOR GRAPHICS DESIGNER
                </h2>
                <p className="text-[#dddddd] font-normal text-[16px] ">
                  Theme Junction, Bursa
                </p>
              </div>
            </div>
          </div>
          {/* Education section start  */}
          <div className="Education_grid_start">
            <h1 className="mb-[50px] text_gradient text-[30px] lg:text-[45px] font-bold leading-[1.2]">
              My Education
            </h1>
            <div className="flex flex-col ">
              <div className="resume-item text-[#8750f7] hover:text-white transition-all duration-300">
                <h3 className="text-[15px] lg:text-[20px] font-extrabold mb-[8px]">
                  2020 - 2023
                </h3>
                <h2 className="text-[18px] text-white font-bold lg:text-[25px] lg:mb-[8px] uppercase leading-[1.2]">
                  PROGRAMMING COURSE
                </h2>
                <p className="text-[#dddddd] font-normal text-[16px] ">
                  Harverd University
                </p>
              </div>
              <div className="resume-item text-[#8750f7] hover:text-white transition-all duration-300">
                <h3 className="text-[15px] lg:text-[20px] font-extrabold mb-[8px]">
                  2016 - 2020
                </h3>
                <h2 className="text-[18px] text-white font-bold lg:text-[25px] lg:mb-[8px] uppercase leading-[1.2]">
                  GRAPHIC DESIGN COURSE
                </h2>
                <p className="text-[#dddddd] font-normal text-[16px] ">
                  University of Denmark
                </p>
              </div>
              <div className="resume-item text-[#8750f7] hover:text-white transition-all duration-300">
                <h3 className="text-[15px] lg:text-[20px] font-extrabold mb-[8px]">
                  2012 - 2015
                </h3>
                <h2 className="text-[18px] text-white font-bold lg:text-[25px] lg:mb-[8px] uppercase leading-[1.2]">
                  WEB DESIGN COURSE
                </h2>
                <p className="text-[#dddddd] font-normal text-[16px] ">
                  University of California
                </p>
              </div>
              <div className="resume-item text-[#8750f7] hover:text-white transition-all duration-300">
                <h3 className="text-[15px] lg:text-[20px] font-extrabold mb-[8px]">
                  2010 - 2011
                </h3>
                <h2 className="text-[18px] text-white font-bold lg:text-[25px] lg:mb-[8px] uppercase leading-[1.2]">
                  DESIGN & TECHNOLOGY
                </h2>
                <p className="text-[#dddddd] font-normal text-[16px] ">
                  Parsons, The New School
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
