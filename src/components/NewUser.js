import React, {Component} from 'react'
import { withRouter} from 'react-router'

import {Mutation} from 'react-apollo'
import {
  Icon, notification,
  Input, InputNumber, Form, Button, message as antdMessage
} from 'antd'


const FormItem = Form.Item;

import AppLayout from './Layout'


import { CREATEUSER } from '../mutations/users'
import { ALLUSERS } from '../queries/users'


class NewUser extends Component {

  handleSubmit = (e, doSave) => {
    e.preventDefault();

    const {id} = this.props.match.params;
    const {name, email, age} = e.target;

    doSave({variables: { name:name.value, email:email.value, age:+age.value}});
  };

  onCompleted(data) {
    notification.open({
      message: 'New User',
      description: data.createUser.name+' created.',
      icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
    });

    this.props.history.push('/app/dashboard')
  }

  onError(error) {
    error.graphQLErrors && error.graphQLErrors.map(({message}, i) => antdMessage.error(message))
  }

  render() {
    return (
      <AppLayout>
        <div className="user_detail">
          <Mutation mutation={CREATEUSER}
                    onCompleted={(data) => this.onCompleted(data)}
                    onError={(error) => this.onError(error)}
                    refetchQueries={()=> [{  query : ALLUSERS   }]}
          >
            {(createMutation, { loading, error, data }) => (
              <Form onSubmit={(e) => this.handleSubmit(e, createMutation)}>
                <h2>Create new User</h2>
                <FormItem>
                  <Input size="large" name="name" placeholder="Name" />
                </FormItem>
                <FormItem>
                  <Input size="large" name="email" placeholder="Email" />
                </FormItem>
                <FormItem>
                  <InputNumber min={1} max={150} size="large" name="age" placeholder="Age" />
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
  }
}

export default withRouter(NewUser)
