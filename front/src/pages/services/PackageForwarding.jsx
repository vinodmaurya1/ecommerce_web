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

function PackageForwarding(props) {
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
      <Breadcrumb title="Package Forwarding" />

      <section className="inner-review-section">
        <div className="tf-container">
          <div className="row">
            <div className="col-lg-6 col-md-12 wow fadeInRight">
              <div className="wd-review-job contentbox1 page-text stc">
                <h3 className="border-bottom border-primary pb-3 border-3">
                  Package Forwarding
                </h3>
                <p>
                  Package Forwarding is an exceptional service provided by USA
                  PMB, specially designed for individuals living or working
                  overseas who desire the convenience of consolidating their
                  parcels into a single shipment from the United States. Whether
                  you are an expatriate, an international shopper, or someone
                  seeking cost-effective and efficient shipping solutions,
                  Package Forwarding is your ideal choice.
                </p>
                <p>
                  With Package Forwarding, you can effortlessly shop from
                  US-based online retailers and have your purchases delivered to
                  a dedicated address provided by USA PMB. Once the packages
                  arrive, USA PMB’s professional team securely consolidates them
                  into a single shipment, reducing shipping costs and
                  simplifying the logistics process.
                </p>
                <p>
                  This service grants you the freedom to shop from various
                  online stores without the hassle of multiple shipments or
                  exorbitant international shipping fees. USA PMB’s reliable
                  network ensures that your packages are handled with care and
                  delivered to your desired destination in a timely manner,
                  regardless of where you are located in the world.
                </p>
                <p>
                  By utilizing Package Forwarding, you can enjoy the benefits of
                  a centralized shipping hub, giving you greater control over
                  your purchases and enabling you to take advantage of exclusive
                  deals and discounts available in the US market. Experience the
                  convenience and cost-saving advantages of Package Forwarding
                  from USA PMB, and unlock a world of international shopping
                  possibilities.
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

export default PackageForwarding;
