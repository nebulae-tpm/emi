import gql from "graphql-tag";


export const getBusinessList = gql`
  query {
    getBusinesses(page: 0, count: 10, filter: "a") {
      _id
      generalInfo {
        name
      }
    }
  }
`;

export const getMyBusiness = gql`
  query {
    myBusiness {
      _id
      generalInfo {
        name
      }
    }
  }
`;
