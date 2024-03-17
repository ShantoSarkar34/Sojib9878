import React from "react";
import Link from "next/link";
import Image from "next/image";
import Logo_1 from "../app/img/logo.png";

const Footer = () => {
  return (
    <footer className="bg-[#0F0715] py-10 w-full">
      <div className="container mx-auto ">
        <div className="flex flex-col items-center gap-7">
          <div className="">
            <Link href={"/"} className="">
            <Image
            src={Logo_1}
            alt="logo"
            className=" w-44 lg:w-48"
          />
            </Link>
          </div>
          <div className="flex items-center gap-2 lg:gap-5">
            <Link
              href={"#"}
              className="uppercase text-white text-[15px] leading-[22px] font-medium cursor-pointer  hvr-underline-from-left  lg:normal-case px-1"
            >
              Services
            </Link>
            <Link
              href={"#"}
              className="uppercase text-white text-[15px] leading-[22px] font-medium cursor-pointer  hvr-underline-from-left  lg:normal-case px-1"
            >
              Work
            </Link>
            <Link
              href={"#"}
              className="uppercase text-white text-[15px] leading-[22px] font-medium cursor-pointer  hvr-underline-from-left  lg:normal-case px-1"
            >
              Resume
            </Link>
            <Link
              href={"#"}
              className="uppercase text-white text-[15px] leading-[22px] font-medium cursor-pointer  hvr-underline-from-left  lg:normal-case px-1"
            >
              Skills
            </Link>
            <Link
              href={"#"}
              className="uppercase text-white text-[15px] leading-[22px] font-medium cursor-pointer  hvr-underline-from-left  lg:normal-case px-1"
            >
              Testimonials
            </Link>
            <Link
              href={"#"}
              className="uppercase text-white text-[15px] leading-[22px] font-medium cursor-pointer  hvr-underline-from-left  lg:normal-case px-1"
            >
              Contact
            </Link>
          </div>
          <h4 className="text-[#8750f7] text-[14px] leading-[21px] lg:text-[16px]">
            © 2024 All rights reserved by <span>
              <Link href={"#"} className="font-semibold border-[#8750f7] hover:border-b-2 px-1">Merajul Islam Sojib</Link>
            </span>
          </h4>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
