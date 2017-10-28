import React from 'react';
import axios from 'axios';

import MobileFooter from './mobile_footer';
import NewsComments from '../common/comment';

class MobileNewsDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      news: ''
    }
  }

  // 组件已挂载时执行 （生命周期函数）
  componentDidMount() {
    const news_id = this.props.match.params.news_id;
    let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=${ news_id }`;
    axios.get(url).then(response => {
      const news = response.data;
      this.setState({ news });
    })
  }

  // 返回原生 HTML 结构
  createMarkup() {
    return { __html: this.state.news.pagecontent };
  }

  render() {
    return (
      <div>
        <div className="mobileDetailsContainer" dangerouslySetInnerHTML={ this.createMarkup() }></div>
        <hr />
        <NewsComments newsId={ this.props.match.params.news_id } />
        <MobileFooter />
      </div>
    );
  }
}

export default MobileNewsDetails;
