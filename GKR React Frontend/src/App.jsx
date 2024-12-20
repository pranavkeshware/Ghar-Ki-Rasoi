import "./App.css";
import { useEffect, useState } from "react";
import { Container } from "reactstrap";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import SessionService from "./service/SessionService";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import AboutUs from "./components/AboutUs";
import Login from "./components/Login";
import Signup from "./components/Signup";
import User from "./components/User";
import AdminHome from "./components/admin/AdminHome";
import AdminManageCustomers from "./components/admin/AdminManageCustomers";
import AdminManageHomeMakers from "./components/admin/AdminManageHomeMakers";
import AdminManageOrders from "./components/admin/AdminManageOrders";
import CustomerHm from "./components/customer/CustomerHm";
import CustomerProfile from "./components/customer/CustomerProfile";
import HomeMakerProfile from "./components/home-maker/HomeMakerProfile";
import HomeMakerCustomers from "./components/home-maker/HomeMakerCustomers";
import CustomerMyHm from "./components/customer/CustomerMyHm";
import EditCustomerProfile from "./components/customer/EditCustomerProfile";
import EditHomeMakerProfile from "./components/home-maker/EditHomeMakerProfile";
import CustomerOrders from "./components/customer/CustomerOrders";
import HomeMakerOrders from "./components/home-maker/HomeMakerOrders";

function App() {
  const [role, setRole] = useState();
  const [user, setUser] = useState({});

  useEffect(() => {
    setRole(SessionService.getRole());
    setUser(SessionService.getCurrentUser());
  }, []); // Empty dependency array to run only once on component mount

  return (
    <div className="text-center" style={{ background: "#800020" }}>
      <Router>
        <ToastContainer />
        <Container>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/aboutUs" element={<AboutUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            {/* Render User Component when a user is logged in */}
            {user && <Route path="/user/*" element={<User />} />}
            {/* Routes based on role */}
            {role === "customer" && (
              <>
                <Route path="/customer/profile" element={<CustomerProfile />} />
                <Route path="/customer/homeMaker" element={<CustomerHm />} />
                <Route
                  path="/customer/myHomeMaker"
                  element={<CustomerMyHm />}
                />

                <Route
                  path="/customer/edit-profile"
                  element={<EditCustomerProfile />}
                />
                <Route path="/customer/orders" element={<CustomerOrders />} />
              </>
            )}
            {role === "homeMaker" && (
              <>
                <Route
                  path="/homeMaker/profile"
                  element={<HomeMakerProfile />}
                />
                <Route
                  path="/homeMaker/customers"
                  element={<HomeMakerCustomers />}
                />
                <Route
                  path="/homeMaker/edit-profile"
                  element={<EditHomeMakerProfile />}
                />
                <Route path="/homeMaker/orders" element={<HomeMakerOrders />} />
              </>
            )}
            {role === "admin" && (
              <>
                <Route path="/admin/profile" element={<AdminHome />} />
                <Route
                  path="/admin/manageCustomers"
                  element={<AdminManageCustomers />}
                />
                <Route
                  path="/admin/manageHomeMakers"
                  element={<AdminManageHomeMakers />}
                />
                <Route
                  path="/admin/manageOrders"
                  element={<AdminManageOrders />}
                />
              </>
            )}
          </Routes>
        </Container>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
