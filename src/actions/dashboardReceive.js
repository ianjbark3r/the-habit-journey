import { DASHBOARD_RECEIVE } from '../Types';

const dashboardReceive = (payload) => ({
  type: DASHBOARD_RECEIVE,
  payload: payload
});

export default dashboardReceive;