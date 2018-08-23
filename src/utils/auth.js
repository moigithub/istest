import store from 'store'
import { AUTH_TOKEN } from '../config/auth'

store.set('user', JSON.stringify({  id:"123", username:"hardcoded_user"})); /// test, por borrar

export const getToken = () => {
  return true;                /// test, por borrar

  return store.get(AUTH_TOKEN)
};

export const isAuth = () => {
  return !!getToken()
};

export const getUser = () => {
  return JSON.parse(store.get('user')) || {}
};

export const logout = () => {
  store.remove(AUTH_TOKEN);
  return true
};

export const login = (data) => {
  console.log(data.key);
  store.set(AUTH_TOKEN, data.key);
  store.set('user', JSON.stringify(data.user))
};
