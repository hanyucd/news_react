import React from 'react';
import MobileHeader from './mobile_header';
import MobileFooter from './mobile_footer';
import MobileNewsBlock from './mobile_NewsBlock';
import { Tabs, Carousel } from 'antd';

const TabPane = Tabs.TabPane;

class MobileIndex extends React.Component {
  render() {
    const setting = {
      dots: true,
      easing: 'liner',
      autoplay: true,
    };

    return (
      <div>
        <MobileHeader />
        <Tabs>
          <TabPane tab="头条" key="1" style={{ background: '#f6f6f6' }}>
            <div className="mobile_carousel">
              <Carousel { ...setting }>
                <div><img src='./src/images/carousel_1.jpg' alt="轮播图" /></div>
                <div><img src='./src/images/carousel_2.jpg' alt="轮播图" /></div>
                <div><img src='./src/images/carousel_3.jpg' alt="轮播图" /></div>
                <div><img src='./src/images/carousel_4.jpg' alt="轮播图" /></div>
                <div><img src='./src/images/carousel_5.jpg' alt="轮播图" /></div>
                <div><img src='./src/images/carousel_6.jpg' alt="轮播图" /></div>
                <div><img src='./src/images/carousel_7.jpg' alt="轮播图" /></div>
              </Carousel>
            </div>
            <MobileNewsBlock type="top" count={ 20 }/>
          </TabPane>
          <TabPane tab="社会" key="2" style={{ background: '#f6f6f6' }}>
            <MobileNewsBlock type="shehui" count={ 20 }/>
          </TabPane>
          <TabPane tab="国内" key="3" style={{ background: '#f6f6f6' }}>
            <MobileNewsBlock type="guonei" count={ 20 }/>
          </TabPane>
          <TabPane tab="国际" key="4" style={{ background: '#f6f6f6' }}>
            <MobileNewsBlock type="guoji" count={ 20 }/>
          </TabPane>
          <TabPane tab="娱乐" key="5" style={{ background: '#f6f6f6' }}>
            <MobileNewsBlock type="yule" count={ 20 }/>
          </TabPane>
          <TabPane tab="科技" key="6" style={{ background: '#f6f6f6' }}>
            <MobileNewsBlock type="keji" count={ 20 }/>
          </TabPane>
        </Tabs>
        <MobileFooter />
      </div>
    );
  }
}

export default MobileIndex;
