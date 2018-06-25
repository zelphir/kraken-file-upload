import * as types from './types'

export const initialState = {
  data: [],
  isLoading: false,
  error: null
}

const files = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_FILES_START:
      return {
        ...state,
        isLoading: true
      }
    case types.GET_FILES_SUCCESS:
      return {
        data: action.payload,
        isLoading: false,
        error: null
      }
    case types.GET_FILES_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.error.message
      }
    default:
      return state
  }
}

export default files
