import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { Tabs } from 'antd';
import gql from 'graphql-tag';

const { TabPane } = Tabs;
const ReadStatus = [{
  label: 'top20',
  value: 20,
}, {
  label: 'top10',
  value: 10,
}, {
  label: 'top5',
  value: 5,
}];
const ChangeStatus = gql`
  mutation ChangeStatus($top: Int){
    changeStatus(top: $top) @client
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
      <Mutation mutation={ChangeStatus}>
        {changeStatus => (
          <Tabs defaultActiveKey={status} onChange={(value) => { changeStatus({ variables: { top: value } }); }}>
            {ReadStatus.map(({ label, value }) => <TabPane tab={label} key={value} />)}
          </Tabs>
        )}
      </Mutation>
    );
  }
}
