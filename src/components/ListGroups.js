import React, {Component} from 'react'
import {withRouter} from 'react-router'


import {Query} from 'react-apollo'
import {
  Select, Spin, Icon, Alert,
  Table, Input,
  Form, Button, message as antdMessage
} from 'antd'

import {Mutation} from 'react-apollo'

const FormItem = Form.Item;


import groupsQuery from '../queries/groups'


import {ADDGROUP, DELETEGROUP, UPDATEGROUP} from '../mutations/groups'


class ListGroups extends Component {


/////////////
  handleAddGroup = (e, doAdd) => {
    e.preventDefault();

    const {groupName} = e.target

    doAdd({
      variables:
        {
          "name": groupName.value
          /*          ,
                    "permissions":
                      {"create": {"name": "asd","codename": "asd" }
                        ,"connect": { "id": "asdfa"        }
                      }
          */

        }
    })
  }

  //agregar =

  /* create group mutation
   {"data": {"name": "asd",
    "permissions":
    {"create": {"name": "asd","codename": "asd" }
    ,"connect": { "id": "asdfa"
    }}


     }}
  * */


/////////////
  //actualizar =
  //////

  handleUpdateGroup = (e, doUpdate, record) => {
    e.preventDefault();

    const {groupName} = e.target

    doUpdate({
      variables:
        {"id": record.id, "name": groupName.value}
    })
  }


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


/////////////
  //borrar =
  handleDeleteGroup = (e, doDelete, record) => {
    e.preventDefault();

    console.log("delete record ", record)
    doDelete({variables: {"id": record.id}})

  }

  onCompleted(data) {
    console.log("completed", data, this.props)
   // this.props.history.push('/app/dashboard')
  }

  onError(error) {
    error.graphQLErrors && error.graphQLErrors.map(({message}, i) => antdMessage.error(message))
  }

  render() {
    return (
      <div><h1>Groups</h1>

        <Mutation
          mutation={ADDGROUP}
          refetchQueries={()=>{
            return [{
              query : groupsQuery
            }]
          }}
          onCompleted={(data) => this.onCompleted(data)}
          onError={(error) => this.onError(error)}
        >
          {(doAdd, {loading, error, data}) => (
            <Form onSubmit={(e) => this.handleAddGroup(e, doAdd)}>
              <h3>Create new group</h3>
              <FormItem>
                <Input size="large" name="groupName" prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                       placeholder="Group Name"/>
              </FormItem>
              <FormItem>
                <Button size="large" type="primary" htmlType="submit" className="login-form__button" disabled={loading}>
                  Crear
                </Button>
              </FormItem>
            </Form>
          )}
        </Mutation>

        <Query
          query={groupsQuery}
        >
          {({loading, error, data}) => {
            console.log("data groups ", data, error)

            const antIcon = <Icon type="loading" style={{fontSize: 24}} spin/>;
            if (loading) return (
              <div style={{textAlign: 'center'}}>
                <Spin indicator={antIcon}/>
              </div>
            )

            if (error) return (
              <Alert message="Error" type="error" showIcon/>
            )

            //const rates = data.rates.map(({ currency, rate }) => <Option key={`${currency}: ${rate}`}>{`${currency}: ${rate}`}</Option>)

            //Function onChange option
            // function handleChange(value) {
            //   console.log(`Selected: ${value}`)
            // }

            const columns = [{
              title: 'Name',
              dataIndex: 'name',
              key: 'name',
              render: text => <a href="javascript:;">{text}</a>,
            }, {
              title: 'Action',
              key: 'actualizar',
              render: (text, record) => (

                    <Mutation
                      mutation={UPDATEGROUP}
                      refetchQueries={()=>{
                        return [{
                          query : groupsQuery
                        }]
                      }}
                      onCompleted={(data) => this.onCompleted(data)}
                      onError={(error) => this.onError(error)}
                    >
                      {(doUpdate, {loading, error}) => (
                        <Form layout="inline" onSubmit={(e) => this.handleUpdateGroup(e, doUpdate, record)}>
                          <h2>New name</h2>
                          <FormItem>
                            <Input size="large" name="groupName"
                                   prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                   placeholder="Group Name"/>
                          </FormItem>
                          <FormItem>
                            <Button size="large" type="primary" htmlType="submit" className="login-form__button"
                                    disabled={loading}>
                              Actualizar
                            </Button>
                          </FormItem>
                        </Form>
                      )}
                      </Mutation>

              ),
            }

              , {
                title: 'Borrar',
                key: 'borrar',
                render: (text, record) => (
                     <Mutation
                       mutation={DELETEGROUP}
                       refetchQueries={()=>{
                         return [{
                           query : groupsQuery
                         }]
                       }}
                       onCompleted={(record) => this.onCompleted(record)}
                       onError={(error) => this.onError(error)}
                     >
                        {(doDelete, {loading, error}) => (
                          <Button type="danger"
                                  block={"false"}
                                  disabled={loading}
                                  onClick={(e) => this.handleDeleteGroup(e, doDelete, record)}
                          >
                            Borrar
                          </Button>
                        )}
                      </Mutation>
                ),
              }

            ];

            return (
              <Table columns={columns} dataSource={data.groups} rowKey="id"/>
            )
          }}
        </Query>
      </div>
    )
  }
}

export default withRouter(ListGroups)


