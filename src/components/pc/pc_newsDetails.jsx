import React from 'react';
import { Row, Col, BackTop } from 'antd';
import axios from 'axios';

import PCHeader from './pc_header';
import PCFooter from './pc_footer';
import PCNewsImageBlock from './pc_imageBlock';
import NewsComments from '../common/comment';

class PCNewsDetails extends React.Component {
  constructor(){
    super();
    this.state = {
      news: ''
    }
  }
  // 组件即将挂载时 调用 （生命周期函数）
  componentWillMount() {
    this._showDetails(this.props);
  }
  // 组件即将接受 props 时调用 （生命周期函数）
  componentWillReceiveProps(nextProps) {
    this._showDetails(nextProps)
  }
  // 私有函数
  _showDetails(props) {
    const uniquekey = props.match.params.news_id;
    let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=${ uniquekey }`;
    axios.get(url).then(response => {
      const news = response.data;
      this.setState({ news });
      // 更改网页标题
      document.title = news.title;
    })
  }

  // 返回原生 HTML 结构
  createMarkup() {
    return { __html: this.state.news.pagecontent };
  }

  render() {
    return (
      <div>
        <PCHeader />
        <Row>
          <Col span={ 1 }></Col>
          <Col span={ 16 } className="container">
            <div className="articleContainer" dangerouslySetInnerHTML={ this.createMarkup() }></div>
            <hr />
            <NewsComments newsId={ this.props.match.params.news_id }/>
          </Col>
          <Col span={ 6 }>
            <PCNewsImageBlock type="top" count={ 20 } title="相关新闻" imageWidth="120px" width="100%" />
          </Col>
          <Col span={ 1 }></Col>
        </Row>
        <PCFooter />
        <BackTop />
      </div>
    );
  }
}

export default PCNewsDetails;
