import React from 'react';
import PropTypes from 'prop-types';
import { Card, Spin } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';

class PCNewsBlock extends React.Component {
  constructor() {
    super();
    this.state = {
      newsArray: []
    };
  }

  // 组件即将挂载时执行
  componentWillMount() {
    const { type, count } = this.props;
    const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${ type }&count=${ count }`;
    axios.get(url).then(response => {
      // 获取数据并封装成数组
      const newsArray = response.data.map(news => {
        return {
          title: news.title,
          newsId: news.uniquekey
        };
      });
      // 更新状态
      this.setState({ newsArray });
    });
  }
  render() {
    const newsArray = this.state.newsArray;
    const newsList = newsArray.length ?
          (
            newsArray.map((item, index) => {
              return (
                <li key={ index }>
                  <Link to={ `/news_detail/${item.newsId}` } target="_blank">
                    { item.title }
                  </Link>
                </li>
              );
            })
          ) :
          (
            <div style={{ textAlign: 'center' }}>
              <Spin tip="Loading..." size="large"/>
            </div>
          );
    return (
      <div className="topNewsList">
        <Card>
          <ul>
            { newsList }
          </ul>
        </Card>
      </div>
    );
  }
}

// 类型检查
PCNewsBlock.propTypes =  {
  count: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired
}

export default PCNewsBlock;
