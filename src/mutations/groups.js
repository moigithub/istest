import gql from "graphql-tag";

export const ADDGROUP = gql`
  mutation createGroup($name:String!){
      createGroup(data:{name:$name}){
        id,
	      name
    }}

`;



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
    }}
`;


/* create group mutation
 {"data": {"name": "asd",
  "permissions":
  {"create": {"name": "asd","codename": "asd" }
  ,"connect": { "id": "asdfa"
  }}


   }}
* */

/*delete group mutationj

{"where": {"id": "123" }}

* */

/*  update group mutation
*
* {"data": {
  "name": "test",
  "permissions":
  { "create":
    { "name": "aaa",
    "codename": "bb"},
    "connect": {"id": 123}
	}
}
}
*
* */


/* login


  mutation login(
    $username: String!
    $password: String!
  ) {
    login(data: {
      username: $username
      password: $password
    }) {
      key
      user {
        id
        username
      }
    }
  }
  //////////////
  variables
   {"username": "sergio","password": "Inspired"}


./// resultao
{
  "data": {
    "login": {
      "key": "62c9159d1ac170b6ce564e27a28aacc4fc6922d4",
      "user": {
        "id": "2",
        "username": "sergio"
      }
    }
  }
}


* */

/*
query groups {
  groups {
    id,
      name
  }
}
////
{
  "data": {
  "groups": [
    {
      "id": "1",
      "name": "master"
    },
    {
      "id": "2",
      "name": "new group"
    }
  ]
}
}

*/
