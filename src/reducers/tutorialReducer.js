import * as types from '../Types';

const tutorialReducer = (state = {
  active: [],
  dismissed: []
}, action) => {
  switch (action.type) {
    case types.DASHBOARD_CLEAR: {
      return {
        ...state,
        active: [],
        dismissed: []
      }
    }
    case types.DASHBOARD_RECEIVE: {
      return {
        ...state,
        active: [
          ...state.active.concat(action.payload.filter(item => {
            if (item.type === "tutorial") {
              return true;
            } else {
              return false;
            }
          })[0].active)
        ],
        dismissed: [
          ...state.dismissed.concat(action.payload.filter(item => {
            if (item.type === "tutorial") {
              return true;
            } else {
              return false;
            }
          })[0].dismissed)
        ]
      }
    }
    case types.TUTORIAL_DISMISS: {
      return {
        ...state,
        active: [
          ...state.active.filter(item => {
            if (item === action.payload) {
              return false;
            } else {
              return true;
            }
          })
        ],
        dismissed: [
          ...state.dismissed.concat(action.payload)
        ]
      }
    }
    case types.TUTORIAL_RESET: {
      return {
        ...state,
        active: [
          ...state.active.concat(...state.dismissed)
        ],
        dismissed: []
      }
    }
    default:
      return state;
  }
}

export default tutorialReducer;