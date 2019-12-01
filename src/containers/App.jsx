import React from 'react';
import styled from 'styled-components';

import ProductList from './ProductList';

const Header = styled.header`
  padding: 2.5rem 0;
`;

const Title = styled.h1`
  border-bottom: 2px solid #f0f0f0;
  margin-bottom: 2rem;
  margin: 0 auto;
  padding-bottom: 2rem;
  text-align: center;
  width: 50%;
`;

function App() {
  return (
    <div>
      <Header>
        <Title>Welcome to ecom store!</Title>
      </Header>
      <main>
        <ProductList />
      </main>
      <footer />
    </div>
  );
}

export default App;
