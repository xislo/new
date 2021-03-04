import Header from "components/Headers/Header";
import React, { Component } from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  Col,
  Button,
  CardBody,
  Media,
} from "reactstrap";

class BuyAssessments extends Component {
  state = { Question: false };
  toggle = (e) => {
    e.preventDefault();
    this.setState({ Question: !this.state.Question });
  };
  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--9" fluid>
          {/* forms */}
          <Row>
            <Col>
              <Card className=" shadow ">
                <CardHeader className=" border-0 ">
                  <h3 className=" mb-0 ">Buy Assessments</h3>
                </CardHeader>
                <CardBody>
                  <Row className="mb-2">
                    <Col className="text-right">
                      <Link to="/admin/buyassessments/assessmentCheckout">
                        <Button color="default" size="md">
                          Buy Assessments
                        </Button>
                      </Link>
                    </Col>
                  </Row>
                  <h3 className=" mb-2 ">Owned Assessments</h3>
                  <Table className="align-items-center  table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">Assessment Id</th>
                        <th scope="col"> Tile</th>
                        <th scope="col"> Description</th>
                        <th scope="col"> Type</th>
                        <th scope="col"> Version</th>
                        <th scope="col"> Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">
                          <Media className="align-items-center">
                            <Media>
                              <span className="mb-0 text-sm">1</span>
                            </Media>
                          </Media>
                        </th>
                        <td> First Assessment</td>
                        <td> Assessment Description</td>
                        <td> Assessment Type</td>
                        <td> Assessment Version</td>
                        <td> 5$</td>
                      </tr>
                      <tr>
                        <th scope="row">
                          <Media className="align-items-center">
                            <Media>
                              <span className="mb-0 text-sm">2</span>
                            </Media>
                          </Media>
                        </th>
                        <td> Second Assessment</td>
                        <td> Assessment Description</td>
                        <td> Assessment Type</td>
                        <td> Assessment Version</td>
                        <td> 5$</td>
                      </tr>
                      <tr>
                        <th scope="row">
                          <Media className="align-items-center">
                            <Media>
                              <span className="mb-0 text-sm">3</span>
                            </Media>
                          </Media>
                        </th>
                        <td> Third Assessment</td>
                        <td> Assessment Description</td>
                        <td> Assessment Type</td>
                        <td> Assessment Version</td>
                        <td> 5$</td>
                      </tr>
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default BuyAssessments;
