import * as selectors from './selectors'
import { initialState } from './reducers'

const state = { files: initialState }

describe('Files selectors', () => {
  it('should get data from state', () => {
    expect(selectors.getFiles(state)).toEqual([])
  })

  it('should filtered get data from state', () => {
    const newState = {
      files: {
        ...initialState,
        query: 'txt',
        data: [
          { originalName: 'Invoice.pdf' },
          { originalName: 'Meme.jpg' },
          { originalName: 'Myfile.txt' },
          { originalName: 'Myfiletxt.zip' },
          { originalName: 'Avatar.jpg' }
        ]
      }
    }

    expect(selectors.getFiles(newState)).toEqual([
      { originalName: 'Myfile.txt' },
      { originalName: 'Myfiletxt.zip' }
    ])
  })

  it('should get isLoading from state', () => {
    expect(selectors.isLoading(state)).toBe(true)
  })

  it('should get error from state', () => {
    expect(selectors.getError(state)).toBe(null)
  })

  it('should get query from state', () => {
    expect(selectors.getQuery(state)).toBe('')
  })
})
