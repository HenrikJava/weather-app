import React from "react";
import "./Footer.css";
import EmailIcon from "@material-ui/icons/Email";
import GitHubIcon from '@material-ui/icons/GitHub';
import CopyrightIcon from '@material-ui/icons/Copyright';
import FacebookIcon from '@material-ui/icons/Facebook';


import { Link } from "@material-ui/core";
export const Footer = () => {
  return (
    <div className="footer-wrapper">
      <div className="footer-item">
        {" "}
        <span className="icon-wrapper">
          <EmailIcon id="email-icon" />
        </span>
        <Link id="footer-label-contact" href="mailto:henriklarssonmail@gmail.com" target="_blank">Contact</Link>
      </div>
      <div className="footer-item">
        {" "}
        <span className="icon-wrapper">
          <GitHubIcon id="github-icon" />
        </span>
        <Link id="footer-label-github" href="https://github.com/HenrikJava" target="_blank">Github</Link>
      </div>
      <div className="footer-item">
        {" "}
        <span className="icon-wrapper">
          <FacebookIcon id="facebook-icon" />
        </span>
        <Link id="footer-label-facebook" href="https://www.facebook.com/HenrikLarsson1978" target="_blank">Facebook</Link>
      </div>
      <div className="footer-item">
        {" "}
        <span className="icon-wrapper">
          <CopyrightIcon id="copyright-icon" />
        </span>
        <Link id="footer-label-copyright">Copyright 2021</Link>
      </div>
    </div>
  );
};
