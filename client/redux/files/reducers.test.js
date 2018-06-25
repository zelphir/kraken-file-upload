import reducer, { initialState } from './reducers'
import * as actions from './types'

const data = [{ id: 1 }, { id: 2 }]

describe('Files reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should handle GET_FILES_START', () => {
    const startAction = {
      type: actions.GET_FILES_START
    }
    expect(reducer(initialState, startAction)).toEqual({ ...initialState, isLoading: true })
  })

  it('should handle GET_FILES_SUCCESS', () => {
    const successAction = {
      type: actions.GET_FILES_SUCCESS,
      payload: data
    }
    expect(reducer({}, successAction)).toEqual({
      data,
      error: null,
      isLoading: false
    })
  })

  it('should handle GET_FILES_FAIL', () => {
    const failAction = {
      type: actions.GET_FILES_FAIL,
      error: new Error('Something wrong')
    }
    expect(reducer({}, failAction)).toEqual({ error: 'Something wrong', isLoading: false })
  })
})
