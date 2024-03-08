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
import img1 from "../../assets/images/pages/email-forwarding2.png";
import img2 from "../../assets/images/pages/MailForwarding.png";
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

function MailForwarding(props) {
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
      <Breadcrumb title="Mail Forwarding" />

      <section className="inner-review-section">
        <div className="tf-container">
          <div className="row">
            <div className="col-lg-6 col-md-12 wow fadeInRight">
              <div className="wd-review-job contentbox1 page-text stc">
                <h3 className="border-bottom border-primary pb-3 border-3">
                  Mail Forwarding
                </h3>
                <p>
                  Your mail forwarding service needs to be able to reach
                  wherever you are in the world. When you’re on the move, your
                  post needs to keep up.
                </p>
                <p>
                  Mail Forwarding is a reliable and efficient service offered by
                  USA PMB to cater to the needs of individuals constantly on the
                  move. Whether you’re relocating for work, traveling
                  extensively, or simply seeking flexibility in managing your
                  mail, Mail Forwarding ensures that your post stays connected
                  with you. With this service, you can conveniently forward your
                  mail to one address today and effortlessly change it tomorrow,
                  adapting to your evolving needs.
                </p>
                <p>
                  With Mail Forwarding, the hassles of missed deliveries and
                  lost mail are a thing of the past. USA PMB acts as your
                  trusted intermediary, receiving your mail at a secure location
                  and promptly forwarding it to your desired address, wherever
                  you may be. This seamless process ensures that you stay
                  connected to your important correspondence and documents, even
                  while on the move.This service grants you the freedom to shop
                  from various online stores without the hassle of multiple
                  shipments or exorbitant international shipping fees. USA PMB’s
                  reliable network ensures that your packages are handled with
                  care and delivered to your desired destination in a timely
                  manner, regardless of where you are located in the world.
                </p>
              </div>
            </div>
            <div className="col-lg-6 col-md-12">
              <div className="wd-review-job thumb2 widget-counter stc">
                <div className="thumb" style={{ marginLeft: "0px" }}>
                  <img src={img1} alt="images" />
                </div>
                <div className="trader-box">
                  {/* <div className="content">
                    <h3 className="number wrap-counter">
                      <Waypoint onEnter={onVWEnter}>
                        <span>
                          {viewPortEntered && (
                            <CountUp
                              className="number"
                              end={25}
                              suffix="M+"
                              duration={3}
                            />
                          )}
                        </span>
                      </Waypoint>
                    </h3>
                    <div className="des">Jobs Available</div>
                  </div> */}
                  <div className="shape ani7">
                    <img src={shape1} alt="images" />
                  </div>
                </div>
                {/* <div className="tes-box ani5">
                  <div className="client-box">
                    <div className="avt">
                      <img src={client1} alt="images" />
                      <div className="badge"> </div>
                    </div>
                    <div className="content">
                      <h6 className="number wrap-counter">
                        <Waypoint onEnter={onVWEnter}>
                          <span>
                            {viewPortEntered && (
                              <CountUp
                                className="number"
                                end={480}
                                suffix="+"
                                duration={3}
                              />
                            )}
                          </span>
                        </Waypoint>
                      </h6>
                      <div className="des">Happpy Candidates</div>
                    </div>
                  </div>
                </div> */}
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

export default MailForwarding;