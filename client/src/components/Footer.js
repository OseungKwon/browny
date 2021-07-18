import React from 'react';
import { Col, Row } from 'reactstrap';

const Footer = () => {
  const thisYear = () => {
    const year = new Date().getFullYear();
    return year;
  };

  return (
    <div id="main-footer" className="text-center m-auto p-2">
      <Row>
        <Col>
          <p>
            Brownie Copyright &copy; <span>{thisYear()}</span>
          </p>
        </Col>
      </Row>
    </div>
  );
};

export default Footer;
