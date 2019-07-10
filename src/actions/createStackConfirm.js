import { CREATE_STACK_CONFIRM } from '../Types';

const createStackConfirm = (payload) => ({
  type: CREATE_STACK_CONFIRM,
  payload: payload
});

export default createStackConfirm;