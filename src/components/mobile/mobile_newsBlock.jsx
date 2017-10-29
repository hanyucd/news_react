import React from 'react';
import axios from 'axios';
import { Card, Spin } from 'antd';
import { Link } from 'react-router-dom';
// 导入下拉加载模块
import Tloader from 'react-touch-loader';

class MobileNewsBlock extends React.Component {
  constructor() {
    super();
    this.state = {
      newsArray: [],
      count: 5,
      hasMore: false,
      initializing: 1,
      autoLoadMore: true
    }
  }

  componentWillMount() {
    const { type, count } = this.props;
    const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${ type }&count=${ count }`;
    axios.get(url).then(response => {
      let newsArray = response.data;
      this.setState({ newsArray });
    });
  }

  // 加载更多
  loadMore(resolve) {
    let { type } = this.props;
    let { count } = this.state;
    let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${ type }&count=${ count }`;
    setTimeout(() => {
      let count = this.state.count;
      this.setState({
        count: count + 5
      });
      axios.get(url).then(response => {
        let newsArray = response.data;
        this.setState({ newsArray });
      });
      this.setState({
        hasMore: count > 0 && count < 50
      });
      resolve();
    }, 3000);
  }

  // 组件挂载完成执行 （生命周期函数）
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        hasMore: true,  // show the load more footer
        initializing: 2 // progress to end
      });
    }, 3000);
  }

  render() {
    const newsArray = this.state.newsArray;
    const newsList = newsArray.length ?
          (
            newsArray.map((item, index) => {
              return (
                <Card key={ index } className="m_article list-item special_section clearfix">
                  <Link to={ `/news_detail/${item.uniquekey}` }>
                    <div className="m_article_img">
                      <img src={ item.thumbnail_pic_s } alt={ item.title } />
                    </div>
                    <div className="m_article_info">
                      <div className="m_article_title">
                        <span>{ item.title }</span>
                      </div>
                      <div className="m_article_desc clearfix">
                        <div className="m_article_desc_l">
                          <span className="m_article_channel">{ item.realtype }</span>
                          <span className="m_article_time">{ item.date }</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </Card>
              );
            })
          ) :
          (
            <div style={{ textAlign: 'center' }}>
              <Spin tip="Loading..." size="large"/>
            </div>
          );

    let { hasMore, initializing, autoLoadMore } = this.state;
    return (
      <div>
        <Tloader onLoadMore={ this.loadMore.bind(this) } autoLoadMore={ autoLoadMore } hasMore={ hasMore } initializing={ initializing }>
          { newsList }
        </Tloader>
      </div>
    );
  }
}

export default MobileNewsBlock;
