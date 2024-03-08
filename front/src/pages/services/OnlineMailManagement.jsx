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
import img2 from "../../assets/images/pages/onlineshopping.png";
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

function OnlineMailManagement(props) {
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
      <Breadcrumb title="Online Mail Management" />
      <section className="inner-review-section">
        <div className="tf-container">
          <div className="row">
            <div className="col-lg-6 col-md-12 wow fadeInRight">
              <div className="wd-review-job contentbox1 page-text stc">
                <h3 className="border-bottom border-primary pb-3 border-3">
                  Online Mail Management
                </h3>
                <p>
                  Online Mail Management is a cutting-edge service offered by
                  USA PMB, designed to revolutionize the way individuals handle
                  their postal communications. With this service, customers gain
                  access to USA PMB’s market-leading software, providing them
                  with complete control over their mail and parcels from the
                  convenience of an online platform.
                </p>
                <p>
                  Through Online Mail Management, customers can effortlessly log
                  in to their accounts and navigate an intuitive interface that
                  empowers them to manage their post and parcels with ease. This
                  innovative software allows users to view, organize, and take
                  action on their mail items, providing them with a
                  comprehensive overview of their postal communications..
                </p>
                <p>
                  Whether it’s sorting through important letters, tracking the
                  status of incoming packages, or initiating forwarding
                  requests, Online Mail Management puts the power in the hands
                  of customers, allowing them to efficiently handle their mail
                  from anywhere in the world.
                </p>
                <p>
                  By leveraging the capabilities of this service, customers can
                  enjoy a seamless and streamlined approach to managing their
                  postal communications, saving time, reducing administrative
                  burdens, and ensuring that they never miss important
                  correspondence.
                </p>
                <p>
                  Experience the convenience and efficiency of Online Mail
                  Management from USA PMB, and take control of your post and
                  parcels through a secure and user-friendly online platform
                  that sets the standard in the industry.
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

export default OnlineMailManagement;
