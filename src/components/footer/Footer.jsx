import React from "react";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer>
      <div className="footer_logo">
        <img src="../../../public/images/logo.png" />
        <span>Cineflix</span>
      </div>
      <div className="footer_content">
        <span>Emmanuel, Dan, Kylian, Paul</span>
      </div>
      <div className="footer_content">
        <span>Mettre TMDB en remerciements</span>
      </div>
    </footer>
  );
};

export default Footer;
