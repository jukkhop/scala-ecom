import { useQuery, useMutation } from '@apollo/react-hooks';
import React from 'react';
import styled from 'styled-components';

import ProductList from '../../components/ProductList';
import { ADD_ORDER, GET_PRODUCTS } from '../../graphql';

const Message = styled.p`
  font-size: 1.5rem;
  text-align: center;
  margin: auto;
`;

function ProductListContainer() {
  const { loading, error, data } = useQuery(GET_PRODUCTS);
  const [addOrder] = useMutation(ADD_ORDER);

  if (loading) {
    return <Message>Loading...</Message>;
  }

  if (error) {
    return <Message>Error while fetching</Message>;
  }

  return <ProductList products={data.getProducts} addOrder={addOrder} />;
}

export default ProductListContainer;
