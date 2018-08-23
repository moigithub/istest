import gql from "graphql-tag";

export const CREATEUSER = gql`
mutation createUser($name: String!, $email: String!, $age: Int) {
  createUser(data:{name: $name, email: $email, age: $age}){
    id,name,email,age
  }
}`;

export const UPDATEUSER = gql`
mutation updateUser($id: ID!, $name: String, $email: String, $age: Int) {
  updateUser(data:{name: $name, email: $email, age: $age}, where:{id: $id}){
    id,name,email,age
  }
}`;

export const DELETEUSER = gql`
mutation deleteUser($id: ID!) {
  deleteUser(where:{id: $id}){
    id,name
  }
}`;


