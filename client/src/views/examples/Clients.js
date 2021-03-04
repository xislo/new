import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Card,
  CardHeader,
  Media,
  Table,
  Container,
  Row,
  Col,
  CardBody,
  Button,
} from "reactstrap";

import Header from "components/Headers/Header.js";

class Clients extends React.Component {
  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--9" fluid>
          {/* table */}
          <Row>
            <Col>
              <Card className=" shadow ">
                <CardHeader className=" border-0 ">
                  <h3 className=" mb-0">Clients</h3>
                </CardHeader>

                <CardBody>
                  <Row className="mb-2">
                    <Col className="text-right">
                      <Link to="/admin/clients/addClient">
                        <Button
                          color="white"
                          href="#pablo"
                          size="md"
                        >
                          Add Client
                        </Button>
                      </Link>
                  
                    </Col>
                  </Row>
                  <h3 className=" mb-2 ">Clients</h3>
                  <Table className="align-items-center  table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">Client Id</th>
                        <th scope="col">Client Name</th>
                        <th scope="col">Client Industry</th>
                        <th scope="col">Actions</th>
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
                        <td> First Client</td>
                        <td> Client Industry</td>
                        <td>
                          <Link
                            style={{ padding: "0.25rem 0.5rem" }}
                            to="/admin/clients/editClient"
                          >
                            <Button size="sm" color="white">
                              <i className="ni ni-settings  " />
                            </Button>
                          </Link>

                          <Button size="sm" color="white">
                            <i className="fas fa-trash  " />
                          </Button>
                          <Link
                            style={{ padding: "0.25rem 0.5rem" }}
                            to="/admin/clients/viewClient"
                          >
                            <Button size="sm" color="white">
                              <i className="fas fa-eye  " />
                            </Button>
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">
                          <Media className="align-items-center">
                            <Media>
                              <span className="mb-0 text-sm">2</span>
                            </Media>
                          </Media>
                        </th>
                        <td> Second Client</td>
                        <td> Client Industry</td>

                        <td>
                          <Link
                            style={{ padding: "0.25rem 0.5rem" }}
                            to="/admin/clients/editClient"
                          >
                            <Button size="sm" color="white">
                              <i className="ni ni-settings  " />
                            </Button>
                          </Link>
                          <Button size="sm" color="white">
                            <i className="fas fa-trash  " />
                          </Button>
                          <Link
                            style={{ padding: "0.25rem 0.5rem" }}
                            to="/admin/clients/viewClient"
                          >
                            <Button size="sm" color="white">
                              <i className="fas fa-eye  " />
                            </Button>
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">
                          <Media className="align-items-center">
                            <Media>
                              <span className="mb-0 text-sm">3</span>
                            </Media>
                          </Media>
                        </th>
                        <td> Third Client</td>
                        <td> Client Industry</td>

                        <td>
                          <Link
                            style={{ padding: "0.25rem 0.5rem" }}
                            to="/admin/clients/editClient"
                          >
                            <Button size="sm" color="white">
                              <i className="ni ni-settings  " />
                            </Button>
                          </Link>
                          <Button size="sm" color="white">
                            <i className="fas fa-trash  " />
                          </Button>
                          <Link
                            style={{ padding: "0.25rem 0.5rem" }}
                            to="/admin/clients/viewClient"
                          >
                            <Button size="sm" color="white">
                              <i className="fas fa-eye  " />
                            </Button>
                          </Link>
                        </td>
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

export default Clients;
