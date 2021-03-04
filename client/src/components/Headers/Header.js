import React from "react";

// reactstrap components
import { Container } from "reactstrap";

class Header extends React.Component {
  render() {
    return (
      <>
        <div
          style={{ backgroundColor: "#f8f8f8 !important" }}
          className="header pt-3 pt-md-6"
        >
          <Container fluid>
            <div className="header-body"></div>
          </Container>
        </div>
      </>
    );
  }
}

export default Header;
