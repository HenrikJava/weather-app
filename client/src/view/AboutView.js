import React, { useContext } from "react";
import { Footer } from "../components/footer/Footer";
import { AppContext } from "../shared/global/provider/Provider";
import Creator from "../shared/images/HenrikLarsson.jpg";
import "./AboutView.css";
export const AboutView = () => {
  const app = useContext(AppContext)
  return (
    <div className="about-wrapper">
      <div className="about-main">
        <span className="image-wrapper">
          <img src={Creator} className="about-image"></img>
        </span>
        <div className="text-wrapper">
          <p className="text-header">
            {app.swedish ? "Jag byggde denna sida" : "I build this page"}
          </p>
          <p className="text-sub-header">
            {app.swedish ? "Vem är jag?" : "Who am I?"}
          </p>
          <p className="text-main">
            {app.swedish
              ? 'Jag heter Henrik Larsson. Jag studerar just nu en 2 år lång systemutvecklingskurs. Denna hemsida är en del av fullstackkursen. Jag valde att arbeta med "MERN" stilen. Den inkluderar Mongo DB, Express JS, React JS och Node JS.'
              : 'My name is Henrik Larsson. I am currently studying a 2-year long web development course. This webpage is a part of the fullstack course. I chose to work by the "MERN" style. It is including Mongo DB, Express JS, React JS and Node JS.'}
          </p>
          <p className="text-sub-header">
            {app.swedish ? "Varför en vädersida?" : "Why a weather page?"}
          </p>
          <p className="text-main">
            {app.swedish
              ? "Redan sen jag var barn har jag alltid varit intresserad av vädret. Ibland har jag kännt att väderapparna har en del förbättringar att göra. Och med min nya kunskap har jag nu möjligheten att bygga min egna sida."
              : "Ever since I was a child I always had an interest of the weather. Sometimes I have had felt that the weather apps have some improvements to make. And with my new knowledge I have the opportunity to build my own web page."}
          </p>
          <p className="text-sub-header">
            {app.swedish ? "Källor" : "Sources"}
          </p>
          <p className="text-main">
            {app.swedish
              ? "Väderdatan hämtas från http://openweathermap.org/. Sengångarna är skapade av ett webteam i Göteborg(Anne-Lie-Back, ozckarr, alexbryw). Väderikonerna är hämtade från www.icons.com."
              : "The weather data is brought by http://openweathermap.org/. The sloths are created by a webteam in Gothenburg(Anne-Lie-Back, ozckarr, alexbryw). The weather icons are grabbed from www.icons.com."}
          </p>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};
