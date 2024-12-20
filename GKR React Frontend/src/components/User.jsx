import React, { useEffect, useState } from "react";
import { Container, Col, Row, ListGroup } from "reactstrap";
import { Link, Routes, Route } from "react-router-dom";
import AdminHome from "./admin/AdminHome";
import AdminManageCustomers from "./admin/AdminManageCustomers";
import AdminManageHomeMakers from "./admin/AdminManageHomeMakers";
import AdminManageOrders from "./admin/AdminManageOrders";
import CustomerHm from "./customer/CustomerHm";
import CustomerProfile from "./customer/CustomerProfile";
import HomeMakerProfile from "./home-maker/HomeMakerProfile";
import HomeMakerCustomers from "./home-maker/HomeMakerCustomers";
import EditCustomerProfile from "./customer/EditCustomerProfile";
import EditHomeMakerProfile from "./home-maker/EditHomeMakerProfile";
import CustomerOrders from "./customer/CustomerOrders";
import HomeMakerOrders from "./home-maker/HomeMakerOrders";
import CustomerMyHm from "./customer/CustomerMyHm";
import SessionService from "../service/SessionService";

const User = () => {
  const [role, setRole] = useState(null); // Initialize role as null

  useEffect(() => {
    // Fetch the role from the session service and set it
    const currentRole = SessionService.getRole();
    setRole(currentRole);
  }, []); // Empty dependency array to only run on initial render

  const paths = {
    admin: [
      { path: "/admin/profile", value: "Admin Home" },
      { path: "/admin/manageCustomers", value: "Manage Customers" },
      { path: "/admin/manageHomeMakers", value: "Manage Home Makers" },
      { path: "/admin/manageOrders", value: "Manage Orders" },
    ],
    customer: [
      { path: "/customer/profile", value: "Customer Profile" },
      { path: "/customer/myHomeMaker", value: "My Home Maker" },
      { path: "/customer/orders", value: "My Orders" },
    ],
    homeMaker: [
      { path: "/homeMaker/profile", value: "Home Maker Profile" },
      { path: "/homeMaker/customers", value: "My Customers" },
      { path: "/homeMaker/orders", value: "My Orders" },
    ],
  };

  return (
    <div className="text-center py-4 bg-light">
      <Container>
        {/* Navigation Links */}
        <Row className="mb-4">
          <Col>
            <ListGroup className="list-group-horizontal justify-content-center">
              {role === "admin" &&
                paths.admin.map((item, index) => (
                  <Link
                    key={index}
                    className="list-group-item list-group-item-action bg-primary text-white font-weight-bold mx-2 rounded shadow-sm"
                    to={item.path}
                  >
                    {item.value}
                  </Link>
                ))}
              {role === "customer" &&
                paths.customer.map((item, index) => (
                  <Link
                    key={index}
                    className="list-group-item list-group-item-action bg-success text-white font-weight-bold mx-2 rounded shadow-sm"
                    to={item.path}
                  >
                    {item.value}
                  </Link>
                ))}
              {role === "homeMaker" &&
                paths.homeMaker.map((item, index) => (
                  <Link
                    key={index}
                    className="list-group-item list-group-item-action bg-info text-white font-weight-bold mx-2 rounded shadow-sm"
                    to={item.path}
                  >
                    {item.value}
                  </Link>
                ))}
            </ListGroup>
          </Col>
        </Row>

        {/* Content Area */}
        <Row>
          <Col
            md={{ size: 10, offset: 1 }}
            className="bg-white p-4 rounded shadow-sm"
          >
            {role === "customer" && (
              <Routes>
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
              </Routes>
            )}
            {role === "admin" && (
              <Routes>
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
              </Routes>
            )}
            {role === "homeMaker" && (
              <Routes>
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
              </Routes>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default User;
