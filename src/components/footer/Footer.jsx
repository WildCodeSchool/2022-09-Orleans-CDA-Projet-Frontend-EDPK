import "./Footer.scss";

const Footer = () => {
  return (
    <footer>
      <div className="footer_logo">
        <img src="/images/logo.png" />
        <span>Cineflix</span>
      </div>
      <div className="footer_aside">
        <div className="footer_authors">
          <div className="footer_authors_title">Authors</div>
          <div className="footer_authors_content">
            <a
              href="https://www.linkedin.com/in/emmape/"
              target="_blank"
              className="footer_author"
            >
              <img
                src="https://media-exp1.licdn.com/dms/image/D4E35AQESslXZ5f4E7A/profile-framedphoto-shrink_800_800/0/1663842001629?e=1667811600&v=beta&t=ISqAEc0rxefP0xAKxrSxMqb_ZjsR4Rys4gNH13Yy_40"
                alt="Profile of Emmanuel"
              />
              <div className="footer_author_firstname">
                Emmanuel <span className="footer_author_lastname">Pereira</span>
              </div>
            </a>
            <a
              href="https://www.linkedin.com/in/dangiras-hausmanas-2b714922b/"
              target="_blank"
              className="footer_author"
            >
              <img
                src="https://media-exp1.licdn.com/dms/image/C4E03AQF7L1W1S5Yd-Q/profile-displayphoto-shrink_800_800/0/1653310351812?e=1672876800&v=beta&t=wOitm0ZbIKTzr0jZ2aiXQ4g3Zf67g-q5rPJhqcM_mOE"
                alt="Profile of Dangiras"
              />
              <div className="footer_author_firstname">
                Dangiras{" "}
                <span className="footer_author_lastname">Hausmanas</span>
              </div>
            </a>
            <a
              href="https://www.linkedin.com/in/kylian-moreira-7086b9167/"
              target="_blank"
              className="footer_author"
            >
              <img
                src="https://media-exp1.licdn.com/dms/image/D4E35AQFkontxe4pwfw/profile-framedphoto-shrink_800_800/0/1655198094813?e=1667811600&v=beta&t=jgDvUooADKM1NI6qcU5y6Vuctr2b9rC5l7KQbDP7kWw"
                alt="Profile of Kylian"
              />
              <div className="footer_author_firstname">
                Kylian <span className="footer_author_lastname">Moreira</span>
              </div>
            </a>
            <a
              href="https://www.linkedin.com/in/paul-chatelain-fernandes/"
              target="_blank"
              className="footer_author"
            >
              <img
                src="https://media-exp1.licdn.com/dms/image/D4E03AQGbyQ9Kz_v2UQ/profile-displayphoto-shrink_800_800/0/1664906692477?e=1672876800&v=beta&t=jQ0axPeIwUBvtt8GTCIPBZqSpjyzW5PHEJTVI0XJoM8"
                alt="Profile of Paul"
              />
              <div className="footer_author_firstname">
                Paul{" "}
                <span className="footer_author_lastname">
                  Chatelain-Fernandes
                </span>
              </div>
            </a>
          </div>
        </div>
        <div className="footer_api">
          <div className="footer_api_title">API Data</div>
          <div className="footer_api_content">
            <div className="footer_api_description">
              All the content of Cineflix comes from the API of The Movie
              Database.
            </div>
            <a href="https://developers.themoviedb.org/3/" target="_blank">
              <img
                src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_long_2-9665a76b1ae401a510ec1e0ca40ddcb3b0cfe45f1d51b77a308fea0845885648.svg"
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
