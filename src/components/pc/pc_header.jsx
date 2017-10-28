import React from 'react';
import { Row, Col, Menu, Icon, Modal, Button, Tabs, Form, Input, message } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';

import logo from '../../images/logo.png';
// 表单项
const FormItem = Form.Item;
// Tab项
const TabPane = Tabs.TabPane;

class PCHeader extends React.Component {
  constructor() {
    super();
    this.state = {
      current: 'top',
      modalVisible: false,
      action: 'login',
      hasLogined: false,
      userNickName: '',
      userId: 0
    }
  }
  // 生命周期函数（组件即将挂载）
  componentWillMount() {
    // if (localStorage.userId != '') {
    //   this.setState({ hasLogined: true });
    //   this.setState({ userNickName: localStorage.userNickName, userId: localStorage.userId });
    // }
  }

  // 隐藏模态框
  setModalVisible(value) {
    this.setState({
      modalVisible: value
    })
  }

  // 点击菜单，选中点击的菜单项
  menuItemActive(event) {
    if (event.key === 'register') {
      // 调用函数
      this.setModalVisible(true);
    } else {
      this.setState({ current: event.key });
    }
  }

  // 切换 登陆/注册 面板 （清空表单） | Tabs onChange回调函数
  changeTab(key) {
    // 重置一组输入控件的值
    this.props.form.resetFields();
    if (key === 1) {
      this.setState({ action: 'login' });
    } else if (key === 2) {
      this.setState({ action: 'register' });
    }
  }

  handleSubmit(isRegist, event) {
    // 原生 js 事件（阻止事件冒泡）
    event.preventDefault();
    let action = isRegist ? 'register' : 'login';
    // 收集表单输入的数据
    let formDatas = this.props.form.getFieldsValue();
    // 对象解构赋值
    const { userName, password, r_userName, r_password, r_confirmPassword } = formDatas;
    const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=${action}&username=${userName}&password=${password}&r_userName=${r_userName}&r_password=${r_password}&r_confirmPassword=${r_confirmPassword}`;
    // 发送 axios 请求
    axios.get(url)
      .then(response => {
        const result = response.data;
        if(isRegist) {
          message.success('注册成功...');
        } else {
          // 登录失败
          if(!result) {
            this.setState({ hasLogined: false });
            message.error('登陆失败...');
          } else {
            message.success('登陆成功...');
            // 更新状态
            this.setState({
              userId: result.UserId,
              userNickName: result.NickUserName
            });
            // 缓存到 localStorage 中
            localStorage.setItem('userId', result.UserId);
            localStorage.setItem('userNickName', result.NickUserName);
          }
        }
      }).catch(error => {
        console.log("请求失败...");
      });
      if(this.state.action === "login") {
        this.setState({ hasLogined: true });
      }
      // 调方法
      this.setModalVisible(false);
  }
  logout() {
    // 删除单个存储的数据
    localStorage.removeItem('userId');
    localStorage.removeItem('userNickName');
    this.setState({ hasLogined: false });
  }

  render() {
    // 获取 Form.create 包装的组件中的 this.props.from 属性中的单个 API （对象解构赋值）
    let { getFieldDecorator } = this.props.form;
    const userShow = this.state.hasLogined ?
    (
      <Menu.Item key="logout" className="register">
        <Button type="primary" htmlType="button">{ this.state.userNickName }</Button>
        &nbsp;&nbsp;
        <Link target="_blank" to="/user_center">
          个人中心
        </Link>
        &nbsp;&nbsp;
        <Button type="primary" onClick={ this.logout.bind(this) }>退出</Button>
      </Menu.Item>
    ) :
    (
      <Menu.Item key="register" className="register">
        <Icon type="github" />注册 / 登录
      </Menu.Item>
    );

    return (
      <header>
        <Row>
          <Col span={ 2 }></Col>
          <Col span={ 4 }>
            <a href="/" className="logo">
              <img src={ logo } alt="React Logo" />
              <span>React Web</span>
            </a>
          </Col>
          <Col span = { 17 }>
            <Menu mode="horizontal" theme="dark" onClick={ this.menuItemActive.bind(this) } selectedKeys={ [this.state.current] }>
              <Menu.Item key="top">
                <Icon type="appstore-o"/>头条
              </Menu.Item>
              <Menu.Item key="news">
                <Icon type="code-o"/>新闻
              </Menu.Item>
              <Menu.Item key="caijing">
                <Icon type="red-envelope"/>财经
              </Menu.Item>
              <Menu.Item key="yule">
                <Icon type="coffee"/>娱乐
              </Menu.Item>
              <Menu.Item key="junshi">
                <Icon type="flag"/>军事
              </Menu.Item>
              <Menu.Item kye="education">
                <Icon type="team"/>教育
              </Menu.Item>
              <Menu.Item key="keji">
                <Icon type="rocket"/>科技
              </Menu.Item>
              <Menu.Item key="NBA">
                <Icon type="global"/>NBA
              </Menu.Item>
              { userShow }
            </Menu>

            <Modal title="用户中心"
                   wrapClassName="vertical-center-modal"
                   okText="关闭"
                   visible={ this.state.modalVisible }
                   onCancel={ () => this.setModalVisible(false) }
                   onOk={ () => this.setModalVisible(false) }>
              <Tabs onChange={ this.changeTab.bind(this) }>
                <TabPane tab="登陆" key="1">
                  <Form onSubmit={ this.handleSubmit.bind(this, false) }>
                    <FormItem label="账号">
                      {/* 用于和表单进行双向数据绑定 */}
                      { getFieldDecorator("userName") (
                          <Input prefix={ <Icon type="user" /> } placeholder="请输入你的账号..." />
                        )
                      }
                    </FormItem>
                    <FormItem label="密码">
                      { getFieldDecorator("password") (
                          <Input prefix={ <Icon type="lock" /> } placeholder="请输入你的密码..." />
                        )
                      }
                    </FormItem>
                    <Button type="primary" htmlType="submit">登录</Button>
                  </Form>
                </TabPane>

                <TabPane tab="注册" key="2">
                  <Form onSubmit={ this.handleSubmit.bind(this, true) }>
                    <FormItem label="账号">
                      {/* 用于 和 表单进行双向数据绑定 */}
                      { getFieldDecorator("r_userName", {
                          rules: [{ required: true, message: "账号不能为空！" }]
                        }) (
                          <Input prefix={ <Icon type="user" /> } placeholder="请输入你的账号..." />
                        )
                      }
                    </FormItem>
                    <FormItem label="密码">
                      { getFieldDecorator("r_password", {
                          rules: [{ required: true, message: "密码不能为空！" }]
                        }) (
                          <Input prefix={ <Icon type="lock" /> } placeholder="请输入你的密码..." />
                        )
                      }
                    </FormItem>
                    <FormItem label="确认密码">
                      { getFieldDecorator("r_confirmPassword", {
                          rules: [{ required: true, message: "确认密码不能为空！" }]
                        }) (
                          <Input prefix={ <Icon type="lock" /> } placeholder="请再次输入你的密码..." />
                        )
                      }
                    </FormItem>
                    <Button type="primary" htmlType="submit">注册</Button>
                  </Form>
                </TabPane>
              </Tabs>
            </Modal>
          </Col>
          <Col span={ 1 }></Col>
        </Row>
       </header>
    );
  }
}
// 经过 Form.create 包装的组件将会自带 this.props.form 属性
export default PCHeader = Form.create({})(PCHeader);
