import { TUTORIAL_DISMISS } from '../Types';

const tutorialDismiss = (payload) => ({
  type: TUTORIAL_DISMISS,
  payload: payload
});

export default tutorialDismiss;