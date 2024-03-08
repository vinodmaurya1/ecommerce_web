import React from "react";
import Header2 from "../components/header/Header2";
import Breadcrumb from "../components/breadcrumb";
import Footer from "../components/footer";
import Gotop from "../components/gotop";
import FaqItem from "../components/faq";
import dataFaq from "../assets/fakeData/dataFaq";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { Collapse } from "react-collapse";
import logo from "../assets/images/logo.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import Header4 from "../components/header/Header4";
import MobileView from "../components/mobileview/MobileView";

function Faqs(props) {
  const [isShowMobile, setShowMobile] = useState(false);



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
      <Header2 clname="actPage6" handleMobile={handleMobile} />
      <Breadcrumb title="Accordion" />
      <FaqItem data={dataFaq} />
      <Footer />
      <Gotop />
    </>
  );
}

export default Faqs;
