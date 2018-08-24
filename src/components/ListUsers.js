import React, {Component} from 'react'
import { withRouter} from 'react-router'
import {Link} from 'react-router-dom'


import {Query} from 'react-apollo'
import {
  Layout, Spin, Icon, Alert, Card, notification,
  Table, Popconfirm,
  Form, Button, message as antdMessage
} from 'antd'
const { Column } = Table;

import {Mutation} from 'react-apollo'

const FormItem = Form.Item;
const {  Content, Sider } = Layout;


import {ALLUSERS,} from '../queries/users'
import { DELETEUSER} from '../mutations/users'



class ListUsers extends Component {

  handleDeleteUser = (e, doDelete, data) => {
    doDelete({variables: {"id": data.id}})
  };

  onCompleted(data) {
    notification.warn({
      message: 'Delete User',
      description: data.deleteUser.name+' deleted.',
      icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
    });
  }

  onError(error) {
    error.graphQLErrors && error.graphQLErrors.map(({message}, i) => antdMessage.error(message))
  }

  render() {
    return (
      <div>
        <Layout theme="light">
          <Content>
            <h1>Users List</h1>
          </Content>
          <Sider style={{ background: 'transparent', display:'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Link className="ant-btn ant-btn-primary" to="/app/user/new">Create new user</Link>
          </Sider>
        </Layout>
        <Query
          query={ALLUSERS}
        >
          {({loading, error, data}) => {
            const antIcon = <Icon type="loading" style={{fontSize: 24}} spin/>;
            if (loading) return (
              <div style={{textAlign: 'center'}}>
                <Spin indicator={antIcon}/>
              </div>
            );

            if (error) return (
              <Alert message="Error" type="error" showIcon/>
            );


            return (
              <Table dataSource={data.users} rowKey="id">
                <Column title='Name' dataIndex= 'name' key= 'name' />
                <Column title='Email' dataIndex= 'email' key= 'email' />
                <Column title='Age' dataIndex= 'age' key= 'age' />
                <Column title='Edit' key= 'edit' render={(text, record)=> {
                  return (
                      <Link className="ant-btn" to={{pathname:"/app/user/"+record.id+"/edit"}}>Edit</Link>
                  )}}
                />
                <Column title='Borrar' key= 'borrar'  render={(text, record)=> (
                  <Mutation
                    mutation={DELETEUSER}
                    refetchQueries={()=>{
                      return [{
                        query : ALLUSERS
                      }]
                    }}
                    onCompleted={(data) => this.onCompleted(data)}
                    onError={(error) => this.onError(error)}
                  >
                    {(doDelete, {loading, error, data}) => (
                        <Popconfirm title="Está seguro de borrar?"
                                    icon={<Icon type="exclamation-circle" style={{ color: 'red' }}/>}
                                    onConfirm={(e) => this.handleDeleteUser(e, doDelete, record)}
                                    okText="Si" cancelText="No">
                          <Button type="danger">Borrar</Button>
                        </Popconfirm>
                      )
                    }
                  </Mutation>
                )}
                />
              </Table>
            )
          }}
        </Query>
      </div>
    )
  }
}

export default withRouter(ListUsers)
