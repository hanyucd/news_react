import React from 'react';
import { Row, Col } from 'antd';

const currentYear = new Date().getFullYear();

class MobileFooter extends React.Component {
  render() {
    return (
      <footer>
        <Row>
          <Col span={ 2 }></Col>
          <Col span={ 20 } className="footer">
            &copy;&nbsp;{ currentYear } React Web. Developer by hanyu.
          </Col>
          <Col span={ 2 }></Col>
        </Row>
      </footer>
    );
  }
}

export default MobileFooter;
