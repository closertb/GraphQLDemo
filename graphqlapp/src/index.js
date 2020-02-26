/**
 * Title:
 * @author Mr Denzel
 * @create Date 2018-02-03 21:47
 * @version 1.0
 * Description:
 */
import React from 'react';
import { render } from 'react-dom';
import App from './pages/App';
import 'antd/dist/antd.css';
import './style/index.less';

render((
  <App />
), document.getElementById('app'));
