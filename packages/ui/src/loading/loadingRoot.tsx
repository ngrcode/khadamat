"use client"
import React from 'react';
import { Spin, Layout } from 'antd';

const { Content } = Layout;

const LoadingRoot: React.FC = () => {
  return (
    <Layout style={{ height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
      <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Spin size="large" tip="Loading..." />
      </Content>
    </Layout>
  );
};

export default LoadingRoot;
