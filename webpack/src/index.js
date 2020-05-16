// import './style/index.less';
import moment from 'moment';
import cookie from 'js-cookie';
import sayHello from './utils/hello';
import { util, format } from './utils/util';

console.log('hello word:', sayHello());
console.log('hello util:', util);
console.log('time', moment().format('YYYY-MM-DD'));
console.log('time from util', format());
cookie.set('page', 'index');

let count = 0;

const clickButton = document.createElement('button');

const name = document.createTextNode("CLICK ME");

clickButton.appendChild(name);

document.body.appendChild(clickButton);

clickButton.addEventListener('click', () => {
  console.log('start');
  count++;
  import('./utils/math').then(modules => {
    console.log('modules', modules);
  });

  if (count > 2) {
    import('./utils/fire').then(({ default: fire }) => {
      fire();
    });
  }
  console.log('done');
})

