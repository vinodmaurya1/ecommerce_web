import React from "react";
import Header2 from "../../components/header/Header2";
import Breadcrumb from "../../components/breadcrumb";
import Footer from "../../components/footer";
import Gotop from "../../components/gotop";
import SignIn from "../../components/signin";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { Collapse } from "react-collapse";
import logo from "../../assets/images/logo.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import img1 from "../../assets/images/review/thumb2.png";
import img2 from "../../assets/images/pages/register.jpg";
import shape1 from "../../assets/images/review/shape.png";
import client1 from "../../assets/images/review/client.jpg";
import icon1 from "../../assets/images/review/icon1.png";
import icon2 from "../../assets/images/review/icon2.png";
import icon3 from "../../assets/images/review/icon3.png";
import icon4 from "../../assets/images/review/envelope.png";
import CountUp from "react-countup";
import { Waypoint } from "react-waypoint";
import img7 from "../../assets/images/job/work-icon-1.jpg";
import img8 from "../../assets/images/job/work-icon-2.jpg";
import img9 from "../../assets/images/job/work-icon-3.jpg";
import MailForwordCon from "../../components/mailForward/MailForwordCon";
import MobileView from "../../components/mobileview/MobileView";

function RegisteredAgent(props) {
  const [toggle, setToggle] = useState({
    key: "",
    status: false,
  });
  const [isShowMobile, setShowMobile] = useState(false);

  const handleToggle = (key) => {
    if (toggle.key === key) {
      setToggle({
        status: false,
      });
    } else {
      setToggle({
        status: true,
        key,
      });
    }
  };

  const handleMobile = () => {
    const getMobile = document.querySelector(".menu-mobile-popup");
    setShowMobile(!isShowMobile);
    !isShowMobile
      ? getMobile.classList.add("modal-menu--open")
      : getMobile.classList.remove("modal-menu--open");
  };

  const [viewPortEntered, setViewPortEntered] = useState(false);

  const onVWEnter = () => {
    setViewPortEntered(true);
  };

  return (
    <>
      <MobileView/>
      <Header2 clname="actPage9" handleMobile={handleMobile} />
      <Breadcrumb title="Registered Agent Service" />

      <section className="inner-review-section">
        <div className="tf-container">
          <div className="row">
            <div className="col-lg-6 col-md-12 wow fadeInRight">
            <form className="wd-form-rating">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="form-rating-heading">
                        <h5>Registered Agent Service</h5>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-rating-content">
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="wrap-input">
                              <label>First Name</label>
                              <input type="text" placeholder="First name" />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="wrap-input">
                              <label>Last Name</label>
                              <input type="text" placeholder="Last name" />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="wrap-input">
                              <label>Email</label>
                              <input
                                type="email"
                                placeholder="jobtex@mail.com"
                                required
                              />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="wrap-input">
                              <label>Phone</label>
                              <input
                                type="number"
                                placeholder="Number"
                              />
                            </div>
                          </div>
                          <div className="col-lg-12">
                            <div className="wrap-notes">
                              <label>Address</label>
                              <textarea
                                cols="30"
                                rows="10"
                                placeholder="Address"
                              ></textarea>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <button className="tf-btn-submit style-2">
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
            </div>
            <div className="col-lg-6 col-md-12">
              <div className="wd-review-job thumb2 widget-counter stc">
                <div className="thumb" style={{ marginLeft: "0px" }}>
                  <img src={img2} alt="images" />
                </div>
                <div className="trader-box">
                  <div className="shape ani7">
                    <img src={shape1} alt="images" />
                  </div>
                </div>
                <div className="icon1 ani3">
                  <img src={icon1} alt="images" />
                </div>
                <div className="icon2 ani4">
                  <img src={icon2} alt="images" />
                </div>
                <div className="icon3 ani6">
                  <img src={icon4} alt="images" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <MailForwordCon />
      <Footer />
      <Gotop />
    </>
  );
}

export default RegisteredAgent;
