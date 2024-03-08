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
import img2 from "../../assets/images/pages/fufuilfment.png";
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

function Fulfillment(props) {
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
      <Breadcrumb title="Fulfillment/Shop And Ship Service" />

      <section className="inner-review-section">
        <div className="tf-container">
          <div className="row">
            <div className="col-lg-6 col-md-12 wow fadeInRight">
              <div className="wd-review-job contentbox1 page-text stc">
                <h3 className="border-bottom border-primary pb-3 border-3">
                  Fulfillment/Shop And Ship Service
                </h3>
                <p>
                  Fulfillment/Shop & Ship Services offered by USA PMB is a
                  comprehensive solution designed to meet the needs of
                  businesses looking to expand their operations and sell in
                  North America.
                </p>
                <p>
                  This service combines order fulfillment, drop-shipping, and a
                  reliable returns address, providing businesses with all the
                  necessary tools to successfully sell their products in the
                  region. With Fulfillment/Shop & Ship Services, businesses can
                  seamlessly outsource their warehousing, order processing, and
                  shipping tasks to USA PMB.
                </p>
                <p>
                  This allows them to focus on core aspects of their business
                  while USA PMB takes care of the logistics. Whether it’s
                  storing inventory, picking and packing orders, or shipping
                  products to customers, USA PMB ensures smooth and efficient
                  operations.
                </p>
              </div>
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

export default Fulfillment;
