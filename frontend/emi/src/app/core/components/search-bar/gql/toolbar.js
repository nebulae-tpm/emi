import gql from "graphql-tag";


export const getBusinessList = gql`
  query getBusinessesList($page: Int!, $count: Int!, $filter: String){
  getBusinesses(page: $page, count:$count, filter: $filter){
    _id
    generalInfo{
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
