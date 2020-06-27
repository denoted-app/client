import React from 'react';
import { render } from 'react-dom';

import Container from './components/Container';
import './assets/stylesheets/main.scss';

const App = () => <Container />;

document.addEventListener('DOMContentLoaded', () => {
  render(<App />, document.querySelector('#root'));
});
