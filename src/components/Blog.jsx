import React from "react";
import Link from "next/link";
import Image from "next/image";
import blog_1 from "../app/img/blog/blog_1.webp";
import blog_2 from "../app/img/blog/blog_2.webp";
import blog_3 from "../app/img/blog/blog_3.webp";
import { FaCalendarAlt, FaRegComments } from "react-icons/fa";

const Blog = () => {
  return (
    <section className="bg-[#110819] w-full py-20">
      <div className="container mx-auto">
        <h1 className="text_gradient text-center text-[30px] lg:text-[45px] leading-[1.2] mb-[10px] lg:mb-[15px] font-bold">
          Recent Blogs
        </h1>
        <p className="text-[16px] leading-[24px] text-[#dddddd] text-center lg:px-[22rem]">
          We put your ideas and thus your wishes in the form of a unique web
          project that inspires you and you customers.
        </p>
        {/* blog image start  */}
        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-0">
          {/* image 1 start  */}
          <div className="blog-item overflow-hidden relative ">
            <div className=" absolute top-2 left-2">
              <Link
                href={"#"}
                className="button_position text-[13px] leading-[13px] uppercase"
              >
                {" "}
                Tutorial
              </Link>
            </div>
            <div className=" relative overflow-hidden bg-cover">
              <Image
                src={blog_1}
                alt="blog"
                className="bg-cover bg-no-repeat hover:scale-110 ease-in-out transition-all duration-500"
              />
            </div>
            <div className="blog-content transition-all duration-300">
              <div className="text flex flex-col gap-2">
                <div className="text_color flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-sm" />
                    <p className="text-[14px] leading-[14px] ">Oct 01, 2022</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaRegComments className="" />
                    <Link href={"#"} className="text-[14px] leading-[14px] ">
                      Comment (0)
                    </Link>
                  </div>
                </div>
                <h2 className="text-white text-[18px] leading-[21.6px] font-bold">
                  Top 10 Ui Ux Designers
                </h2>
              </div>
            </div>
          </div>
          {/* image 2 start  */}
          <div className="blog-item overflow-hidden relative">
            <div className=" absolute top-2 left-2">
              <Link
                href={"#"}
                className="button_position text-[13px] leading-[13px] uppercase"
              >
                {" "}
                Tips
              </Link>
            </div>
            <div className=" relative overflow-hidden bg-cover">
              <Image
                src={blog_2}
                alt="blog"
                className="bg-cover bg-no-repeat hover:scale-110 ease-in-out transition-all duration-500"
              />
            </div>
            <div className="blog-content transition-all duration-300">
              <div className="text flex flex-col gap-2">
                <div className="text_color flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-sm" />
                    <p className="text-[14px] leading-[14px] ">Oct 01, 2022</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaRegComments className="" />
                    <Link href={"#"} className="text-[14px] leading-[14px] ">
                      Comment (0)
                    </Link>
                  </div>
                </div>
                <h2 className="text-white text-[18px] leading-[21.6px] font-bold">
                  App Development Guides
                </h2>
              </div>
            </div>
          </div>
          {/* image 2 start  */}
          <div className="blog-item overflow-hidden relative">
            <div className=" absolute top-2 left-2">
              <Link
                href={"#"}
                className="button_position text-[13px] leading-[13px] uppercase"
              >
                {" "}
                freebies
              </Link>
            </div>
            <div className=" relative overflow-hidden bg-cover">
              <Image
                src={blog_3}
                alt="blog"
                className="bg-cover bg-no-repeat hover:scale-110 ease-in-out transition-all duration-500"
              />
            </div>
            <div className="blog-content transition-all duration-300">
              <div className="text flex flex-col gap-2">
                <div className="text_color flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-sm" />
                    <p className="text-[14px] leading-[14px] ">Oct 01, 2022</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaRegComments className="" />
                    <Link href={"#"} className="text-[14px] leading-[14px] ">
                      Comment (0)
                    </Link>
                  </div>
                </div>
                <h2 className="text-white text-[18px] leading-[21.6px] font-bold">
                  Learn Graphic Design Free
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
