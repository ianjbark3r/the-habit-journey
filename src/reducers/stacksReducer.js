import * as types from '../Types';

function insertItem(array, action) {
  let newArray = array.slice()
  newArray.push('new')
  return newArray
}

const stacksReducer = (state = {
  currentStack: {
    id: '',
    name: '',
    type: '',
    first_habit: '',
    time: '',
    location: '',
    data: []
  },
  storedStacks: []
}, action) => {
  switch(action.type) {
    case types.ADD_HABIT: {
      return {
        ...state,
        currentStack: {
          ...state.currentStack,
          data: insertItem(state.currentStack.data, action)
        }
      }
    }
    /* Takes returned payload from successful insert operation and changes the state */
    case types.CREATE_STACK_CONFIRM: {
      return {
        ...state,
        storedStacks: [
          ...state.storedStacks.concat(action.payload)
        ]
      }
    }
    case types.DASHBOARD_CLEAR: {
      return {
        ...state,
        storedStacks: []
      }
    }
    case types.DASHBOARD_RECEIVE: {
      return {
        ...state,
        storedStacks: [
          ...state.storedStacks.concat(action.payload.filter(item => {
            if (item.type === "stack") {
              return true;
            } else {
              return false;
            }
          })).sort((a, b) => (a.name > b.name) ? 1 : -1)
        ]
      }
    }
    /* After a successful delete, app will query DB again and fetch entire stack list. This will change state using that refreshed stack list. */
    case types.DELETE_STACK_CONFIRM: {
      return {
        ...state,
        storedStacks: [
          ...state.storedStacks.filter(stack => {
            return stack.id !== action.payload
          })
        ]
      }
    }
    case types.LOAD_STACK: {
      return {
        ...state,
        currentStack: action.payload 
      }
    }
    /* Update will start loading GIF next to "update" button. If successful, app will query DB again and fetch entire stack list. This will update currentStack with return from successful update and  */
    case types.UPDATE_STACK_CONFIRM: {
      return {
        ...state,
        storedStacks: [
          ...state.storedStacks.map((item, index) => {
            if (item.id === action.payload.id) {
              return action.payload
            } else {
              return state.storedStacks[index]
            }
          })
        ]
      }
    }
    default:
      return state;
  }
}

export default stacksReducer;