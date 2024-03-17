import React from "react";
import Image from "next/image";
import skill_1 from "../app/img/Skills/figma.svg";
import skill_2 from "../app/img/Skills/ruby.svg";
import skill_3 from "../app/img/Skills/Xd.svg";
import skill_4 from "../app/img/Skills/wordpress.svg";
import skill_5 from "../app/img/Skills/react.svg";
import skill_6 from "../app/img/Skills/js.svg";

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
        <div className="mt-20 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-6">
          <div className="flex flex-col">
            <div className="skill-item">
              <div className="skill-inner">
                <div className="icon-box">
                  <Image
                    src={skill_1}
                    alt="skill"
                    className="icon-box w-full"
                  />
                  <p className="text-[#8750f7] text-[20px] leading-[1] font-extrabold text-center icon-box">
                    92%
                  </p>
                </div>
              </div>
            </div>
            <h4 className="text-center text-[#8750f7]">Figma</h4>
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
                  <p className="text-[#8750f7] text-[20px] leading-[1] font-extrabold text-center icon-box">
                    80%
                  </p>
                </div>
              </div>
            </div>
            <h4 className="text-center text-[#8750f7]">Sketch</h4>
          </div>
          <div className="flex flex-col">
            <div className="skill-item">
              <div className="skill-inner">
                <div className="icon-box">
                  <Image
                    src={skill_3}
                    alt="skill"
                    className="icon-box w-full"
                  />
                  <p className="text-[#8750f7] text-[20px] leading-[1] font-extrabold text-center icon-box">
                    85%
                  </p>
                </div>
              </div>
            </div>
            <h4 className="text-center text-[#8750f7]">XD</h4>
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
                  <p className="text-[#8750f7] text-[20px] leading-[1] font-extrabold text-center icon-box">
                    99%
                  </p>
                </div>
              </div>
            </div>
            <h4 className="text-center text-[#8750f7]">WordPress</h4>
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
                  <p className="text-[#8750f7] text-[20px] leading-[1] font-extrabold text-center icon-box">
                    89%
                  </p>
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
                  <p className="text-[#8750f7] text-[20px] leading-[1] font-extrabold text-center icon-box">
                    93%
                  </p>
                </div>
              </div>
            </div>
            <h4 className="text-center text-[#8750f7]">JavaScript</h4>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
