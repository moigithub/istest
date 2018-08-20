

import gql from 'graphql-tag'

const groupsQuery = gql`
query groups {
  groups {
    id,
    name
  }
}
`
export default groupsQuery



/*
* sergio:Inspired
* */
