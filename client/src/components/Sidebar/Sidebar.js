/*eslint-disable*/
import React from "react";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
// nodejs library to set properties for components
import { PropTypes } from "prop-types";
import { logout } from "actions/authActions";

import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

import "./rating.css";
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
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
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

var ps;

class Sidebar extends React.Component {
  state = {
    collapseOpen: true,
    scrolls:0
  };
  constructor(props) {
    super(props);
    this.activeRoute.bind(this);
  }
  componentDidMount(){
    window.addEventListener('scroll', this.handleScroll);

  }
  componentWillUnmount(){
    window.removeEventListener('scroll', this.handleScroll);

  }
  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  // toggles collapse between opened and closed (true/false)
  toggleCollapse = () => {
    this.setState({
      collapseOpen: !this.state.collapseOpen,
    });
  };
  returnName(){
    try {
    
      return this.props.users.find(item=>item.id==this.props.uid).name
      
    } catch (error) {
      return 'NA'   
    }
  }
  checkTrues=()=>{
    if(this.state.scrolls>0){
      console.log("true")
      return true
    }
    else{
      console.log("false")

      return false
    }
  }
  handleScroll=(event)=>{
    console.log("coming boiiii")
    console.log(window.scrollY)
    this.setState({scrolls:window.scrollY})
    // this.scrolls=window.scrollY
  }
  // closes the collapse
  closeCollapse = () => {
    this.setState({
      collapseOpen: false,
    });
  };
  // creates the links that appear in the left menu / Sidebar
  createLinks = (routes) => {
    return routes.map((prop, key) => {
      return (
        <NavItem key={key}>
          <NavLink
            to={prop.layout + prop.path}
            tag={NavLinkRRD}
            onClick={this.closeCollapse}
            activeClassName="active"
          >
            <i className={prop.icon} />
            {prop.name}
          </NavLink>
        </NavItem>
      );
    });
  };
  render() {
    const { bgColor, routes, logo } = this.props;
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
        className={this.state.scrolls>0 ? 'rops navbar-vertical fixed-left navbar-light bg-white bg-lg-light overflow-hidden-lg stickymod':'navbar-vertical fixed-left navbar-light bg-white bg-lg-light overflow-hidden-lg'}
        expand="md"
         onScroll={this.handleScroll}
        id="sidenav-main"
      >
        <Container fluid>
          {/* Toggler */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={this.toggleCollapse}
          >
            <i className="fas fa-bars text-primary" />
          </button>
          {/* Brand */}

          <NavbarBrand className=" d-lg-none" {...navbarBrandProps}>
         
            <h1 className="mb-0" style={{color: '#504de4',fontSize: '35px',fontWeight:'700'}}> 
            xislo
            {/* <img src="/xislo.jpg" style={{width:'70px '}}/> */}

            </h1>
          </NavbarBrand>
          <NavbarBrand
            className="pt-1  d-none d-lg-block"
            {...navbarBrandProps}
          >
            <h1 className="mb-0 text-primary" style={{color: '#504de4',fontSize: '40px',fontWeight:'700'}}> 
            xislo
            {/* <img src="/xislo.jpg" style={{width:'80px '}}/> */}

            </h1>
          </NavbarBrand>
          {/* User */}
          <Nav className="align-items-center d-md-none">
            <Link to="/login">
              <Button size="sm"
              onClick={(e) => {
                e.preventDefault();
                this.props.logout();
              }}>
                {" "}
                <i className="fas fa-sign-out-alt" />
                &nbsp; Sign Out
              </Button>
            </Link>
            <UncontrolledDropdown nav>
              <DropdownToggle nav>
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    <img
                      alt="..."
                      src={require("assets/img/theme/dummy-avatar.jpg")}
                    />
                  </span>
                </Media>
              </DropdownToggle>

              <DropdownMenu right>
                <DropdownItem>{this.returnName()}</DropdownItem>{" "}
                <DropdownItem divider />{" "}
                <DropdownItem style={{ color: "#504de4" }}>
                  Profile
                </DropdownItem>{" "}
                {/* <Link to="/login"> */}
                  <DropdownItem 
                  onClick={(e) => {
                    e.preventDefault();
                    this.props.logout();
                  }}
                  style={{ color: "#504de4" }}>
                    Sign Out
                  </DropdownItem>
                {/* </Link> */}
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          {/* Collapse */}
          <Collapse
           className={this.state.collapseOpen==true ? 'showss':'hidess'}
            style={{
              
              marginLeft: "0px",
              marginTop: "0px",
              minHeight: "100vh",
              width: "66%",
              backgroundColor: "#f8f8f8 !important",
            }}
            navbar
            isOpen={true}
          >
            {/* Collapse header */}
            <div className="navbar-collapse-header d-md-none">
              <Row style={{position:'relative'}}>
                {logo ? (
                  <Col className="collapse-brand text-center" xs="12">
                     <button
                     style={{position: 'absolute',left: '0px', top: '9px'}}
            className="navbar-toggler"
            type="button"
            onClick={this.toggleCollapse}
          >
            <span />
            <span />
          </button>
                    <Link to={'/'}>
                      <h1 className="mb-0 text-primary" style={{fontWeight:'700',fontSize: '35px'}}>
                         xislo
                         {/* <img src="/xislo.jpg" style={{width:'80px '}}/> */}

                         </h1>
                    </Link>
                  </Col>
                ) : null}
              </Row>
            </div>
            {/* Navigation */}
            <Nav navbar>{this.createLinks(routes)}</Nav>
            {/* <Row>
              <Col className="collapse-close" xs="6">
                <button
                  className="navbar-toggler"
                  type="button"
                  onClick={this.toggleCollapse}
                >
                  <span />
                  <span />
                </button>
              </Col>
            </Row> */}
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

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
const mapStateToProps = (state) => {
  return {
    uid: state.auth.uid,
    authError: state.auth.authError,
    users: state.firestore.ordered.users,

  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),

  };
};


// export default Sidebar;
export default compose(
  firestoreConnect([{ collection: "users" }]),
  connect(mapStateToProps, mapDispatchToProps)
)(Sidebar);
