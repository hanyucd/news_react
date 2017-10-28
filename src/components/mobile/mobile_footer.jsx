import React from 'react';
import { Row, Col } from 'antd';

// import '../../../less/common';
// import '../../../less/mobile/mobile_footer';

const currentYear = new Date().getFullYear();

class MobileFooter extends React.Component {
  render() {
    return (
      <footer>
        <Row>
          <Col span={ 2 }></Col>
          <Col span={ 20 } className="footer">
            &copy;&nbsp;{ currentYear } React News. Developer by hanyu.
          </Col>
          <Col span={ 2 }></Col>
        </Row>
      </footer>
    );
  }
}

export default MobileFooter;