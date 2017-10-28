import React from 'react';
import { Tabs, Card, Icon, notification } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';

const TabPane = Tabs.TabPane;

class MobileUserCenter extends React.Component {
  constructor() {
    super();
    this.state = {
      collections: [],
      comments: []
    };
  }

  componentWillMount() {
    let userId = localStorage.userId;
    if (!userId) {
      notification.warn({
        message: '你还未登录',
        description: '请先登录'
      });
      return ;
    }
    // 获取收藏列表
    let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=${userId}`;
    axios.get(url).then(response => {
      console.log("获取收藏列表成功...");
      const collections = response.data.map(item => {
        return {
          uniquekey: item.uniquekey,
          title: item.Title
        };
      })
      // 更新状态
      this.setState({ collections });
    });

    // 获取评论列表
    url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=${userId}`;
    axios.get(url).then(response => {
      console.log("获取评论列表成功...");
      const comments = response.data.map(item => {
        return {
          uniquekey: item.uniquekey,
          dataTime: item.datetime,
          content: item.Comments
        }
      })
      this.setState({ comments });
    });
  }

  render() {
    let { collections, comments } = this.state;
    // 收藏 | react 元素
    const collectionList = collections.length ?
    (
      collections.map((item, index) => {
        return (
          <Card key={ index } title={ `收藏的新闻 Id 为：${item.uniquekey}` } extra={ <Link to={`/news_detail/${item.uniquekey}` }>查看</Link> }>
            <p>{ item.title }</p>
          </Card>
        );
      })
    ) :
    (
      <div>你还未收藏任何新闻。。。</div>
    );

    // 评论 | react 元素
    const commentList = comments.length ?
    (
      comments.map((item, index) => {
        return (
          <Card key={ index } title={`${item.dataTime} 评论了此文章`} extra={ <Link to={`/news_detail/${item.uniquekey}` }>查看</Link> }>
            <p>{ item.content }</p>
          </Card>
        );
      })
    ) :
    (
      <div>你还未评论任何新闻。。。</div>
    );

    const tabIcon = [
      <span><Icon type="apple-o" />收藏列表</span>,
      <span><Icon type="android-o" />评论列表</span>,
      <span><Icon type="windows-o" />上传图片</span>
    ];

    return (
      <div>
        <Tabs>
          <TabPane tab={ tabIcon[0] } key="1">
            { collectionList }
          </TabPane>
          <TabPane tab={ tabIcon[1] } key="2">
            { commentList }
          </TabPane>
          <TabPane tab={ tabIcon[2] } key="3">
            <div>暂未开发。。。</div>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default MobileUserCenter;
