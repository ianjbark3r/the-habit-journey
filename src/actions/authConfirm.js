import { AUTH_CONFIRM } from '../Types';

const authConfirm = (payload) => ({
  type: AUTH_CONFIRM,
  payload: payload
});

export default authConfirm;