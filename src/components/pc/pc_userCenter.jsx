import React from 'react';
import { Row, Col, Tabs, Card, Upload, Modal, Icon, notification } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';

const TabPane = Tabs.TabPane;

class PCUserCenter extends React.Component {
  constructor() {
    super();
    this.state = {
      previewImage: '',
      previewVisible: false,
      collections: [],
      comments: []
    };
    // 构造函数绑定
    this.handleCanel = this.handleCanel.bind(this);
    this.handlePreview = this.handlePreview.bind(this);
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
      const collections = response.data.map(item => {
        return {
          uniquekey: item.uniquekey,
          title: item.Title
        }
      })
      // 更新状态
      this.setState({ collections });
    });

    // 获取评论列表
    url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=${userId}`;
    axios.get(url).then(response => {
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

  // 关闭模态框处理
  handleCanel() {
    this.setState({
      previewVisible: false
    });
  }
  // 图片预览处理
  handlePreview(file) {
    this.setState({
      previewImage: file.url,
      previewVisible: true
    });
  }

  render() {
    // 图片上传参数
    let uploadArgument = {
      action: "http://newsapi.gugujiankong.com/handler.ashx",
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      listType: 'picture-card',
      defaultFileList: [{
        uid: -1,
        name: '示例图片',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      }]
    }

    const tabIcon = [
      <span><Icon type="apple" />收藏列表</span>,
      <span><Icon type="android" />评论列表</span>,
      <span><Icon type="windows" />上传图片</span>
    ];
    // 图片上传按钮
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text" >上传图片</div>
      </div>
    );

    let { previewImage, previewVisible, collections, comments } = this.state;
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
          <Card key={ index } title={`${item.dataTime} 评论了此文章 Id 为： ${item.uniquekey}`} extra={ <Link to={`/news_detail/${item.uniquekey}` }>查看</Link> }>
            <p>{ item.content }</p>
          </Card>
        );
      })
    ) :
    (
      <div>你还未评论任何新闻。。。</div>
    );

    return (
      <div>
        <Row>
          <Col span={ 2 }></Col>
          <Col span={ 20 }>
            <Tabs>
              {/* 收藏 */}
              <TabPane tab={ tabIcon[0] } key="1">
                <div className="comment">
                  <Row>
                    <Col span={ 1 }></Col>
                    <Col span={ 20 }>
                      { collectionList }
                    </Col>
                  </Row>
                </div>
              </TabPane>
              {/* 评论 */}
              <TabPane tab={ tabIcon[1] } key="2">
                <div className="comment">
                  <Row>
                    <Col span={ 1 }></Col>
                    <Col span={ 20 }>
                      { commentList }
                    </Col>
                  </Row>
                </div>
              </TabPane>
              {/* 图片上传 */}
              <TabPane tab={ tabIcon[2] } key="3">
                <div className="clearfix">
                  <Upload { ...uploadArgument }
                   onPreview={ this.handlePreview }>
                    { uploadButton }
                  </Upload>
                  <Modal title="图片预览：" visible={ previewVisible } footer={ null } onCancel={ this.handleCanel } >
                    <img src={ previewImage } alt="预览" style={{ width: '100%' }}/>
                  </Modal>
                </div>
              </TabPane>
            </Tabs>
          </Col>
          <Col span={ 2 }></Col>
        </Row>
      </div>
    );
  }
}

export default PCUserCenter;
