import { DELETE_STACK_CONFIRM } from '../Types';

const deleteStackConfirm = (payload) => ({
  type: DELETE_STACK_CONFIRM,
  payload: payload
});

export default deleteStackConfirm