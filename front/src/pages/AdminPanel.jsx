import React, { useEffect } from "react";
import Footer from "../components/footer";
import Breadcrumb from "../components/breadcrumb";
import dataCandi from "../assets/fakeData/dataCandi";
import Form3 from "../components/formsearch/Form3";
import CandiSec2 from "../components/candidates/CandiSec2";
import Gotop from "../components/gotop";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { Collapse } from "react-collapse";
import logo from "../assets/images/logo.png";
import Header4 from "../components/header/Header4";
import Form2 from "../components/formsearch/Form2";
import FormSearch from "../components/formsearch";
// import SelectLocation from "../dropdown";
import Dropdown from "react-dropdown";
import SelectLocation from "../components/dropdown";
import MobileView from "../components/mobileview/MobileView";
import Header2 from "../components/header/Header2";
import axios from "axios";
import { api_url } from "../redux/config";
import WalletActionByAdmin from "../components/table/WalletActionByAdmin";
import ProductView from "../components/table/ProductView";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

AdminPanel.propTypes = {};

function AdminPanel(props) {
  const [toggle, setToggle] = useState({
    key: "",
    status: false,
  });
  const { user } = useSelector((state) => state.user);
  const [isShowMobile, setShowMobile] = useState(false);
  const [userDetails, setUserDetails] = useState([]);
  const logintoken = localStorage.getItem("logintoken");
  const [searchData, setSearchData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [userData, setUserData] = useState({
    user_id: user.user?._id,
    name: "",
    description: "",
    product_img: null,
    quantity: null,
    amount: null,
    active: true,
  });

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

  useEffect(() => {
    const fetchUser = () => {
      try {
        axios
          .get(`${api_url}/all_user_details`)
          .then((res) => {
            console.log(res.data);
            setUserDetails(res?.data?.data);
            setSearchData(res?.data?.data);
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);

  // useEffect(() => {
  //   const filteredUsers = userDetails.filter((user) =>
  //     user.name.toLowerCase().includes(searchValue.toLowerCase())
  //   );
  //   setUserDetails(filteredUsers);
  // }, [searchValue]);

  useEffect(() => {
    if (
      searchValue === "" ||
      searchValue === null ||
      searchValue === undefined
    ) {
      setSearchData(userDetails);
    } else {
      const filteredUsers = userDetails.filter(
        (user) =>
          user.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          user.email.toLowerCase().includes(searchValue.toLowerCase())
      );
      setSearchData(filteredUsers);
    }
  }, [searchValue]);

  const handleChange = (e) => {
    if (e.target.type === "file") {
      setUserData({ ...userData, [e.target.id]: e.target.files[0] });
    } else {
      setUserData({ ...userData, [e.target.id]: e.target.value });
    }
  };

  const handleAddProduct = async () => {
    if (
      userData.name === "" ||
      userData.product_img === null ||
      userData.description === "" ||
      userData.quantity === "" ||
      userData.amount === ""
    ) {
      toast.error("Please fill out all required fields!");
    } else {
      const formData = new FormData();
      formData.append("user_id", user.user?._id);
      formData.append("name", userData.name);
      formData.append("description", userData.description);
      formData.append("quantity", userData.quantity);
      formData.append("amount", userData.amount);
      formData.append("product_img", userData.product_img);
      formData.append("active", userData.active);
      await axios
        .post(`${api_url}/add_product`, formData, {
          headers: { Authorization: logintoken },
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.success) {
            toast.success(res.data.message);
            // dispatch(cartDetail())
          } else {
            toast.error(res.data.message);
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.response.data.message);
        });
    }
  };

  return (
    <>
      <MobileView />
      <Header2 clname="actCan1" handleMobile={handleMobile} />
      <Breadcrumb title="Admin" className="breadcrumb-section" />
      <section className="term-section">
        <div className="tf-container">
          <Tabs className="row tf-tab">
            <div className="col-lg-3">
              <TabList className="menu-tab tab-term po-sticky">
                <Tab className="ct-tab">Add Product </Tab>
                <Tab className="ct-tab">User Wallet Action </Tab>
                <Tab className="ct-tab">Products </Tab>
              </TabList>
            </div>
            <div className="col-lg-9">
              <div className="content-tab">
                <TabPanel className="term-content animation-tab">
                  <h6>Add Product</h6>
                  <div class="row g-3">
                    <div class="col-md-6">
                      <label for="name" class="form-label">
                        Product Name
                      </label>
                      <input
                        type="email"
                        class="form-control"
                        id="name"
                        value={userData.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div class="col-md-6">
                      <label for="description" class="form-label">
                        Description
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="description"
                        value={userData.description}
                        onChange={handleChange}
                      />
                    </div>
                    <div class="col-12">
                      <label for="product_img" class="form-label">
                        Product Image
                      </label>
                      <input
                        type="file"
                        class="form-control"
                        id="product_img"
                        onChange={handleChange}
                      />
                    </div>
                    <div class="col-md-6">
                      <label for="quantity" class="form-label">
                        Quantity
                      </label>
                      <input
                        type="number"
                        class="form-control"
                        id="quantity"
                        value={userData.quantity}
                        onChange={handleChange}
                      />
                    </div>
                    <div class="col-md-6">
                      <label for="amount" class="form-label">
                        Amount
                      </label>
                      <input
                        type="number"
                        class="form-control"
                        id="amount"
                        value={userData.amount}
                        onChange={handleChange}
                      />
                    </div>
                    <div class="col-12">
                      <button
                        onClick={handleAddProduct}
                        class="btn btn-primary"
                      >
                        Add Product
                      </button>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel className="term-content animation-tab">
                  <h6>Wallet Transactions</h6>
                  <WalletActionByAdmin />
                </TabPanel>
                <TabPanel className="term-content animation-tab">
                  <h6>Products</h6>
                  <ProductView />
                </TabPanel>
              </div>
            </div>
          </Tabs>
        </div>
      </section>
      <Footer />
      <Gotop />
    </>
  );
}

export default AdminPanel;
