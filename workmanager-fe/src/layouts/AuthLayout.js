import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';

import '../../src/styles/Layout.css';

const AuthLayout = () => {
  return (
    <div className="auth-layout">
      <Container fluid>
        <Row className="vh-100 d-flex align-items-center justify-content-center">
          <Col  xs={12} md={8} lg={6}>
            <Outlet /> {/* Hiển thị nội dung của Route con */}
          </Col>
        </Row>
      </Container>
    </div> 
  );
};

export default AuthLayout;