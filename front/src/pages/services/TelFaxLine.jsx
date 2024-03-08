import React from "react";
import Header2 from "../../components/header/Header2";
import Breadcrumb from "../../components/breadcrumb";
import Footer from "../../components/footer";
import Gotop from "../../components/gotop";
import { useState } from "react";
import { Link } from "react-router-dom";
import img1 from "../../assets/images/review/thumb2.png";
import img2 from "../../assets/images/pages/cellphone.png";
import shape1 from "../../assets/images/review/shape.png";
import client1 from "../../assets/images/review/client.jpg";
import icon1 from "../../assets/images/review/icon1.png";
import icon2 from "../../assets/images/review/icon2.png";
import icon3 from "../../assets/images/review/icon3.png";
import icon4 from "../../assets/images/review/envelope.png";
import MailForwordCon from "../../components/mailForward/MailForwordCon";
import MobileView from "../../components/mobileview/MobileView";

function TelFaxLine(props) {
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
      <Breadcrumb title="Local Tel/Fax Line" />
      <section className="inner-review-section">
        <div className="tf-container">
          <div className="row">
            <div className="col-lg-6 col-md-12 wow fadeInRight">
              <div className="wd-review-job contentbox1 page-text stc">
                <h3 className="border-bottom border-primary pb-3 border-3">
                  Local Tel/Fax Line
                </h3>
                <p>
                  USA PMB’s Local Tel/Fax Line service provides individuals and
                  businesses with the convenience of having a local phone number
                  for both incoming and outgoing calls. This service enables
                  seamless communication with customers, clients, and partners
                  in specific geographic regions within the United States.
                </p>
                <p>
                  By booking a local phone number through USA PMB, businesses
                  can establish a local presence in their target markets. This
                  creates a sense of familiarity and trust among customers, as
                  they can easily reach the business through a local phone
                  number. It eliminates the need for long-distance calls and
                  international dialing codes, enhancing accessibility and
                  convenience for both parties.
                </p>
                <p>
                  With the Local Tel/Fax Line service, businesses can also make
                  outgoing calls using the local phone number.
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

export default TelFaxLine;