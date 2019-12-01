import { gql } from 'apollo-boost';

export const ADD_ORDER = gql`
  mutation($id: Int, $input: any) {
    orderProduct(id: $id, input: $input)
      @rest(type: "Product", path: "/order/{args.id}", method: "POST") {
      NoResponse
    }
  }
`;

export const GET_PRODUCTS = gql`
  query {
    getProducts @rest(type: "[Product]", path: "/product", method: "GET") {
      id
      title
      desc
      image
      stock
      price
    }
  }
`;
