import React from "react";
import Header2 from "../components/header/Header2";
import Breadcrumb from "../components/breadcrumb";
import Footer from "../components/footer";
import Gotop from "../components/gotop";
import Pricing1 from "../components/pricing";
import Pricing2 from "../components/pricing/Pricing2";
import Pricing3 from "../components/pricing/Pricing3";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { Collapse } from "react-collapse";
import logo from "../assets/images/logo.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import MobileView from "../components/mobileview/MobileView";

function Pricing(props) {
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
  return (
    <>
      <MobileView/>
      <Header2 clname="actPage8" handleMobile={handleMobile} />
      <Breadcrumb title="Pricing" className="breadcrumb-section" />
      <Pricing1 />
      {/* <Pricing2 /> 
      <Pricing3 />*/}
      <Footer />
      <Gotop />
    </>
  );
}

export default Pricing;
