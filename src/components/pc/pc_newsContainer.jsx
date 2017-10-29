import React from 'react';
import { Row, Col, Tabs, Carousel, Icon } from 'antd';
import PCNewsBlock from './pc_newsBlock';
import PCNewsImageBlock from './pc_imageBlock';
import PCProducts from './pc_products';
// 导入图片
import carousel_1 from '../../images/carousel_1.jpg';
import carousel_2 from '../../images/carousel_2.jpg';
import carousel_3 from '../../images/carousel_3.jpg';
import carousel_4 from '../../images/carousel_4.jpg';
import carousel_5 from '../../images/carousel_5.jpg';
import carousel_6 from '../../images/carousel_6.jpg';
import carousel_7 from '../../images/carousel_7.jpg';

const TabPane = Tabs.TabPane;

class PCNewsContainer extends React.Component {
  render() {
    const setting = {
      dots: true,
      easing: 'liner',
      autoplay: true
    };

    const tabTitles = [
      <span><Icon type="apple-o"/>國內新聞</span>,
      <span><Icon type="android-o"/>科技新聞</span>,
      <span><Icon type="windows-o"/>娛樂新聞</span>,
      <span><Icon type="mobile"/>其他</span>
    ];

    return (
      <div>
        <Row>
          <Col span={ 1 }></Col>
          <Col span={ 22 } className="container">
            <div className="leftContainer">
              <Carousel { ...setting }>
                <div><img src={ carousel_1 } alt="轮播图" /></div>
                <div><img src={ carousel_2 } alt="轮播图" /></div>
                <div><img src={ carousel_3 } alt="轮播图" /></div>
                <div><img src={ carousel_4 } alt="轮播图" /></div>
                <div><img src={ carousel_5 } alt="轮播图" /></div>
                <div><img src={ carousel_6 } alt="轮播图" /></div>
                <div><img src={ carousel_7 } alt="轮播图" /></div>
              </Carousel>
              <PCNewsImageBlock title='社會'  type='shehui' count={ 6 } width="400px" imageWidth="110px"/>
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
