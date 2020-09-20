import React from 'react';
import {Col, Row} from "react-bootstrap";

const Header = () => {
  return (
    <Row>
      <Col md={{span: 4, offset: 4}}>
        <h1 className="header">
          Anteus Ultrabalaton 2020
        </h1>
      </Col>
    </Row>
  );
};

export default Header;
