import * as selectors from './selectors'
import { initialState } from './reducers'

const state = { files: initialState }

describe('Files selectors', () => {
  it('should get data from state', () => {
    expect(selectors.getFiles(state)).toEqual([])
  })

  it('should get isLoading from state', () => {
    expect(selectors.isLoading(state)).toBe(true)
  })

  it('should get error from state', () => {
    expect(selectors.getError(state)).toBe(null)
  })
})
