import { func, number, string } from 'prop-types';
import React, { useState } from 'react';
import styled from 'styled-components';

import { GET_PRODUCTS } from '../../graphql';

const Container = styled.li`
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

  &:disabled {
    background-color: lightgray;
  }
`;

function ProductCard({ addOrder, desc, id, image, price, stock, title }) {
  const [loading, setLoading] = useState(false);
  return (
    <Container>
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
            disabled={loading}
            onClick={async e => {
              e.preventDefault();
              setLoading(true);
              await addOrder({
                variables: { id, input: { id } },
                refetchQueries: [{ query: GET_PRODUCTS }],
                awaitRefetchQueries: true,
              });
              setLoading(false);
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
    </Container>
  );
}

ProductCard.propTypes = {
  addOrder: func.isRequired,
  desc: string.isRequired,
  id: number.isRequired,
  image: string.isRequired,
  price: number.isRequired,
  stock: number.isRequired,
  title: string.isRequired,
};

export default ProductCard;
