import React from 'react';
import { render } from 'react-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import Container from './components/Container';
import './assets/stylesheets/main.scss';

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
})

const App = () => (
  <ApolloProvider client={client}>
    <Container />
  </ApolloProvider>
);

document.addEventListener('DOMContentLoaded', () => {
  render(<App />, document.querySelector('#root'));
});
