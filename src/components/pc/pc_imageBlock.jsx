import React from 'react';
import axios from 'axios';
import { Card, Spin } from 'antd';
import { Link } from 'react-router-dom';

class PCNewsImageBlock extends React.Component {
  constructor() {
    super();
    this.state = {
      newsArray: []
    }
  }

  componentWillMount() {
    const { type, count } = this.props;
    const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${ type }&count=${ count }`;
    axios.get(url).then(response => {
      const newsArray = response.data.map(news => {
        return {
          title: news.title,
          author_name: news.author_name,
          image_url: news.thumbnail_pic_s,
          newsId: news.uniquekey
        }
      });
      // 更新状态
      this.setState({ newsArray });
    });
  }

  render() {
    const { title, imageWidth, width } = this.props;
    const  newsArray  = this.state.newsArray;
    // Jsx 样式语法
    const imageStyle = {
      width: imageWidth,
      height: '90px'
    };
    const titleStyle = {
      width: imageWidth,
      whiteSpace: 'nowrap',   // 定义文本不换行
      overflow: 'hidden',   // 内容溢出容器时，隐藏
      textOverflow: 'ellipsis'   // 内容溢出容器时，显示省略号
    };

    const newsList = newsArray.length ?
          (
            newsArray.map((item, index) => {
              return (
                <div key={ index } className="imageblock">
                  <Link to={`/news_detail/${item.newsId}`} target="_black">
                    <div className="custom-image">
                      <img src={ item.image_url } alt="" style={ imageStyle } />
                    </div>
                    <div className="custom-card">
                      <h3 style={ titleStyle }>{ item.title }</h3>
                      <p>{ item.author_name }</p>
                    </div>
                  </Link>
                </div>
              );
            })
          ) :
          (
            <div style={{ textAlign: 'center' }}>
              <Spin tip="Loading..." size="large"/>
            </div>
          );

    return (
      <Card title={ title } style={{ width }} className="topNewsList">
        { newsList }
      </Card>
    );
  }
}

export default PCNewsImageBlock;
