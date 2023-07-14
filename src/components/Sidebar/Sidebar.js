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
/*eslint-disable*/
import { useContext, useState } from "react";
import { NavLink as NavLinkRRD, Link, useNavigate, useParams } from "react-router-dom";
// nodejs library to set properties for components
import { PropTypes } from "prop-types";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";


import { Modal, ModalHeader, ModalBody, ModalFooter, Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Form,
  FormGroup,
  FormGroupProps } from 'reactstrap';
import { EmailsContext } from "Context/EmailsContext";
import Icons from "views/examples/Icons";
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import MailIcon from '@mui/icons-material/Mail';
var ps;

const Sidebar = (props) => {
  const params= useParams();
  const navigate = useNavigate();
  const {emails, setEmails} = useContext(EmailsContext); 
  const [collapseOpen, setCollapseOpen] = useState();
  const [validEmail,setValidEmail] = useState(true);
  const [validPassword,setValidPassord] = useState(true);

  const onEmailChange = (e) => {
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
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  // toggles collapse between opened and closed (true/false)
  const toggleCollapse = () => {
    setCollapseOpen((data) => !data);
  };
  // closes the collapse
  const closeCollapse = () => {
    setCollapseOpen(false);
  };
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const togglePause = (e,key) => {
    let newEmails = emails;
    newEmails[key].pause = !newEmails[key].pause;
    setEmails(newEmails);
    navigate("/email/"+ params["*"].split("/")[1]);
  }

  // creates the links that appear in the left menu / Sidebar
  const createLinks = (routes) => {
    if(!routes)return;
    return routes.map((prop, key) => {
      return (
        <NavItem key={key} style={{display:"flex", flexDirection: "row", alignItems: "center",justifyContent: "space-between", marginRight: "10px"}}>
          <NavLink
            to={prop.layout + prop.path}
            tag={NavLinkRRD}
            onClick={closeCollapse}
          >
            <i className="ni ni-email-83 text-blue" />
            {prop.name}
            
          </NavLink>
          {!prop.pause && <a style={{backgroundColor: "white", border: "0px"}} onClick={(e) => togglePause(e,key)}>
            <PauseIcon style={{justifySelf: "flex-end", cursor: "pointer"}} />
          </a>}
          {prop.pause && <a style={{backgroundColor: "white", border: "0px"}} onClick={(e) => togglePause(e,key)}>
            <PlayArrowIcon style={{justifySelf: "flex-end", cursor: "pointer"}} />
          </a>}
        </NavItem>
      );
    });
  };

  const [emailName, setEmailName]= useState("");

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
  const onAdd = () => {
    let newEmails = emails;
    let routeName = emailName;
    newEmails.push({
      path: "/" + routeName ,
      name: routeName,
      icon: "ni ni-planet text-blue",
      component: <Icons />,
      layout: "/email",
    });
    setEmails(emails);
    setModal(!modal);
    navigate("/email/" + routeName)
  }

  const { bgColor, routes, logo } = props;
  let navbarBrandProps;
  if (logo && logo.innerLink) {
    navbarBrandProps = {
      to: logo.innerLink,
      tag: Link,
    };
  } else if (logo && logo.outterLink) {
    navbarBrandProps = {
      href: logo.outterLink,
      target: "_blank",
    };
  }

  return (
    <Navbar
      className="navbar-vertical fixed-left navbar-light bg-white"
      expand="md"
      id="sidenav-main"
    >
      <Container fluid>
        {/* Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleCollapse}
        >
          <span className="navbar-toggler-icon" />
        </button>
        {/* Brand */}
        {logo ? (
          <NavbarBrand className="pt-0" {...navbarBrandProps}>
            <img
              alt={logo.imgAlt}
              className="navbar-brand-img"
              src={logo.imgSrc}
            />
          </NavbarBrand>
        ) : null}
        {/* User */}
        <Nav className="align-items-center d-md-none">
          <UncontrolledDropdown nav>
            <DropdownToggle nav className="nav-link-icon">
              <i className="ni ni-bell-55" />
            </DropdownToggle>
            <DropdownMenu
              aria-labelledby="navbar-default_dropdown_1"
              className="dropdown-menu-arrow"
              right
            >
              <DropdownItem>Action</DropdownItem>
              <DropdownItem>Another action</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Something else here</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <UncontrolledDropdown nav>
            <DropdownToggle nav>
              <Media className="align-items-center">
                <span className="avatar avatar-sm rounded-circle">
                  <img
                    alt="..."
                    src={require("../../assets/img/theme/team-1-800x800.jpg")}
                  />
                </span>
              </Media>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-arrow" right>
              <DropdownItem className="noti-title" header tag="div">
                <h6 className="text-overflow m-0">Welcome!</h6>
              </DropdownItem>
              <DropdownItem to="/admin/user-profile" tag={Link}>
                <i className="ni ni-single-02" />
                <span>My profile</span>
              </DropdownItem>
              <DropdownItem to="/admin/user-profile" tag={Link}>
                <i className="ni ni-settings-gear-65" />
                <span>Settings</span>
              </DropdownItem>
              <DropdownItem to="/admin/user-profile" tag={Link}>
                <i className="ni ni-calendar-grid-58" />
                <span>Activity</span>
              </DropdownItem>
              <DropdownItem to="/admin/user-profile" tag={Link}>
                <i className="ni ni-support-16" />
                <span>Support</span>
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem href="#pablo" onClick={(e) => navigate("/auth/login")}>
                <i className="ni ni-user-run" />
                <span >Logout</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        {/* Collapse */}
        <Collapse navbar isOpen={collapseOpen}>
          {/* Collapse header */}
          <div className="navbar-collapse-header d-md-none">
            <Row>
              {logo ? (
                <Col className="collapse-brand" xs="6">
                  {logo.innerLink ? (
                    <Link to={logo.innerLink}>
                      <img alt={logo.imgAlt} src={logo.imgSrc} />
                    </Link>
                  ) : (
                    <a href={logo.outterLink}>
                      <img alt={logo.imgAlt} src={logo.imgSrc} />
                    </a>
                  )}
                </Col>
              ) : null}
              <Col className="collapse-close" xs="6">
                <button
                  className="navbar-toggler"
                  type="button"
                  onClick={toggleCollapse}
                >
                  <span />
                  <span />
                </button>
              </Col>
            </Row>
          </div>
          {/* Form */}
          <Form className="mt-4 mb-3 d-md-none">
            <InputGroup className="input-group-rounded input-group-merge">
              <Input
                aria-label="Search"
                className="form-control-rounded form-control-prepended"
                placeholder="Search"
                type="search"
              />
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <span className="fa fa-search" />
                </InputGroupText>
              </InputGroupAddon>  
            </InputGroup>
          </Form>
          {/* Navigation */}
          <Nav navbar>{createLinks(routes)}</Nav>
          {emails.length !== 0 && 
          <Button style={{marginTop: "15px", position: "absolute", bottom: "30px", right: "2px"}} onClick={() => toggle()} >Add MailBox</Button>}
          <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Configure MailBox</ModalHeader>
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
          {/* Divider */}
          {/* <hr className="my-3" /> */}
          {/* Heading */}
          {/* <h6 className="navbar-heading text-muted">Documentation</h6>
          {/* Navigation */}
          {/* <Nav className="mb-md-3" navbar>
            <NavItem>
              <NavLink href="https://demos.creative-tim.com/argon-dashboard-react/#/documentation/overview?ref=adr-admin-sidebar">
                <i className="ni ni-spaceship" />
                Getting started
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://demos.creative-tim.com/argon-dashboard-react/#/documentation/colors?ref=adr-admin-sidebar">
                <i className="ni ni-palette" />
                Foundation
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://demos.creative-tim.com/argon-dashboard-react/#/documentation/alerts?ref=adr-admin-sidebar">
                <i className="ni ni-ui-04" />
                Components
              </NavLink>
            </NavItem> */}
          {/* </Nav> */}
          {/* <Nav className="mb-md-3" navbar>
            <NavItem className="active-pro active">
              <NavLink href="https://www.creative-tim.com/product/argon-dashboard-pro-react?ref=adr-admin-sidebar">
                <i className="ni ni-spaceship" />
                Upgrade to PRO
              </NavLink>
            </NavItem>
          </Nav> */}
        </Collapse>
      </Container>
    </Navbar>
  );
};

Sidebar.defaultProps = {
  routes: [{}],
};

Sidebar.propTypes = {
  // links that will be displayed inside the component
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the image src of the logo
    imgSrc: PropTypes.string.isRequired,
    // the alt for the img
    imgAlt: PropTypes.string.isRequired,
  }),
};

export default Sidebar;
