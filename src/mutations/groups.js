import gql from "graphql-tag";

export const ADDGROUP = gql`
  mutation createGroup($name:String!){
      createGroup(data:{name:$name}){
        id,
	      name
    }
  }`;


export const DELETEGROUP = gql`
  mutation deleteGroup($id:ID!){ 
      deleteGroup(where:{id:$id}){
        id,
	      name
    }
  }
`;


export const UPDATEGROUP = gql`
mutation updateGroup($id:ID!, $name:String!){ 
      updateGroup(data:{name:$name},where:{id:$id}){
        id,
	      name
    }
  }
`;

