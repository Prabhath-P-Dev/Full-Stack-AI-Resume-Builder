import React from "react";
import Banner from "../components/home/Banner";
import Hero from "../components/home/Hero";
import Features from "../components/home/Features";
import Testimonial from "../components/home/Testimonial";
import CallToAction from "../components/home/CalltoAction";
import Footer from "../components/home/Footer";

const Home = ()=>{
    return(
    <>
        <Banner />
        <Hero />
        <Features />
        <Testimonial />
        <CallToAction />
        <Footer />
    </>
    )
}

export default Home;
