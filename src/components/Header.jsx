import React, { useEffect, useState } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import Image from "next/image";
import Logo_1 from "../app/img/logo.png";
import { Link } from "react-scroll";
import { GiCrossedSwords } from "react-icons/gi";
import { RiMenu3Fill } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";

export default function Header() {
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = window.scrollY;
      setScroll(scrollHeight);

      if (scrollHeight >= 140) {
        setScroll(true);
      } else {
        setScroll(false);
      }

      // You can perform additional actions with the scroll height here
    };
    window.addEventListener("scroll", handleScroll);
  }, []);

  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resdize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul
      className="mb-4 mt-2 flex flex-col gap-5 lg:mb-0
     lg:mt-0 lg:flex-row lg:items-center lg:gap-7 "
    >
      {/* <Typography
        as="li"
        variant="small"
        className="px-1 font-medium transition-all duration-200  relative"
      >
        <Link
          activeClass="active"
          to="service"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
          className=" uppercase text-white text-[22px]  lg:text-[15px] leading-[22px] font-medium cursor-pointer tracking-[1px] hvr-underline-from-left pb-[3px] lg:normal-case px-1"
        >
          <p>Service</p>
        </Link>
      </Typography> */}

      <Typography
        as="li"
        variant="small"
        className="px-1 font-medium transition-all duration-200  "
      >
        <Link
          activeClass="active"
          to="work"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
          className=" uppercase text-white text-[22px]  lg:text-[15px] leading-[22px] font-medium cursor-pointer tracking-[1px] hvr-underline-from-left pb-[3px] lg:normal-case px-1"
        >
          <p>Works</p>
        </Link>
      </Typography>
      {/* <Typography
        as="li"
        variant="small"
        className="px-1 font-medium transition-all duration-200  "
      >
        <Link
          activeClass="active"
          to="exp"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
          className=" uppercase text-white text-[22px]  lg:text-[15px] leading-[22px] font-medium cursor-pointer tracking-[1px] hvr-underline-from-left pb-[3px] lg:normal-case px-1"
        >
          <p>Resume</p>
        </Link>
      </Typography> */}
      <Typography
        as="li"
        variant="small"
        className="px-1 font-medium transition-all duration-200  "
      >
        <Link
          activeClass="active"
          to="skills"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
          className=" uppercase text-white text-[22px]  lg:text-[15px] leading-[22px] font-medium cursor-pointer tracking-[1px] hvr-underline-from-left pb-[3px] lg:normal-case px-1"
        >
          <p>Skills</p>
        </Link>
      </Typography>
      {/* <Typography
        as="li"
        variant="small"
        className="px-1 font-medium transition-all duration-200  "
      >
        <Link
          activeClass="active"
          to="testimonials"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
          className=" uppercase text-white text-[22px]  lg:text-[15px] leading-[22px] font-medium cursor-pointer tracking-[1px] hvr-underline-from-left pb-[3px] lg:normal-case px-1"
        >
          <p>Testimonials</p>
        </Link>
      </Typography> */}
      <Typography
        as="li"
        variant="small"
        className="px-1 font-medium transition-all duration-200  "
      >
        <Link
          activeClass="active"
          to="contact"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
          className=" uppercase text-white text-[22px]  lg:text-[15px] leading-[22px] font-medium cursor-pointer tracking-[1px] hvr-underline-from-left pb-[3px] lg:normal-case px-1"
        >
          <p>Contact</p>
        </Link>
      </Typography>
    </ul>
  );

  return (
    <Navbar
      id="header"
      className={`container mx-auto px-4 w-full pt-2 pb-0 md:py-0 bg- transition-all duration-300 fixed shadow-none  z-50 max-w-full rounded-none border-none ${
        scroll ? " bg-[#050709]" : "bg-transparent"
      }`}
    >
      <div className="flex items-center container mx-auto justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="/"
          className="mr-4 cursor-pointer py-1.5 font-medium transition-all duration-200 flex items-center gap-10"
        >
          <Image src={Logo_1} alt="logo" className="w-32 md:w-44 lg:w-48" />
        </Typography>
        <div className="flex items-center gap-10">
          <div className="mr-4 hidden lg:block  ">{navList}</div>
          <div className="hidden md:block">
            <Link activeClass="active"
          to="contact"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
              variant="gradient"
              size="sm"
              className="text-[12px] lg:text-[15px] leading-[22px] font-bold text-white normal-case py-2 px-7 rounded-full btn-primary  lg:mr-0  "
            >
              Hire Me!
            </Link>
          </div>
          <IconButton
            variant="text"
            className="mx-auto h-6 w-6 text-inherit -mt-11 hover:bg-transparent
             focus:bg-transparent  active:bg-transparent lg:hidden "
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <RxCross2 className="text-4xl text-primary" />
            ) : (
              <RiMenu3Fill className="text-4xl text-primary" />
            )}
          </IconButton>
        </div>
      </div>
      <MobileNav
        open={openNav}
        className=" z-50 bg-[#2A1454] transition-all duration-100 lg:hidden"
      >
        <div className="flex flex-col text-center justify-center py-10">
          {navList}
          <div className="block md:hidden">
            <Button
              variant="gradient"
              size="sm"
              className="text-[15px] leading-[22px] font-bold text-white normal-case py-2 px-7 rounded-full btn-primary  lg:mr-0  "
            >
              Hire Me!
            </Button>
          </div>
        </div>
      </MobileNav>
    </Navbar>
  );
}
