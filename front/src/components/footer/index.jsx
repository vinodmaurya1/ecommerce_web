import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

Footer.propTypes = {
    
};

function Footer(props) {
    return (
        <footer className="footer">
                <div className="top-footer">
                <div className="tf-container">
                    <div className="row">
                    <div className="col-lg-2 col-md-4">
                        <div className="footer-logo">
                        <img src={require ('../../assets/images/logo-2.png')} alt="images" />
                        </div>
                    </div>
                    <div className="col-lg-10 col-md-8">
                        <div className="wd-social d-flex aln-center">
                        <span>Follow Us:</span>
                        <ul className="list-social d-flex aln-center">
                            <li><Link to="#"><i className="icon-facebook"></i></Link></li>
                            <li><Link to="#"><i className="icon-linkedin2"></i></Link></li>
                            <li><Link to="#"><i className="icon-twitter"></i></Link></li>
                            <li><Link to="#"><i className="icon-pinterest"></i></Link></li>
                            <li><Link to="#"><i className="icon-instagram1"></i></Link></li>
                            <li><Link to="#"><i className="icon-youtube"></i></Link></li>
                        </ul>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                <div className="inner-footer">
                <div className="tf-container">
                    <div className="row">
                    <div className="col-lg-3 col-md-6">
                        <div className="footer-cl-1">
                        <div className="icon-infor d-flex aln-center">
                            <div className="icon">
                            <span className="icon-call-calling"><span className="path1"></span><span className="path2"></span><span
                                className="path3"></span><span className="path4"></span></span>
                            </div>
                            <div className="content">
                            <p>Need help? 24/7</p>
                            <h6><Link to="tel:0123456678">001-1234-88888</Link></h6>
                            </div>
                        </div>
                        <p>Welcome to USA PMB, an online platform dedicated to revolutionizing mail and package management. </p>
                        <div className="ft-icon"> <i className="icon-map-pin"></i> 101 E 129th St, East Chicago, IN 46312, US</div>
                        <form action="#" id="subscribe-form">
                            <input type="email" placeholder="Your email address" required="" id="subscribe-email" />
                            <button className="tf-button" type="submit" id="subscribe-button"><i
                                className="icon-paper-plane-o"></i></button>
                        </form>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-6">
                        <div className="footer-cl-2">
                        <h6 className="ft-title">
                            Quick Links
                        </h6>
                        <ul className="navigation-menu-footer">
                            <li> <Link to="/howtowork">How it Works</Link> </li>
                            <li> <Link to="/pricing">Plans</Link> </li>
                            <li> <Link to="/faqs">FAQ’s</Link> </li>
                            <li> <Link to="/aboutus">About Us</Link> </li>
                            <li> <Link to="/contactus">Contact Us</Link> </li>
                        </ul>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-6">
                        <div className="footer-cl-3">
                        <h6 className="ft-title">
                            For Candidates
                        </h6>
                        <ul className="navigation-menu-footer">
                            <li> <Link to="/MailForwarding">Mail Forwarding</Link> </li>
                            <li> <Link to="/PackageForwarding">Package Forwarding</Link> </li>
                            <li> <Link to="/OnlineMailManagement">Online Mail Manage</Link> </li>
                            <li> <Link to="/Edmm_dmm">EDDM / DMM</Link> </li>
                            <li> <Link to="/Company_Formation_Service">Company Formation Service</Link> </li>
                        </ul>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-6">
                        <div className="footer-cl-4">
                        <h6 className="ft-title">
                            Services Link
                        </h6>
                        <ul className="navigation-menu-footer">
                            <li> <Link to="/RegisteredAgent">Registered Agent Service</Link> </li>
                            <li> <Link to="/Tel_Fax_Line">Local Tel Fax Line</Link> </li>
                            <li> <Link to="employers-grid-sidebar.html">Business Mailbox</Link> </li>
                            <li> <Link to="find-jobs-list.html">Affiliate Program</Link> </li>
                            <li> <Link to="find-jobs-list.html">Referral Program</Link> </li>
                        </ul>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                <div className="bottom">
                <div className="tf-container">
                    <div className="row">
                    <div className="col-lg-6 col-md-6">
                        <div className="bt-left">
                        <div className="copyright">©2023 Mailbox All Rights Reserved.</div>
                        <div className="select-language">
                            <div className="dropdown" id="language">
                            <a className="btn-selector nolink input-form"><span><img src={require ('../../assets/images/review/flag.png')} alt="" /></span>
                                English</a>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <ul className="menu-bottom d-flex aln-center">
                        <li><Link to="term-of-use.html">Terms Of Services</Link> </li>
                        <li><Link to="pricing.html">Privacy Policy</Link> </li>
                        <li><Link to="contact-us.html">Cookie Policy</Link> </li>
                        </ul>
                    </div>
                    </div>
                </div>
                </div>
            </footer>
    );
}

export default Footer;