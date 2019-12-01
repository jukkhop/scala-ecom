import { arrayOf, func, number, shape, string } from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import { GET_PRODUCTS } from '../../graphql';

const Products = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
`;

const Product = styled.li`
  display: block;
  flex-basis: 33%;

  @media (max-width: 960px) {
    flex-basis: 50%;
  }

  @media (max-width: 770px) {
    flex-basis: 100%;
  }
`;

const Content = styled.div`
  padding: 5rem;
  display: flex;
  justify-content: space-between;

  @media (max-width: 1200px) {
    padding: 3.5rem;
  }

  @media (max-width: 960px) {
    padding: 2.5rem;
  }

  @media (max-width: 770px) {
    padding: 1.5rem;
  }
`;

const Left = styled.div``;

const Title = styled.h2`
  margin-top: 0;
`;

const Desc = styled.div``;

const Right = styled.div``;

const ImgWrapper = styled.div`
  width: 150px;
`;

const Img = styled.img`
  height: auto;
  width: 150px;
  object-fit: cover;
`;

const Details = styled.div`
  margin-top: 2rem;
`;

const Detail = styled.div`
  margin-top: 1rem;
`;

const Label = styled.div`
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 1.5px;
`;

const Value = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  text-transform: uppercase;
  margin-top: 0.1rem;

  u {
    font-size: 1rem;
    font-weight: 400;
    text-decoration: none;
    text-transform: lowercase;
  }
`;

const BuyButton = styled.button`
  background-color: palevioletred;
  border-radius: 3px;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 2.5px;
  margin-top: 1.5rem;
  min-width: 120px;
  outline: none;
  padding: 0.5rem 0.5rem;
  text-transform: uppercase;
  transition: background-color 0.15s;

  &:hover {
    background-color: mediumvioletred;
  }

  &:active {
    background-color: darkred;
  }
`;

function ProductList({ addOrder, products }) {
  return (
    <Products>
      {products.map(({ id, title, desc, image, stock, price }) => (
        <Product key={id}>
          <Content>
            <Left>
              <Title>{title}</Title>
              <Desc>{desc}</Desc>
              <Details>
                <Detail>
                  <Label>Price</Label>
                  <Value>
                    {price} <u>€</u>
                  </Value>
                </Detail>
                <Detail>
                  <Label>Stock qty</Label>
                  <Value>
                    {stock} <u>pcs</u>
                  </Value>
                </Detail>
              </Details>
              <BuyButton
                onClick={e => {
                  e.preventDefault();
                  addOrder({
                    variables: { id, input: { id } },
                    refetchQueries: [{ query: GET_PRODUCTS }],
                  });
                }}
              >
                Buy
              </BuyButton>
            </Left>
            <Right>
              <ImgWrapper>
                <Img src={`/images/${image}`} alt="Product" />
              </ImgWrapper>
            </Right>
          </Content>
        </Product>
      ))}
    </Products>
  );
}

ProductList.propTypes = {
  addOrder: func.isRequired,
  products: arrayOf(
    shape({
      id: number,
      title: string,
      desc: string,
    }),
  ).isRequired,
};

export default ProductList;
