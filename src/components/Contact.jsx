import React from "react";
import Link from "next/link";
import { LuPhoneCall } from "react-icons/lu";
import { MdOutlineEmail } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { Button } from "@material-tailwind/react";

const Contact = () => {
  return (
    <section id="contact" className="bg-[#050709] w-full py-20">
      <div className="container mx-auto">
        <div className="grid gap-10 md:grid-cols-1 lg:grid-cols-2 lg:items-center">
          <div className="flex flex-col gap-10 lg:order-last lg:ml-[110px] md:order-last  ">
            <div className="flex gap-5 items-center">
              <div className="contact_icon_box flex items-center justify-center">
                <LuPhoneCall className="text-white" />
              </div>
              <div className="space-y-2">
                <p className="text-[#dddddd] text-[16px] leading-[24px]">
                  Phone
                </p>
                <Link
                  href={"#"}
                  className="text-[20px] leading-[30px] text-white  hover:text-[#8750f7] transition-all duration-300"
                >
                  +880 1786-840058{" "}
                </Link>
              </div>
            </div>
            <div className="flex gap-5 items-center">
              <div className="contact_icon_box flex items-center justify-center">
                <MdOutlineEmail className="text-white" />
              </div>
              <div className="space-y-2">
                <p className="text-[#dddddd] text-[16px] leading-[24px]">
                  Email
                </p>
                <Link
                  href={"#"}
                  className="text-[20px] leading-[30px] text-white  hover:text-[#8750f7] transition-all duration-300"
                >
                  sojibislam9878@gmail.com
                </Link>
              </div>
            </div>
            <div className="flex gap-5 items-start">
              <div className="contact_icon_box flex items-center justify-center">
                <IoLocationOutline className="text-white" />
              </div>
              <div className="space-y-2">
                <p className="text-[#dddddd] text-[16px] leading-[24px]">
                  Address
                </p>
                <Link
                  href={"#"}
                  className="text-[20px] leading-[30px] text-white  hover:text-[#8750f7] transition-all duration-300"
                >
                  Bogura <br />
                  Bangladesh
                </Link>
              </div>
            </div>
          </div>
          {/* input start  */}
          <div className=" bg-[#140C1C] w-full rounded-[15px] lg:p-[40px] px-2 py-5 ">
            <div className="flex flex-col gap-4">
              <h1 className="text_gradient font-bold text-[30px] leading-[36px] lg:text-[45px] lg:leading-[54px]">
                Let’s work together!
              </h1>
              <p className="text-[16px] leading-[24px] text-[#dddddd] font-normal">
                I design and code beautifully simple things and i love what i
                do. Just simple like that!
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="form_group">
                  <input
                    type="name"
                    name="name"
                    placeholder="First name"
                    className="placeholder:text-[#757575]"
                  />
                </div>
                <div className="form_group">
                  <input
                    type="name"
                    name="name"
                    placeholder="Last name"
                    className="placeholder:text-[#757575]"
                  />
                </div>
                <div className="form_group">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    className="placeholder:text-[#757575]"
                  />
                </div>
                <div className="form_group">
                  <input
                    type="text"
                    name="text"
                    placeholder="Phone number"
                    className="placeholder:text-[#757575]"
                  />
                </div>
                <div className="form_group col-span-2">
                  <textarea
                    rows={12}
                    type="text"
                    name="text"
                    placeholder="Message"
                    className="placeholder:text-[#757575]"
                  />
                </div>
                <div className="mt-2">
                  <Button
                    variant="gradient"
                    size="sm"
                    className="text-[15px] leading-[22px] font-bold text-white normal-case py-2 px-7 rounded-full btn-primary  lg:mr-0  "
                  >
                    Send Message
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
