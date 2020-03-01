import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom'; // HashRouter as Router
import { Layout, Menu, Icon } from 'antd';
import List from '../components/MilitaryList';
import Detail from '../components/MilitaryList/Detail';
import Todo from '../components/TodoList';
import BookList from '../components/BookListManage';

const { Header, Sider, Content } = Layout;
export default class Layer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(({ collapsed }) => ({
      collapsed: !collapsed,
    }));
  }

  render() {
    const { collapsed } = this.state;
    const hashArr = window.location.hash.split('/');
    const selectedHash = hashArr.length > 1 ? hashArr[1] : 'militaryList';
    console.log('app update');
    return (
      <Layout className="layout">
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
        >
          <div className="logo">GraphQL Actual Combat</div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={[selectedHash]}>
            <Menu.Item key="militaryList">
              <Link to="/militaryList">
                <Icon type="user" />
                <span>MilitaryList</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="todo">
              <Link to="/todo">
                <Icon type="video-camera" />
                <span>TodoList</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="bookList">
              <Link to="/bookList">
                <Icon type="upload" />
                <span>状态管理</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff' }}>
            <Switch>
              <Route exact path="/bookList" component={BookList} />
              <Route exact path="/militaryList" component={List} />
              <Route exact path="/militaryList/:id/detail" component={Detail} />
              <Route exact path="/todo" component={Todo} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    );
  }
}
