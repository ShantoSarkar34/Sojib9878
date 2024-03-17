"use client";
import React from "react";
import "@fontsource/russo-one";
// import "@/components/smoothscroll/smoothscroller"
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Service from "@/components/Service";
import Work from "@/components/Work";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import Blog from "@/components/Blog";


export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Service/>
      <Work/>
      <Experience/>
      <Skills/>
      <Blog/>
      <Contact/>
      <Footer/>
    </>
  );
}
