import React from 'react';
import { useApolloClient } from '@apollo/react-hooks';
import { Tabs } from 'antd';

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

export default function TabBar(props) {
  const { top } = props;
  const client = useApolloClient();
  return (
    <Tabs defaultActiveKey={`${top}`} onChange={(top) => { client.writeData({ data: { top } }); }}>
      {ReadStatus.map(({ label, value }) => <TabPane tab={label} key={value} />)}
    </Tabs>
  );
}
