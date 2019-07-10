import { LOAD_STACK } from '../Types';

const loadStack = (payload) => ({
  type: LOAD_STACK,
  payload: payload
});

export default loadStack;