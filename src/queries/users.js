import gql from "graphql-tag"

export const ALLUSERS = gql`
query allUsers {
  users{
    id,name,email,age
  }
}`;

export const SEARCHUSER = gql`
query searchUser($id: ID!){
  user(where:{id: $id}){
    id,name,email,age
  }
}`;

