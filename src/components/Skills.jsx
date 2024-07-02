import React from "react";
import Image from "next/image";
import skill_1 from "../app/img/blog/html.png";
import skill_2 from "../app/img/blog/css.png";
import skill_3 from "../app/img/blog/0.png";
import skill_4 from "../app/img/blog/js.png";
import skill_5 from "../app/img/blog/react.png";
import skill_6 from "../app/img/blog/node.png";
import skill_7 from "../app/img/blog/mongo.png";
import skill_8 from "../app/img/blog/git.jpg";

const Skills = () => {
  return (
    <section id="skills" className="bg-[#0F0715] w-full py-20">
      <div className="container mx-auto">
        <h1 className="text_gradient text-center text-[30px] lg:text-[45px] leading-[1.2] mb-[10px] lg:mb-[15px] font-bold">
          My Skills
        </h1>
        <p className="text-[16px] leading-[24px] text-[#dddddd] text-center lg:px-[22rem]">
          We put your ideas and thus your wishes in the form of a unique web
          project that inspires you and you customers.
        </p>
        <div className="mt-20 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
          <div className="flex flex-col">
            <div className="skill-item">
              <div className="skill-inner">
                <div className="icon-box">
                  <Image
                    src={skill_1}
                    alt="skill"
                    className="icon-box w-full"
                  />
                  {/* <p className="text-[#8750f7] text-[20px] leading-[1] font-extrabold text-center icon-box">
                    92%
                  </p> */}
                </div>
              </div>
            </div>
            <h4 className="text-center text-[#8750f7]">Html</h4>
          </div>
          <div className="flex flex-col">
            <div className="skill-item">
              <div className="skill-inner">
                <div className="icon-box">
                  <Image
                    src={skill_2}
                    alt="skill"
                    className="icon-box w-full"
                  />
                  {/* <p className="text-[#8750f7] text-[20px] leading-[1] font-extrabold text-center icon-box">
                    80%
                  </p> */}
                </div>
              </div>
            </div>
            <h4 className="text-center text-[#8750f7]">Css</h4>
          </div>
          <div className="flex flex-col">
            <div className="skill-item">
              <div className="skill-inner">
                <div className="icon-box">
                  <Image
                    src={skill_3}
                    alt="skill"
                    className="icon-box w-full h-full"
                  />
                  {/* <p className="text-[#8750f7] text-[20px] leading-[1] font-extrabold text-center icon-box">
                    85%
                  </p> */}
                </div>
              </div>
            </div>
            <h4 className="text-center text-[#8750f7]">Tailwind</h4>
          </div>
         
          <div className="flex flex-col">
            <div className="skill-item">
              <div className="skill-inner">
                <div className="icon-box">
                  <Image
                    src={skill_4}
                    alt="skill"
                    className="icon-box w-full"
                  />
                  {/* <p className="text-[#8750f7] text-[20px] leading-[1] font-extrabold text-center icon-box">
                    89%
                  </p> */}
                </div>
              </div>
            </div>
            <h4 className="text-center text-[#8750f7]">Javascript</h4>
          </div>
          <div className="flex flex-col">
            <div className="skill-item">
              <div className="skill-inner">
                <div className="icon-box">
                  <Image
                    src={skill_5}
                    alt="skill"
                    className="icon-box w-full"
                  />
                  {/* <p className="text-[#8750f7] text-[20px] leading-[1] font-extrabold text-center icon-box">
                    93%
                  </p> */}
                </div>
              </div>
            </div>
            <h4 className="text-center text-[#8750f7]">React</h4>
          </div>
          <div className="flex flex-col">
            <div className="skill-item">
              <div className="skill-inner">
                <div className="icon-box">
                  <Image
                    src={skill_6}
                    alt="skill"
                    className="icon-box w-full"
                  />
                  {/* <p className="text-[#8750f7] text-[20px] leading-[1] font-extrabold text-center icon-box">
                    93%
                  </p> */}
                </div>
              </div>
            </div>
            <h4 className="text-center text-[#8750f7]">NodeJs</h4>
          </div>
          <div className="flex flex-col">
            <div className="skill-item">
              <div className="skill-inner">
                <div className="icon-box">
                  <Image
                    src={skill_7}
                    alt="skill"
                    className="icon-box w-full"
                  />
                  {/* <p className="text-[#8750f7] text-[20px] leading-[1] font-extrabold text-center icon-box">
                    93%
                  </p> */}
                </div>
              </div>
            </div>
            <h4 className="text-center text-[#8750f7]">MongoDB</h4>
          </div>
          <div className="flex flex-col">
            <div className="skill-item">
              <div className="skill-inner">
                <div className="icon-box">
                  <Image
                    src={skill_8}
                    alt="skill"
                    className="icon-box w-full"
                  />
                  {/* <p className="text-[#8750f7] text-[20px] leading-[1] font-extrabold text-center icon-box">
                    93%
                  </p> */}
                </div>
              </div>
            </div>
            <h4 className="text-center text-[#8750f7]">Github</h4>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
