import React, { useEffect, useState } from "react";
import f_icon1 from "../../assets/images/icons/forwarding-1.png";
import f_icon2 from "../../assets/images/icons/forwarding-2.png";
import f_icon3 from "../../assets/images/icons/forwarding-3.png";
import f_icon4 from "../../assets/images/icons/forwarding-4.png";
import f_icon5 from "../../assets/images/icons/forwarding-5.png";
import f_icon6 from "../../assets/images/icons/forwarding-6.png";
import f_icon7 from "../../assets/images/icons/forwarding-7.png";
import f_icon8 from "../../assets/images/icons/forwarding-8.png";

function MailForwordCon() {
  return (
    <>
      <section className="wd-iconbox style-3 inner-iconbox-section">
        <div className="tf-container">
          <div className="title-iconbox style-3 stc">
            <h4>MAIL FORWARDING FOR EVERY LIFESTYLE</h4>
            <p>
              Mail Forwarding isn’t just a temporary fix for your latest move.
              Virtual Mailboxes and Mail Forwarding Services provide the ideal
              system for:
            </p>
          </div>
          <div className="row">
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
              <div className="tf-iconbox style-3 cl3 stc2 cardHover">
                <div className="box-header">
                  <div className="img1">
                    <img src={f_icon1} alt="img" style={{borderRadius:"0px"}} />
                  </div>
                </div>
                <div className="box-content">
                  <h6 className="box-title">MAlL FORWARDING SERVICES</h6>
                  <p>
                    Your mail forwarding service needs to be able to reach
                    wherever you are in the world. When you’re on the move, your
                    post needs to keep up...
                  </p>
                  <button className="st_btn">
                    Start Now&nbsp;
                    <span className="icon-arrow-right2" />
                  </button>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
              <div className="tf-iconbox style-3 cl3 stc2 cardHover">
                <div className="box-header">
                  <div className="img1">
                    <img src={f_icon2} alt="img" style={{borderRadius:"0px"}} />
                  </div>
                </div>
                <div className="box-content">
                  <h6 className="box-title">PACKAGE FORWARDING</h6>
                  <p>
                    Package Forwarding is an exceptional service provided by USA
                    PMB, specially designed for individuals living...
                  </p>
                  <button className="st_btn">
                    Start Now&nbsp;
                    <span className="icon-arrow-right2" />
                  </button>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
              <div className="tf-iconbox style-3 cl3 stc2 cardHover">
                <div className="box-header">
                  <div className="img1">
                    <img src={f_icon3} alt="img" style={{borderRadius:"0px"}} />
                  </div>
                </div>
                <div className="box-content ">
                  <h6 className="box-title">ONLINE MAIL MANAGEMENT</h6>
                  <p>
                    Online Mail Management is a cutting-edge service offered by
                    USA PMB, designed to revolutionize the way individuals
                    handle their...
                  </p>
                  <button className="st_btn">
                    Start Now&nbsp;
                    <span className="icon-arrow-right2" />
                  </button>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
              <div className="tf-iconbox style-3 cl3 stc2 cardHover">
                <div className="box-header">
                  <div className="img1">
                    <img src={f_icon4} alt="img" style={{borderRadius:"0px"}} />
                  </div>
                </div>
                <div className="box-content ">
                  <h6 className="box-title">EDMM/DMM</h6>
                  <p>
                    EDMM/DMM (Electronic Direct Mail Marketing/Direct Mail
                    Marketing) is an innovative service provided by USA PMB,
                    aimed at simplifying and...
                  </p>
                  <button className="st_btn">
                    Start Now&nbsp;
                    <span className="icon-arrow-right2" />
                  </button>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
              <div className="tf-iconbox style-3 cl3 stc2 cardHover">
                <div className="box-header">
                  <div className="img1">
                    <img src={f_icon5} alt="img" style={{borderRadius:"0px"}} />
                  </div>
                </div>
                <div className="box-content ">
                  <h6 className="box-title">
                    FULL FILLMENT SHOP & SHIP SERVICES
                  </h6>
                  <p>
                    Fulfillment/Shop & Ship Services offered by USA PMB is a
                    comprehensive solution designed to meet the needs...
                  </p>
                  <button className="st_btn">
                    Start Now&nbsp;
                    <span className="icon-arrow-right2" />
                  </button>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
              <div className="tf-iconbox style-3 cl3 stc2 cardHover">
                <div className="box-header">
                  <div className="img1">
                    <img src={f_icon6} alt="img" style={{borderRadius:"0px"}} />
                  </div>
                </div>
                <div className="box-content ">
                  <h6 className="box-title">REGISTERED AGENT</h6>
                  <p>
                    Your mail forwarding service needs to be able to reach
                    wherever you are in the world. When you’re on the move, your
                    post needs to keep up...
                  </p>
                  <button className="st_btn">
                    Start Now&nbsp;
                    <span className="icon-arrow-right2" />
                  </button>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
              <div className="tf-iconbox style-3 cl3 stc2 cardHover">
                <div className="box-header">
                  <div className="img1">
                    <img src={f_icon7} alt="img" style={{borderRadius:"0px"}} />
                  </div>
                </div>
                <div className="box-content ">
                  <h6 className="box-title">COMPANY FORMATION SERVICE</h6>
                  <p>
                    USA PMB’s Company Formation service offers a comprehensive
                    solution for individuals and businesses looking to...
                  </p>
                  <button className="st_btn">
                    Start Now&nbsp;
                    <span className="icon-arrow-right2" />
                  </button>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
              <div className="tf-iconbox style-3 cl3 stc2 cardHover">
                <div className="box-header">
                  <div className="img1">
                    <img src={f_icon8} alt="img" style={{borderRadius:"0px"}} />
                  </div>
                </div>
                <div className="box-content ">
                  <h6 className="box-title">LOCAL TEL/FAX LINE SERVICE</h6>
                  <p>
                    USA PMB’s Local Tel/Fax Line service provides individuals
                    and businesses with the convenience of having a local phone
                    number for both...
                  </p>
                  <button className="st_btn">
                    Start Now&nbsp;
                    <span className="icon-arrow-right2" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="">
        <div className="tf-container pb-4">
          <div className="row">
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
              <div className="tf-iconbox style-3 cl3 stc2 p-0">
                <h6
                  className="box-title text-light py-3"
                  style={{ background: "#004294" }}
                >
                  You'll pay less
                </h6>
                <div className="box-content p-4">
                  <p>
                    With traveling Mailbox,you get the most affordable virtual
                    mailbox and mail forwarding service on the market with
                    top-tier security and features.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
              <div className="tf-iconbox style-3 cl3 stc2 p-0">
                <h6
                  className="box-title text-light py-3"
                  style={{ background: "#004294" }}
                >
                  You'll get world/access
                </h6>
                <div className="box-content p-4">
                  <p>
                    Traveling Mailbox forward mail anywhere Whereever you can
                    connect to WiFi,you’ll have 24/7 control over your virtual
                    mailbox .
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
              <div className="tf-iconbox style-3 cl3 stc2 p-0">
                <h6
                  className="box-title text-light py-3"
                  style={{ background: "#004294" }}
                >
                  You can store everything
                </h6>
                <div className="box-content p-4">
                  <p>
                    You won’t need to sort and shred your mail when you have
                    unlimited Cloud Storage.if you want to hold onto envolopes
                    or PDF Sans you can!
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
              <div className="tf-iconbox style-3 cl3 stc2 p-0">
                <h6
                  className="box-title text-light py-3"
                  style={{ background: "#004294" }}
                >
                  Mobile App
                </h6>
                <div className="box-content p-4">
                  <p>
                    Our mobile app lets you view your mail anytime anywhere.
                    Simply log onto your account to request actions on your mail
                    and packages.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default MailForwordCon;
