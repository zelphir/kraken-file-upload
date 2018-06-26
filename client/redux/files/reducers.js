import * as types from './types'

export const initialState = {
  data: [],
  isLoading: true,
  error: null,
  query: ''
}

const files = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_FILES_START:
    case types.UPLOAD_FILE_START:
    case types.DELETE_FILE_START:
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
    case types.UPLOAD_FILE_SUCCESS:
      return {
        data: [action.payload, ...state.data],
        isLoading: false,
        error: null
      }
    case types.DELETE_FILE_SUCCESS:
      return {
        data: state.data.filter(item => item.filename !== action.payload),
        isLoading: false,
        error: null
      }
    case types.GET_FILES_FAIL:
    case types.UPLOAD_FILE_FAIL:
    case types.DELETE_FILE_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.error.message
      }
    case types.FILTER_LIST:
      return {
        ...state,
        query: action.payload
        // data: state.data.filter(item => item.filename.includes(action.payload)),
        // isLoading: false,
        // error: null
      }
    default:
      return state
  }
}

export default files
