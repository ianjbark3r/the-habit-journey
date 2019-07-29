import * as types from '../Types';
import uiReducer from './uiReducer';

describe('UI Reducer', () => {

  it('Should return default state', () => {
    const newState = uiReducer(undefined, {});
    expect(newState).toEqual({
      auth: false,
      isLoading: false,
      redirecting: false,
      user: {}
    });
  })

  describe('Auth', () => {
    describe('Auth Confirm', () => {
      it('Should set user data, set "auth" to true, and terminate loading', () => {
        const user = {
          userData: true
        }
        const newState = uiReducer(undefined, {
          type: types.AUTH_CONFIRM,
          payload: user
        })
        expect(newState).toEqual({
          auth: true,
          isLoading: false,
          redirecting: false,
          user: {
            userData: true
          }
        })
      })
    })
    
    describe('Auth Request', () => {
      it('Should initiate loading', () => {
        const newState = uiReducer(undefined, {
          type: types.AUTH_REQUEST,
        })
        expect(newState).toEqual({
          auth: false,
          isLoading: true,
          redirecting: false,
          user: {}
        })
      })
    })

    describe('Auth Revoke', () => {
      it('Should clear user data, set "auth" to false', () => {
        const newState = uiReducer(undefined, {
          type: types.AUTH_REVOKE,
        })
        expect(newState).toEqual({
          auth: false,
          isLoading: false,
          redirecting: false,
          user: {}
        })
      })
    })
  })

  describe('Stack Handling', () => {
    describe('Stack Creation', () => {
      describe('Create Stack', () => {
        it('Should initiate loading', () => {
          const newState = uiReducer(undefined, {
            type: types.CREATE_STACK
          });
          expect(newState).toEqual({
            auth: false,
            isLoading: true,
            redirecting: false,
            user: {}
          })
        })
      })
  
      describe('Create Stack Cancel', () => {
        it('Should terminate loading', () => {
          const newState = uiReducer(undefined, {
            type: types.CREATE_STACK_CANCEL
          });
          expect(newState).toEqual({
            auth: false,
            isLoading: false,
            redirecting: false,
            user: {}
          })
        })
      })
  
      describe('Create Stack Confirm', () => {
        it('Should terminate loading', () => {
          const newState = uiReducer(undefined, {
            type: types.CREATE_STACK_CONFIRM
          });
          expect(newState).toEqual({
            auth: false,
            isLoading: false,
            redirecting: false,
            user: {}
          })
        })
      })
    })

    describe('Stack Retrieval', () => {
      describe('Stack Request', () => {
        it('Should initiate loading', () => {
          const newState = uiReducer(undefined, {
            type: types.STACK_REQUEST
          });
          expect(newState).toEqual({
            auth: false,
            isLoading: true,
            redirecting: false,
            user: {}
          })
        })
      })
  
      describe('Stack Receive', () => {
        it('Should terminate loading', () => {
          const newState = uiReducer(undefined, {
            type: types.STACK_RECEIVE
          });
          expect(newState).toEqual({
            auth: false,
            isLoading: false,
            redirecting: false,
            user: {}
          })
        })
      })
    })

    describe('Stack Updating', () => {
      describe('Update Stack', () => {
        it('Should initiate loading', () => {
          const newState = uiReducer(undefined, {
            type: types.UPDATE_STACK
          });
          expect(newState).toEqual({
            auth: false,
            isLoading: true,
            redirecting: false,
            user: {}
          })
        })
      })
  
      describe('Update Stack Cancel', () => {
        it('Should terminate loading', () => {
          const newState = uiReducer(undefined, {
            type: types.UPDATE_STACK_CANCEL
          });
          expect(newState).toEqual({
            auth: false,
            isLoading: false,
            redirecting: false,
            user: {}
          })
        })
      })
  
      describe('Update Stack Confirm', () => {
        it('Should terminate loading', () => {
          const newState = uiReducer(undefined, {
            type: types.UPDATE_STACK_CONFIRM
          });
          expect(newState).toEqual({
            auth: false,
            isLoading: false,
            redirecting: false,
            user: {}
          })
        })
      })
    })

    describe('Stack Deletion', () => {
      describe('Delete Stack', () => {
        it('Should initiate loading', () => {
          const newState = uiReducer(undefined, {
            type: types.DELETE_STACK
          });
          expect(newState).toEqual({
            auth: false,
            isLoading: true,
            redirecting: false,
            user: {}
          })
        })
      })
  
      describe('Delete Stack Cancel', () => {
        it('Should terminate loading', () => {
          const newState = uiReducer(undefined, {
            type: types.DELETE_STACK_CANCEL
          });
          expect(newState).toEqual({
            auth: false,
            isLoading: false,
            redirecting: false,
            user: {}
          })
        })
      })
  
      describe('Delete Stack Confirm', () => {
        it('Should terminate loading', () => {
          const newState = uiReducer(undefined, {
            type: types.DELETE_STACK_CONFIRM
          });
          expect(newState).toEqual({
            auth: false,
            isLoading: false,
            redirecting: false,
            user: {}
          })
        })
      })
    })
  })

  describe('Dashboard', () => {
    describe('Dashboard Cancel', () => {
      it('Should terminate loading', () => {
        const newState = uiReducer(undefined, {
          type: types.DASHBOARD_CANCEL
        });
        expect(newState).toEqual({
          auth: false,
          isLoading: false,
          redirecting: false,
          user: {}
        })
      })
    })

    describe('Dashboard Receive', () => {
      it('Should terminate loading', () => {
        const newState = uiReducer(undefined, {
          type: types.DASHBOARD_RECEIVE
        });
        expect(newState).toEqual({
          auth: false,
          isLoading: false,
          redirecting: false,
          user: {}
        })
      })
    })

    describe('Dashboard Request', () => {
      it('Should initiate loading', () => {
        const newState = uiReducer(undefined, {
          type: types.DASHBOARD_REQUEST
        });
        expect(newState).toEqual({
          auth: false,
          isLoading: true,
          redirecting: false,
          user: {}
        })
      })
    })
  })

  describe('Redirects', () => {
    describe('Redirect', () => {
      it('Should initiate redirect', () => {
        const newState = uiReducer(undefined, {
          type: types.REDIRECT
        });
        expect(newState).toEqual({
          auth: false,
          isLoading: false,
          redirecting: true,
          user: {}
        })
      })
    })

    describe('Redirect Clear', () => {
      it('Should terminate redirect', () => {
        const newState = uiReducer(undefined, {
          type: types.REDIRECT_CLEAR
        });
        expect(newState).toEqual({
          auth: false,
          isLoading: false,
          redirecting: false,
          user: {}
        })
      })
    })
  })
});