import { arrayOf, func, number, shape, string } from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import ProductCard from '../ProductCard';

const Products = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
`;

function ProductList({ addOrder, products }) {
  return (
    <Products>
      {products.map(({ desc, id, image, price, stock, title }) => (
        <ProductCard
          addOrder={addOrder}
          desc={desc}
          id={id}
          image={image}
          key={id}
          price={price}
          stock={stock}
          title={title}
        />
      ))}
    </Products>
  );
}

ProductList.propTypes = {
  addOrder: func.isRequired,
  products: arrayOf(
    shape({
      desc: string.isRequired,
      id: number.isRequired,
      image: string.isRequired,
      price: number.isRequired,
      stock: number.isRequired,
      title: string.isRequired,
    }),
  ).isRequired,
};

export default ProductList;
