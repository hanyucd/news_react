import React from 'react';
import axios from 'axios';
import { Card, Form, Input, Button, message, notification, Row, Col } from 'antd';
const FormItem = Form.Item;

class NewsComments extends React.Component {
  constructor() {
    super();
    this.state = {
      comments: []
    };
    // 构造函数绑定函数
    this.addCollection = this.addCollection.bind(this);
  }

  componentWillMount() {
    const { newsId } = this.props;
    const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=${ newsId }`;
    axios.get(url).then(response => {
      let comments = response.data.map(item => {
        return {
          username: item.UserName,
          dateTime: item.datetime,
          content: item.Comments
        };
      });
      this.setState({ comments: comments.reverse() });
      console.log("获取评论成功...");
    })
  }

  // 提交评论
  handleSubmit(event) {
    event.preventDefault();
    const userId = localStorage.userId;
    if (!userId) {
      message.warn('请先登录！');
      // 重置输入控件
      this.props.form.resetFields();
      return ;
    }
    let { newsId } = this.props;
    // 获取一个输入控件的值
    let content = this.props.form.getFieldValue('content');
    let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=${userId}&uniquekey=${newsId}&commnet=${content}`;
    axios.get(url).then(response => {
      message.success('评论成功');
      // 调用生命周期函数 | （刷新评论区）
      this.componentWillMount();
      // 重置输入控件
      this.props.form.resetFields();
    })
  }

  // 添加收藏
  addCollection() {
    const userId = localStorage.userId;
    if (!userId) {
      notification.warn({
        message: '提醒：',
        description: "请先登录！",
        duration: 3
      });
      return ;
    }
    let { newsId } = this.props;
    let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid=${userId}&uniquekey=${newsId}`;
    axios.get(url).then(respone => {
      notification.success({
        message: 'React News收藏',
        description: '添加收藏成功！'
      });
    })
  }

  render() {
    let { getFieldDecorator } = this.props.form;
    let { comments } = this.state;
    const commentList = !comments ?
    <p>还没有评论，快来抢沙发！</p>
    : (
      comments.map((comment, index) => {
        return (
          <Card key={ index } title={ comment.username } extra={ `发布于${comment.dateTime}` }>
            <p>{ comment.content }</p>
          </Card>
        );
      })
    )

    return (
      <div>
        <Form onSubmit={ this.handleSubmit.bind(this) }>
          <FormItem>
          {
            getFieldDecorator('content') (
              <Input placeholder="请输入你的评论..." type="textarea" rows="5"/>
            )
          }
          </FormItem>
          <Button type="primary" htmlType="submit">提交评论</Button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Button type="primary" htmlType="button" onClick={ this.addCollection }>收藏文章</Button>
        </Form>
        <Row>
          <Col span="2"></Col>
          <Col span="20">
            { commentList }
          </Col>
          <Col span="2"></Col>
        </Row>
      </div>
    );
  }
}
// 经过 Form.create 包装的组件将会自带 this.props.form 属性
export default NewsComments = Form.create({})(NewsComments);
