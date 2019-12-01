import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { RestLink } from 'apollo-link-rest';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import App from '../containers/App';

const { REACT_APP_REST_ENDPOINT = 'http://localhost:9000/api' } = process.env;

const restLink = new RestLink({
  uri: `${REACT_APP_REST_ENDPOINT}`,
});

const client = new ApolloClient({
  link: restLink,
  cache: new InMemoryCache(),
});

export default props => {
  return (
    <ApolloProvider client={client}>
      {/* eslint-disable-next-line */}
      <App {...props} />
    </ApolloProvider>
  );
};
