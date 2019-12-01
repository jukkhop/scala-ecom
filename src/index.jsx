import { createElement } from 'react';
import { render } from 'react-dom';

import './index.css';
import withStore from './store';

render(createElement(withStore), document.getElementById('root'));
