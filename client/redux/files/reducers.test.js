import reducer, { initialState } from './reducers'
import * as actions from './types'

const data = [{ filename: 1 }, { filename: 2 }]

describe('Files reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  describe('GET_FILES', () => {
    it('should handle START', () => {
      const startAction = {
        type: actions.GET_FILES_START
      }
      expect(reducer(initialState, startAction)).toEqual({ ...initialState, isLoading: true })
    })

    it('should handle SUCCESS', () => {
      const successAction = {
        type: actions.GET_FILES_SUCCESS,
        payload: data
      }
      expect(reducer(initialState, successAction)).toEqual({
        data,
        error: null,
        isLoading: false
      })
    })

    it('should handle FAIL', () => {
      const failAction = {
        type: actions.GET_FILES_FAIL,
        error: new Error('Something wrong')
      }
      expect(reducer(initialState, failAction)).toEqual({
        ...initialState,
        error: 'Something wrong',
        isLoading: false
      })
    })
  })

  describe('UPLOAD_FILE', () => {
    it('should handle START', () => {
      const startAction = {
        type: actions.UPLOAD_FILE_START
      }
      expect(reducer(initialState, startAction)).toEqual({ ...initialState, isLoading: true })
    })

    it('should handle SUCCESS', () => {
      const successAction = {
        type: actions.UPLOAD_FILE_SUCCESS,
        payload: { filename: 3 }
      }
      expect(reducer({ ...initialState, data }, successAction)).toEqual({
        data: [...data, { filename: 3 }],
        error: null,
        isLoading: false
      })
    })

    it('should handle FAIL', () => {
      const failAction = {
        type: actions.UPLOAD_FILE_FAIL,
        error: new Error('Something wrong')
      }
      expect(reducer(initialState, failAction)).toEqual({
        ...initialState,
        error: 'Something wrong',
        isLoading: false
      })
    })
  })

  describe('DELETE_FILE', () => {
    it('should handle START', () => {
      const startAction = {
        type: actions.DELETE_FILE_START
      }
      expect(reducer(initialState, startAction)).toEqual({ ...initialState, isLoading: true })
    })

    it('should handle SUCCESS', () => {
      const successAction = {
        type: actions.DELETE_FILE_SUCCESS,
        payload: 1
      }
      expect(reducer({ ...initialState, data }, successAction)).toEqual({
        data: [{ filename: 2 }],
        error: null,
        isLoading: false
      })
    })

    it('should handle FAIL', () => {
      const failAction = {
        type: actions.DELETE_FILE_FAIL,
        error: new Error('Something wrong')
      }
      expect(reducer(initialState, failAction)).toEqual({
        ...initialState,
        error: 'Something wrong',
        isLoading: false
      })
    })
  })

  describe('FILTER_LIST', () => {
    it('should return the filtered list', () => {
      const startAction = {
        type: actions.FILTER_LIST,
        payload: 'txt'
      }
      expect(reducer(initialState, startAction)).toEqual({
        ...initialState,
        query: 'txt'
      })
    })
  })
})
