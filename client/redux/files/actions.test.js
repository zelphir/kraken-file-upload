import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import MockAdapter from 'axios-mock-adapter'
import * as types from './types'
import { api, getFiles, deleteFile, uploadFile, filterList } from './actions'
import { initialState } from './reducers'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const mockResponse = [{ id: 1 }, { id: 2 }]
let mock

beforeEach(function() {
  mock = new MockAdapter(api)
})

afterEach(function() {
  mock.reset()
})

describe('getFiles actions', () => {
  it('should execute getFiles and dispatch GET_FILES_SUCCESS', async () => {
    mock.onGet('/files').reply(200, mockResponse)

    const expectedActions = [
      { type: types.GET_FILES_START },
      { type: types.GET_FILES_SUCCESS, payload: mockResponse }
    ]

    const store = mockStore({ files: initialState })

    await store.dispatch(getFiles())
    expect(store.getActions()).toEqual(expectedActions)
  })

  it('should execute getFiles and dispatch GET_FILES_FAIL', async () => {
    mock.onGet('/files').reply(500)

    const expectedActions = [
      { type: types.GET_FILES_START },
      { type: types.GET_FILES_FAIL, error: new Error('Request failed with status code 500') }
    ]

    const store = mockStore({ files: initialState })

    await store.dispatch(getFiles())
    expect(store.getActions()).toEqual(expectedActions)
  })
})

describe('deleteFile actions', () => {
  it('should execute deleteFile and dispatch DELETE_FILE_SUCCESS', async () => {
    mock.onDelete('/files/myFile.txt').reply(204)

    const expectedActions = [
      { type: types.DELETE_FILE_START },
      { type: types.DELETE_FILE_SUCCESS, payload: 'myFile.txt' }
    ]

    const store = mockStore({ files: initialState })

    await store.dispatch(deleteFile('myFile.txt'))
    expect(store.getActions()).toEqual(expectedActions)
  })

  it('should execute deleteFile and dispatch DELETE_FILE_FAIL if no filename', async () => {
    mock.onDelete('/files').reply(404)

    const expectedActions = [
      { type: types.DELETE_FILE_START },
      { type: types.DELETE_FILE_FAIL, error: new Error('No filename!') }
    ]

    const store = mockStore({ files: initialState })

    await store.dispatch(deleteFile())
    expect(store.getActions()).toEqual(expectedActions)
  })

  it('should execute deleteFile and dispatch DELETE_FILE_FAIL if server error', async () => {
    mock.onDelete('/files').reply(500)

    const expectedActions = [
      { type: types.DELETE_FILE_START },
      { type: types.DELETE_FILE_FAIL, error: new Error('Request failed with status code 404') }
    ]

    const store = mockStore({ files: initialState })

    await store.dispatch(deleteFile('myfile.txt'))
    expect(store.getActions()).toEqual(expectedActions)
  })
})

describe('uploadFile actions', () => {
  it('should execute uploadFile and dispatch UPLOAD_FILE_SUCCESS', async () => {
    mock.onPost('/upload').reply(200, { filename: '1.txt' })

    const expectedActions = [
      { type: types.UPLOAD_FILE_START },
      { type: types.UPLOAD_FILE_SUCCESS, payload: { filename: '1.txt' } }
    ]

    const store = mockStore({ files: initialState })
    const data = new FormData()
    data.append('upload', Buffer.alloc(5))

    await store.dispatch(uploadFile(data))
    expect(store.getActions()).toEqual(expectedActions)
  })

  it('should execute uploadFile and dispatch UPLOAD_FILE_FAIL if no file', async () => {
    mock.onPost('/upload').reply(400)

    const expectedActions = [
      { type: types.UPLOAD_FILE_START },
      { type: types.UPLOAD_FILE_FAIL, error: new Error('Request failed with status code 400') }
    ]

    const store = mockStore({ files: initialState })

    await store.dispatch(uploadFile())
    expect(store.getActions()).toEqual(expectedActions)
  })

  it('should execute uploadFile and dispatch UPLOAD_FILE_FAIL if server error', async () => {
    mock.onPost('/upload').reply(500)

    const expectedActions = [
      { type: types.UPLOAD_FILE_START },
      { type: types.UPLOAD_FILE_FAIL, error: new Error('Request failed with status code 500') }
    ]

    const store = mockStore({ files: initialState })
    const data = new FormData()
    data.append('upload', Buffer.alloc(5))

    await store.dispatch(uploadFile(data))
    expect(store.getActions()).toEqual(expectedActions)
  })
})

describe('filterList actions', () => {
  it('should create an action to filter the files list', () => {
    const query = 'txt'
    const expectedAction = {
      type: types.FILTER_LIST,
      payload: query
    }
    expect(filterList(query)).toEqual(expectedAction)
  })
})
