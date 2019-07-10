import { UPDATE_STACK_CONFIRM } from '../Types';

const updateStackConfirm = (payload) => ({
  type: UPDATE_STACK_CONFIRM,
  payload: payload
});

export default updateStackConfirm;