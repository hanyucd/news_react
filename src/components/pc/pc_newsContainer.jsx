import React from 'react';
import { Row, Col, Tabs, Carousel, Icon } from 'antd';
import PCNewsBlock from './pc_newsBlock';
import PCNewsImageBlock from './pc_imageBlock';
import PCProducts from './pc_products';

const TabPane = Tabs.TabPane;

class PCNewsContainer extends React.Component {
  render() {
    const setting = {
      dots: true,
      easing: 'liner',
      autoplay: true
    };

    const tabTitles = [
      <span><Icon type="tag-o"/>國內新聞</span>,
      <span><Icon type="tag-o"/>科技新聞</span>,
      <span><Icon type="tag-o"/>娛樂新聞</span>,
      <span><Icon type="windows"/>其他</span>
    ];

    return (
      <div>
        <Row>
          <Col span={ 1 }></Col>
          <Col span={ 22 } className="container">
            <div className="leftContainer">
              <Carousel { ...setting }>
                <div><img src='./src/images/carousel_1.jpg' alt="轮播图" /></div>
                <div><img src='./src/images/carousel_2.jpg' alt="轮播图" /></div>
                <div><img src='./src/images/carousel_3.jpg' alt="轮播图" /></div>
                <div><img src='./src/images/carousel_4.jpg' alt="轮播图" /></div>
                <div><img src='./src/images/carousel_5.jpg' alt="轮播图" /></div>
                <div><img src='./src/images/carousel_6.jpg' alt="轮播图" /></div>
                <div><img src='./src/images/carousel_7.jpg' alt="轮播图" /></div>
              </Carousel>
              <PCNewsImageBlock title='社會'  type='shehui' count={ 6 } width="400px" imageWidth="112px"/>
            </div>
            <Tabs className="tabs_news">
              <TabPane tab={ tabTitles[0] } key="1">
                <PCNewsBlock count={ 20 } type='guonei' bordered="false" />
              </TabPane>
              <TabPane tab={ tabTitles[1] } key="2">
                <PCNewsBlock count={ 20 } type='keji' bordered="false" />
              </TabPane>
              <TabPane tab={ tabTitles[2] } key="3">
                <PCNewsBlock count={ 10 } type="yule" />
              </TabPane>
            </Tabs>

            <Tabs className="tabs_products">
              <TabPane tab={ tabTitles[3] } key="1">
                <PCProducts />
              </TabPane>
            </Tabs>

            <div>
              <PCNewsImageBlock title='體育新聞'  type='top' count={ 8 } width="100%" imageWidth="120px"/>
              <PCNewsImageBlock title='時尚新聞'  type='keji' count={ 16 } width="100%" imageWidth="120px"/>
            </div>
          </Col>
          <Col span={ 1 }></Col>
        </Row>
      </div>
    );
  }
}

export default PCNewsContainer;
