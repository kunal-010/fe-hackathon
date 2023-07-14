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
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Form,
  FormGroup,
  FormGroupProps
} from "reactstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

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
  const [modal, setModal] = useState(false);
  const [emailName, setEmailName]= useState("");
  const [validEmail,setValidEmail] = useState(true);
  const [validPassword,setValidPassord] = useState(true);

  const onChange = (e) => {
    setEmailName(e.target.value);
    let regex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
    let result = regex.test(e.target.value);
    if(!result){
      setValidEmail(false)
    }else{
      setValidEmail(true)
    }
  }

  const onPasswordChange = (e) => {
    
    if(e.target.value?.length < 6){
      setValidPassord(false)
    }else{
      setValidPassord(true)
    }
  } 
  const toggle = () => setModal(!modal);
  const onAdd = () => {
    let newEmails = emails;
    let routeName = emailName;
    newEmails.push({
      path: "/" + routeName ,
      name: routeName,
      icon: "ni ni-planet text-blue",
      component: <Icons />,
      layout: "/email",
      pause: false
    });
    setEmails(emails);
    navigate("/email/" + routeName)
  }

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7 bg-gradient-info" fluid style={{display: "flex", justifyItems: "center"}}>
        <Button style={{margin: "auto"}} onClick={() => toggle()}>Add MailBox</Button>
        <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Configure Email</ModalHeader>
        <ModalBody>
            <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    autoComplete="new-email"
                    onChange = {(e)=> onChange(e)}
                  />
                </InputGroup>
              </FormGroup>
              {!validEmail && <div style={{color: "red"}}>Enter valid email</div>}
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                    onChange={(e) => onPasswordChange(e)}
                  />
                </InputGroup>
              </FormGroup>
              {!validPassword && <div style={{color: "red"}}>Password length should be at least 6</div>}
              <div className="text-center">
                <Button className="my-4" color="primary" type="button" onClick={() => onAdd()}>
                  Add
                </Button>
              </div>
            </Form>
        </ModalBody>
        {/* <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Do Something
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter> */}
      </Modal>

      </Container>
    </>
  );
};

export default Index;
