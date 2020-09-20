import React, {useState} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import Header from "./components/Header";
import Runners from "./components/Runners";
import Balaton from "./components/Balaton";


const App = () => {

  return (
    <Container fluid>
      {/*<Header/>*/}
      <Row>
        <Col md={12}>
          <Balaton />
        </Col>
        {/*<Col md={5}>*/}
        {/*  <Runners/>*/}
        {/*</Col>*/}
      </Row>
    </Container>
  );
};

export default App;
