import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { Tabs } from 'antd';
import gql from 'graphql-tag';

const TabPane = Tabs.TabPane;
const ReadStatus = [{
  label: '总书单',
  value: '',
}, {
  label: '已读',
  value: 'read',
}, {
  label: '期望读',
  value: 'wish',
}, {
  label: '正在读',
  value: 'reading',
}];
const ChangeStatus = gql`
  mutation ChangeStatus($status: String){
    changeStatus(status: $status) @client
  }
`;
export default class TabBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { status } = this.props;
    return (
      <Mutation mutation={ChangeStatus} >
        {changeStatus => (
          <Tabs defaultActiveKey={status} onChange={(value) => { changeStatus({ variables: { status: value } }); }}>
            {ReadStatus.map(({ label, value }) =>
              <TabPane tab={label} key={value} />)}
          </Tabs>
        )}
      </Mutation>
    );
  }
}

