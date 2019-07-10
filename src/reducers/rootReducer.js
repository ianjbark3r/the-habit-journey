import { combineReducers } from 'redux';

import uiReducer from './uiReducer';
import stacksReducer from './stacksReducer';

const rootReducer = combineReducers({
  ui: uiReducer,
  stacks: stacksReducer
})

export default rootReducer