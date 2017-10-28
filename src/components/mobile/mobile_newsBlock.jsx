import React from 'react';
import axios from 'axios';
import { Card, Spin } from 'antd';
import { Link } from 'react-router-dom';

class MobileNewsBlock extends React.Component {
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
      let newsArray = response.data;
      this.setState({ newsArray });
    });
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

    return (
      <div>
        { newsList }
      </div>
    );
  }
}

export default MobileNewsBlock;
