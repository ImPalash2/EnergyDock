import React from "react";
import { Link } from "react-router-dom";
import "../styles/footer.css";
const Footer = () => {
  return (
    <>
      <footer className="text-center text-lg-start bg-white text-muted border-top">
        <section className="footer-content">
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">
                  <i className="fas fa-gem me-3 text-secondary"></i>eVehicle
                  Charging System
                </h6>
                <p>
                 Our website is your one-stop shop for electric car charging! Locate stations near you, filter by charger type (Level 2 or DC Fast), and see real-time availability. Book a slot to ensure a spot, and pay seamlessly with integrated payment options.

                Our user-friendly platform also boasts station details like address, amenities, and user reviews.  Planning a road trip? Our mapping feature suggests charging stops along your route, factoring in charging time and remaining battery range.
                </p>
              </div>

              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Team Members</h6>
                <p>
                  <Link to="#!" className="text-reset">
                    Palash Guchhait
                  </Link>
                </p>
                <p>
                  <Link to="#!" className="text-reset">
                    Suryadip Saha
                  </Link>
                </p>
                <p>
                  <Link to="#!" className="text-reset">
                    Sandipan Debnath
                  </Link>
                </p>
                <p>
                  <Link to="#!" className="text-reset">
                    Deepanjan Patra
                  </Link>
                </p>
                <p>
                  <Link to="#!" className="text-reset">
                    Navya Singh
                  </Link>
                </p>
                <p>
                  <Link to="#!" className="text-reset">
                    Aryan Verma
                  </Link>
                </p>
              </div>

              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
                <p>
                  <Link to="./map.html" className="text-reset">
                    Map
                  </Link>
                </p>
                <p>
                  <Link to="#!" className="text-reset">
                    Stations
                  </Link>
                </p>
                <p>
                  <Link to="#!" className="text-reset">
                    Help
                  </Link>
                </p>
              </div>

              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                <p>
                  <i className="fas fa-home me-3 text-secondary"></i> West
                  Bengal, India
                </p>
                <p>
                  <i className="fas fa-envelope me-3 text-secondary"></i>
                  evchargingsystem@gmail.com
                </p>
                <p>
                  <i className="fas fa-phone me-3 text-secondary"></i>{" "}
                  +9123467890
                </p>
                <p>
                  <i className="fas fa-print me-3 text-secondary"></i>{" "}
                  +9123467890
                </p>
              </div>
            </div>
          </div>
          <section className="d-flex justify-content-center align-items-center p-4">
            <div className="social text-center">
              <Link to="" className="me-4 link-secondary">
                <i className="fab fa-facebook-f"></i>
              </Link>
              <Link to="" className="me-4 link-secondary">
                <i className="fab fa-twitter"></i>
              </Link>
              <Link to="" className="me-4 link-secondary">
                <i className="fab fa-google"></i>
              </Link>
              <Link to="" className="me-4 link-secondary">
                <i className="fab fa-instagram"></i>
              </Link>
              <Link to="" className="me-4 link-secondary">
                <i className="fab fa-linkedin"></i>
              </Link>
              <Link to="" className="me-4 link-secondary">
                <i className="fab fa-github"></i>
              </Link>
            </div>
          </section>
        </section>

        <div className="text-center p-4 copyright">© 2024 Copyright</div>
      </footer>
    </>
  );
};

export default Footer;
