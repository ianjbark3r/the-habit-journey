import { combineReducers } from 'redux';

import uiReducer from './uiReducer';
import stacksReducer from './stacksReducer';
import tutorialReducer from './tutorialReducer';

const rootReducer = combineReducers({
  ui: uiReducer,
  stacks: stacksReducer,
  tutorial: tutorialReducer
})

export default rootReducer