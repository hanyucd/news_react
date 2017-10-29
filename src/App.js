import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// 导入 PC 端组件
import PCIndex from './components/pc/pc_index';
import PCNewsDetails from './components/pc/pc_newsDetails';
import PCUserCenter from './components/pc/pc_userCenter';
// 导入 Mobile 端组件
import MobileIndex from './components/mobile/mobile_index';
import MobileNewsDetails from './components/mobile/mobile_newsDetails';
import MobileUserCenter from './components/mobile/mobile_userCenter';

// 移动端适配 （第三方库）
import MediaQuery from 'react-responsive';
import 'antd/dist/antd.less';

import './style/pc.css';
import './style/mobile.css';

class App extends React.Component {
  render() {
    return (
      <div>
        {/* PC端 */}
        <MediaQuery query="(min-device-width: 1224px)">
          <Router>
            <Switch>
              <Route exact path="/" component={ PCIndex }></Route>
              <Route path="/news_detail/:news_id" component={ PCNewsDetails }></Route>
              <Route path="/user_center" component={ PCUserCenter }></Route>
            </Switch>
          </Router>
        </MediaQuery>

        {/* 移动端 */}
        <MediaQuery query="(max-device-width: 1224px)">
          <Router>
            <Switch>
              <Route exact path="/" component={ MobileIndex }></Route>
              <Route exact path="/news_detail/:news_id" component={ MobileNewsDetails }></Route>
              <Route path="/user_center" component={ MobileUserCenter }></Route>
            </Switch>
          </Router>
        </MediaQuery>
      </div>
    );
  }
}

export default App;
