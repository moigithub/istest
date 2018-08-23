import React, {Component} from 'react'
import { withRouter} from 'react-router'

import {Query, Mutation} from 'react-apollo'
import {
  Spin, Icon, Alert, notification,
  Input, InputNumber, Form, Button, message as antdMessage
} from 'antd'


const FormItem = Form.Item;

import AppLayout from './Layout'


import { SEARCHUSER} from '../queries/users'
import { UPDATEUSER } from '../mutations/users'



class EditUser extends Component {

  handleSubmit = (e, doSave) => {
    e.preventDefault()

    const {id} = this.props.match.params;
    console.log("update record ", e.target)

    const {name, email, age} = e.target;
    //mutation updateUser($id: ID!, $name: String, $email: String, $age: Int) {
    doSave({variables: {id, name:name.value, email:email.value, age:+age.value}})

  }

  onCompleted(data) {
    console.log("completed", data)
    notification.open({
      message: 'Edit User',
      description: data.updateUser.name+' saved.',
      icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
    });
    this.props.history.push('/app/dashboard')
  }

  onError(error) {
    error.graphQLErrors && error.graphQLErrors.map(({message}, i) => antdMessage.error(message))
  }

  render() {
    const {id} = this.props.match.params;
    console.log("edit user props",id)
    return (
        <Query
          query={SEARCHUSER}
          variables={{id}}
        >
          {({loading, error, data:querydata}) => {
            console.log("data groups ", querydata, error)

            const antIcon = <Icon type="loading" style={{fontSize: 24}} spin/>;
            if (loading) return (
              <div style={{textAlign: 'center'}}>
                <Spin indicator={antIcon}/>
              </div>
            )

            if (error) return (
              <Alert message="Error" type="error" showIcon/>
            )


            return (
              <AppLayout>
                <div className="user_detail">
                  <Mutation
                    mutation={UPDATEUSER}
                    onCompleted={(data) => this.onCompleted(data)}
                    onError={(error) => this.onError(error)}
                  >
                    {(updateMutation, { loading, error, data:updatedData }) => (
                        <Form onSubmit={(e) => this.handleSubmit(e, updateMutation)}>
                          <h2>Edit User</h2>
                          <FormItem>
                            <Input size="large" name="name" placeholder="Name" defaultValue={querydata.user.name}/>
                          </FormItem>
                          <FormItem>
                            <Input size="large" name="email" placeholder="Email"  defaultValue={querydata.user.email}/>
                          </FormItem>
                          <FormItem>
                            <InputNumber min={1} max={150} size="large" name="age"
                                         placeholder="Age"  defaultValue={querydata.user.age}
                            />
                          </FormItem>
                          <FormItem>
                            <Button size="large" type="primary" htmlType="submit" className="login-form__button" disabled={loading}>
                              Save
                            </Button>
                          </FormItem>
                        </Form>
                    )}
                  </Mutation>
                </div>
              </AppLayout>
            )
          }}
        </Query>
    )
  }
}

export default withRouter(EditUser)
