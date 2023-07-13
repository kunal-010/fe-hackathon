/*!

=========================================================
* Argon Dashboard React - v1.2.3
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { useContext, useState } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "variables/charts.js";

import Header from "components/Headers/Header.js";
import { EmailsContext } from "Context/EmailsContext";
import Icons from "./examples/Icons";
import { useNavigate } from "react-router-dom";

const Index = (props) => {
  const {emails, setEmails} = useContext(EmailsContext); 
  const navigate = useNavigate();
  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const onAdd = () => {
    let newEmails = emails;
    let routeName = "test@gmail.com" + Math.floor(Math.random() * (1000 - 100) + 100) / 100;
    newEmails.push({
      path: "/" + routeName ,
      name: routeName,
      icon: "ni ni-planet text-blue",
      component: <Icons />,
      layout: "/email",
    });
    setEmails(emails);
    navigate("/email/" + routeName)
  }

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7 bg-gradient-info" fluid>
        <Button style={{margin: "auto"}} onClick={() => onAdd()}>Add Email</Button>
      </Container>
    </>
  );
};

export default Index;
