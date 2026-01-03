import React from "react";
import SearchBar from "../shared/searchBar/SearchBar";
import ServicesList from "../components/services/ServicesList";
import FeaturedTourList from "../components/featruredTour/FeaturedTourList";
import Testimonials from "../components/Testimonials/Testimonials";
import FaqList from "../components/Faq/FaqList";
import ImagesGallery from "../components/Gallery/Gallery";
import heroVideo from "../assets/images/hero-video.mp4";

const Home = () => {
  return (
    <>
      {/* ✅ HERO SECTION WITH VIDEO BACKGROUND */}
      <div className="relative h-[100vh] w-full flex items-center justify-center">
        {/* Background video */}
        <video
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover brightness-75"
        />

        {/* Overlay content */}
        <div className="relative z-10 text-center max-w-3xl px-4">
          <h1 className="text-white text-4xl md:text-6xl font-bold drop-shadow-xl leading-tight">
            Plan Your Perfect Trip with{" "}
            <span className="text-BaseColor">TripsTravel</span>
          </h1>

          <p className="mt-4 text-gray-200 text-lg md:text-xl leading-8 drop-shadow-lg">
            Find the best destinations and exclusive experiences — crafted just
            for you.
          </p>

          {/* SearchBar */}
          <div className="mt-10 max-w-2xl mx-auto w-full">
            <SearchBar />
          </div>
        </div>

        {/* Smooth fade-out gradient to merge with next section */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white/95 via-white/60 to-transparent"></div>
      </div>

      {/* ✅ SERVICES SECTION */}
      <section className="container mx-auto px-6 pt-20 pb-16 -mt-10 relative z-20 bg-white rounded-t-3xl shadow-sm">
        <ServicesList />
      </section>

      {/* ✅ GALLERY SECTION */}
      <section className="container mx-auto px-6 py-16">
        <ImagesGallery />
      </section>

      {/* ✅ FEATURED TOURS */}
      <section className="container mx-auto px-6 py-16">
        <FeaturedTourList />
      </section>

      {/* ✅ TESTIMONIALS */}
      <section className="container mx-auto px-6 py-16">
        <Testimonials />
      </section>

      {/* ✅ FAQ */}
      <section className="container mx-auto px-6 py-16">
        <FaqList />
      </section>
    </>
  );
};

export default Home;
