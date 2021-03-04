import React from "react";

// reactstrap components
import { Container, Row, Col } from "reactstrap";

class UserHeader extends React.Component {
  render() {
    return (
      <>
        <div
          className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
          style={{
            minHeight: "600px",
            backgroundImage:
              "url(" +
              require("assets/img/brand/5131_Integral_Agile_Institute_R_S_logo_01.png") +
              ")",

            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
          }}
        >
          {/* Mask */}
          <span className="mask bg-gradient-default opacity-8" />
          {/* Header container */}
          <Container className="d-flex align-items-center" fluid>
            <Row>
              <Col lg="7" md="10">
                <h1 className="display-2 text-white">Hello John</h1>
                <p className="text-white mt-0 mb-5">
                  This is your profile page. You can manage your profile here.
                </p>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}

export default UserHeader;
