import * as types from '../Types';

const uiReducer = (state = {
  auth: false,
  isLoading: false,
  redirecting: false,
  user: {}
}, action) => {
  switch (action.type) {
    case types.AUTH_REQUEST: {
      return {
        ...state,
        isLoading: true
      }
    }
    case types.AUTH_CONFIRM: {
      return {
        ...state,
        isLoading: false,
        auth: true,
        user: action.payload
      }
    }
    case types.AUTH_REVOKE: {
      return {
        ...state,
        isLoading: false,
        auth: false,
        user: {}
      }
    }
    case types.CREATE_STACK: {
      return {
        ...state,
        isLoading: true
      }
    }
    case types.CREATE_STACK_CANCEL: {
      return {
        ...state,
        isLoading: false
      }
    }
    case types.CREATE_STACK_CONFIRM: {
      return {
        ...state,
        isLoading: false
      }
    }
    case types.DASHBOARD_CANCEL: {
      return {
        ...state,
        isLoading: false
      }
    }
    case types.DASHBOARD_RECEIVE: {
      return {
        ...state,
        isLoading: false
      }
    }
    case types.DASHBOARD_REQUEST: {
      return {
        ...state,
        isLoading: true
      }
    }
    case types.DELETE_STACK: {
      return {
        ...state,
        isLoading: true
      }
    }
    case types.DELETE_STACK_CANCEL: {
      return {
        ...state,
        isLoading: false
      }
    }
    case types.DELETE_STACK_CONFIRM: {
      return {
        ...state,
        isLoading: false
      }
    }
    case types.REDIRECT: {
      return {
        ...state,
        redirecting: true
      }
    }
    case types.REDIRECT_CLEAR: {
      return {
        ...state,
        redirecting: false
      }
    }
    case types.STACK_RECEIVE: {
      return {
        ...state,
        isLoading: false
      }
    }
    case types.STACK_REQUEST: {
      return {
        ...state,
        isLoading: true
      }
    }
    case types.UPDATE_STACK: {
      return {
        ...state,
        isLoading: true
      }
    }
    case types.UPDATE_STACK_CANCEL: {
      return {
        ...state,
        isLoading: false
      }
    }
    case types.UPDATE_STACK_CONFIRM: {
      return {
        ...state,
        isLoading: false
      }
    }
    default:
      return state;
  }
}

export default uiReducer;