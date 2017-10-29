import React from 'react';
import MobileHeader from './mobile_header';
import MobileFooter from './mobile_footer';
import MobileNewsBlock from './mobile_newsBlock';
import { Tabs, Carousel } from 'antd';
// 导入图片
import carousel_1 from '../../images/carousel_1.jpg';
import carousel_2 from '../../images/carousel_2.jpg';
import carousel_3 from '../../images/carousel_3.jpg';
import carousel_4 from '../../images/carousel_4.jpg';
import carousel_5 from '../../images/carousel_5.jpg';
import carousel_6 from '../../images/carousel_6.jpg';
import carousel_7 from '../../images/carousel_7.jpg';
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
                <div><img src={ carousel_1 } alt="轮播图" /></div>
                <div><img src={ carousel_2 } alt="轮播图" /></div>
                <div><img src={ carousel_3 } alt="轮播图" /></div>
                <div><img src={ carousel_4 } alt="轮播图" /></div>
                <div><img src={ carousel_5 } alt="轮播图" /></div>
                <div><img src={ carousel_6 } alt="轮播图" /></div>
                <div><img src={ carousel_7 } alt="轮播图" /></div>
              </Carousel>
            </div>
            <MobileNewsBlock type="top" count={ 5 }/>
          </TabPane>
          <TabPane tab="社会" key="2" style={{ background: '#f6f6f6' }}>
            <MobileNewsBlock type="shehui" count={ 5 }/>
          </TabPane>
          <TabPane tab="国内" key="3" style={{ background: '#f6f6f6' }}>
            <MobileNewsBlock type="guonei" count={ 5 }/>
          </TabPane>
          <TabPane tab="国际" key="4" style={{ background: '#f6f6f6' }}>
            <MobileNewsBlock type="guoji" count={ 5 }/>
          </TabPane>
          <TabPane tab="娱乐" key="5" style={{ background: '#f6f6f6' }}>
            <MobileNewsBlock type="yule" count={ 5 }/>
          </TabPane>
          <TabPane tab="科技" key="6" style={{ background: '#f6f6f6' }}>
            <MobileNewsBlock type="keji" count={ 5 }/>
          </TabPane>
        </Tabs>
        <MobileFooter />
      </div>
    );
  }
}

export default MobileIndex;
