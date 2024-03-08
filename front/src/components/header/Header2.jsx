import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import logo1 from "../../assets/images/logo-2.png";
import logo from "../../assets/images/logo-2.png";
import avt from "../../assets/images/user/avatar/Admin-Profile.png";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartDetail, showUserDetail } from "../../redux/stateSlice/authSlice";
import { api_url } from "../../redux/config";
import axios from "axios";
import { toast } from "react-toastify";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

Header2.propTypes = {};

function Header2({ clname = "", handleMobile }) {
  const [userDetails, setUserDetails] = useState([""]);
  const [scroll, setScroll] = useState(0);
  const dispatch = useDispatch();
  const { user, cart } = useSelector((state) => state.user);
  const [userBtn, setUserBtn] = useState(false);

  useEffect(() => {
    document.addEventListener("scroll", () => {
      const scrollCheck = window.scrollY > 100;
      if (scrollCheck !== scroll) {
        setScroll(scrollCheck);
      }
    });
  }, []);

  const LoginToken = localStorage.getItem("logintoken");

  useEffect(() => {
    if (LoginToken !== "") {
      // getUser();
      dispatch(showUserDetail());
      dispatch(cartDetail());
      // console.log(LoginToken, "nav");
    }
  }, [LoginToken]);

  useEffect(() => {
    if (!user) {
      setUserBtn(false);
      setUserDetails("");
    } else {
      setUserBtn(true);
      console.log("cart", cart);
      setUserDetails(user?.user);
    }
  }, [user, cart]);

  const handleLogout = async () => {
    try {
      // setLoading(true);
      const response = await axios.post(
        `${api_url}/logout`,
        {},
        {
          headers: {
            Authorization: `${LoginToken}`,
          },
        }
      );
      if (response) {
        // setLoading(false);
        console.log("res", response);
        // console.log("res", response.data);
        if (response.data.success === true) {
          setUserBtn(false);
          toast.success(response.data.message);
          // props.navigation.navigate('Login');
          localStorage.setItem("logintoken", "");
          localStorage.removeItem("logintoken");
          dispatch(showUserDetail());
        }
      }
    } catch (error) {
      // setLoading(false);
      console.log("error-logout", error);
    }
  };

  return (
    <header
      id="header"
      className={`header header-default ${scroll ? "is-fixed is-small" : ""}`}
    >
      <div className="tf-container ct2">
        <div className="row">
          <div className="col-md-12">
            <div className="sticky-area-wrap">
              <div className="header-ct-left">
                <div id="logo" className="logo">
                  <Link to="/">
                    <img
                      className="site-logo"
                      id="trans-logo"
                      src={logo}
                      alt="Image"
                      style={{}}
                    />
                  </Link>
                </div>
              </div>
              <div className="header-ct-center">
                <div className="nav-wrap">
                  <nav id="main-nav" className="main-nav">
                    <ul id="menu-primary-menu" className={`menu ${clname}`}>
                      <li className="menu-item sub1">
                        <Link to="/">Home </Link>
                      </li>
                      <li className="menu-item sub2">
                        <Link to="/users">Users</Link>
                      </li>
                      {userBtn && (
                        <>
                          <li className="menu-item sub3">
                            <Link to="/profile_info">Profile</Link>
                          </li>
                          <li className="menu-item sub4">
                            <Link to="/admin">Admin</Link>
                          </li>
                        </>
                      )}
                      <li className="menu-item sub5">
                        <Link to="/shop">Shop</Link>
                      </li>
                      <li className="menu-item sub6">
                        <Link to="/contactus">Contact Us</Link>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
              <div className="header-ct-right">
                {userBtn ? (
                  <>
                    <div className="header-customize-item help">
                      <IconButton
                        aria-label="cart"
                        sx={{ marginRight: "10px" }}
                      ></IconButton>
                    </div>
                    <IconButton aria-label="cart" sx={{ marginRight: "10px" }}>
                      <Link to="/profile_info"  style={{ marginRight: "30px" }}>
                        <Badge
                          max={user?.user?.wallet ? user?.user?.wallet : 0}
                          badgeContent={
                            user?.user?.wallet ? user?.user?.wallet : 0
                          }
                          color="success"
                        >
                          <AccountBalanceWalletOutlinedIcon color="action" />
                        </Badge>
                      </Link>
                      <Link to="/shoppingcart">
                        <StyledBadge
                          badgeContent={
                            cart?.data?.products?.length
                              ? cart?.data?.products?.length
                              : 0
                          }
                          color="secondary"
                        >
                          <ShoppingCartOutlinedIcon />
                        </StyledBadge>
                      </Link>
                    </IconButton>
                    <div class="dropdown">
                      <div className="header-customize-item account ">
                        <img
                          src={user?.user?.profile_img_url}
                          alt="user"
                          width={50}
                        />
                        <div className="name">{user?.user?.name}</div>
                      </div>
                      <div class="dropdown-content">
                        <div
                          className="header-customize-item button"
                          onClick={handleLogout}
                        >
                          <Link to="/">Logout</Link>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="header-customize-item login btn btn-outline-primary"
                  >
                    Sign In / Sign Up
                    {/* <Link to="/login">
                     
                    </Link> */}
                    {/* <Link to="/login">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                            stroke="#121212"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                            stroke="#121212"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </Link> */}
                    {/* <ul className="item-login">
                      <li>
                        <Link to="/login">Login</Link>
                      </li>
                      <li>
                        <Link to="/createaccount">register</Link>
                      </li>
                    </ul> */}
                  </Link>
                )}
              </div>
              <div className="nav-filter" onClick={handleMobile}>
                <div className="nav-mobile">
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header2;
