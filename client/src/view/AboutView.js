import React from "react";
import { Footer } from "../components/footer/Footer";
import Creator from "../shared/images/HenrikLarsson.jpg";
import "./AboutView.css";
export const AboutView = () => {
  return (
    <div className="about-wrapper">
      <div className="about-main">
        <span className="image-wrapper">
          <img src={Creator} className="about-image"></img>
        </span>
        <div className="text-wrapper">
          <p className="text-header">I build this page</p>
          <p className="text-sub-header">Who am I....</p>
          <p className="text-main">
            My name is Henrik Larsson. I currently studying a 2-year long web
            development course. This webpage is a part of the fullstack course.
            I choose to work by the "MERN" style. It is including Mongo DB,
            Express JS, React JS and Node JS.{" "}
          </p>
          <p className="text-sub-header">Why a weather page? </p>
          <p className="text-main">
            Ever since I was a child I always have an interest of the weather.
            Sometimes I had felt that the weather apps have some imporovements
            to do. Now I had the oppurtonity to build my own app.
          </p>
          <p className="text-sub-header">Credits</p>
          <p className="text-main">
            The weather data is brought by http://openweathermap.org/. The
            sloths is created by a webteam in Gothenburg(Anne-Lie-Back, ozckarr,
            alexbryw). The weather icons are grabbed from www.icons.com.{" "}
          </p>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};
