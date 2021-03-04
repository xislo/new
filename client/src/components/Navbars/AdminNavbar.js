import { Logout } from "lib/helpers/localStorage";

import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";
import { getUser } from "lib/helpers/localStorage/";

// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Navbar,
  Nav,
  Container,
  Media,
  Button,
} from "reactstrap";
import { compose } from "redux";

class AdminNavbar extends React.Component {
  componentDidMount() {
    // setTimeout(() => {
    //  console.log(this.props.users.find(item=>item.id==this.props.uid))
    // }, 5000);
  }
  returnName() {
    const { fullname } = getUser();

    if (fullname) return fullname;
    else "NA";
  }
  render() {
    return (
      <>
        <Navbar
          className="d-md-block d-lg-block d-none navbar-top navbar-dark bg-white text-dark "
          expand="md"
          id="navbar-main"
        >
          <Container className="justify-content-center" fluid>
            <Link
              style={{ width: "80%" }}
              className="h4 mb-0 text-dark text-uppercase d-none d-lg-inline-block text-center"
              to="/"
            >
              {/* {this.props.brandText} */}
            </Link>
            <Nav
              style={{ width: "20%", textAlign: "right" }}
              className="align-items-center d-none d-md-flex"
              navbar
            >
              <Button
                size="md"
                onClick={(e) => {
                  e.preventDefault();
                  Logout();
                }}
              >
                {" "}
                <i className="fas fa-sign-out-alt" />
                &nbsp; Sign Out
              </Button>
              <UncontrolledDropdown nav>
                <DropdownToggle className="pr-0" nav>
                  <Media className="align-items-center">
                    <span className="avatar avatar-sm rounded-circle">
                      <img
                        alt="..."
                        src={require("assets/img/theme/dummy-avatar.jpg")}
                      />
                    </span>
                  </Media>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow" right>
                  <DropdownItem>{this.returnName()}</DropdownItem>{" "}
                  <DropdownItem divider />{" "}
                  <DropdownItem style={{ color: "#504de4" }}>
                    Profile
                  </DropdownItem>{" "}
                  <DropdownItem
                    onClick={(e) => {
                      e.preventDefault();
                      Logout();
                    }}
                    style={{ color: "#504de4" }}
                  >
                    Sign Out
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Container>
        </Navbar>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    uid: state.auth.uid,
    authError: state.auth.authError,
    users: state.firestore.ordered.users,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {};
};

export default compose(
  firestoreConnect([{ collection: "users" }]),
  connect(mapStateToProps, mapDispatchToProps)
)(AdminNavbar);
