import React from "react";
import Header2 from "../components/header/Header2";
import MapSection from "../components/map";
import dataMap from "../assets/fakeData/dataMap";
import Footer from "../components/footer";
import Gotop from "../components/gotop";
import Contact from "../components/contact";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { Collapse } from "react-collapse";
import logo from "../assets/images/logo.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../components/breadcrumb";
import MobileView from "../components/mobileview/MobileView";

function ContactUs(props) {
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
      <Header2 clname="actPage11" handleMobile={handleMobile} />
      {/* <MapSection markers={dataMap} /> */}
      <Breadcrumb title="Contact Us" />
      <Contact />
      <Footer />
      <Gotop />
    </>
  );
}

export default ContactUs;
