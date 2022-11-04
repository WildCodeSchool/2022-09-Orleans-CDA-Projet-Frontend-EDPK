import "./Footer.scss";

const Footer = () => {
  return (
    <footer>
      <div className="footer-logo">
        <img
          src={`${import.meta.env.BASE_URL}/images/logo.png`}
          alt="Logo of Cineflix"
        />
        <span>Cineflix</span>
      </div>
      <div className="footer-aside">
        <div className="footer-authors">
          <div className="footer-authors-title">Authors</div>
          <div className="footer-authors-content">
            <a
              href="https://www.linkedin.com/in/emmape/"
              target="_blank"
              className="footer-author"
            >
              <img
                src={`${import.meta.env.BASE_URL}/images/emmanuel.jpg`}
                alt="Profile of Emmanuel"
              />
              <div className="footer-author-firstname">
                Emmanuel
                <span className="footer-author-lastname"> Pereira</span>
              </div>
            </a>
            <a
              href="https://www.linkedin.com/in/dangiras-hausmanas-2b714922b/"
              target="_blank"
              className="footer-author"
            >
              <img
                src={`${import.meta.env.BASE_URL}/images/dangiras.jpg`}
                alt="Profile of Dangiras"
              />
              <div className="footer-author-firstname">
                Dangiras
                <span className="footer-author-lastname"> Hausmanas</span>
              </div>
            </a>
            <a
              href="https://www.linkedin.com/in/kylian-moreira-7086b9167/"
              target="_blank"
              className="footer-author"
            >
              <img
                src={`${import.meta.env.BASE_URL}/images/kylian.jpg`}
                alt="Profile of Kylian"
              />
              <div className="footer-author-firstname">
                Kylian
                <span className="footer-author-lastname"> Moreira</span>
              </div>
            </a>
            <a
              href="https://www.linkedin.com/in/paul-chatelain-fernandes/"
              target="_blank"
              className="footer-author"
            >
              <img
                src={`${import.meta.env.BASE_URL}/images/paul.jpg`}
                alt="Profile of Paul"
              />
              <div className="footer-author-firstname">
                Paul
                <span className="footer-author-lastname">
                  {" "}
                  Chatelain-Fernandes
                </span>
              </div>
            </a>
          </div>
        </div>
        <div className="footer-api">
          <div className="footer-api-title">API Data</div>
          <div className="footer-api-content">
            <div className="footer-api-description">
              All the content of Cineflix comes from the API of The Movie
              Database.
            </div>
            <a href="https://developers.themoviedb.org/3/" target="_blank">
              <img
                src={`${import.meta.env.BASE_URL}/images/tmdb.svg`}
                alt="Logo of TMDB"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
