import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import moxios from 'moxios'
import * as types from './types'
import { api, getFiles } from './actions'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)
const mockResponse = [{ id: 1 }, { id: 2 }]

describe('getFiles actions', () => {
  beforeEach(function() {
    moxios.install(api)
  })

  afterEach(function() {
    moxios.uninstall(api)
  })

  it('should execute getFiles and return the file list', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({ status: 200, response: mockResponse })
    })

    const expectedActions = [
      { type: types.GET_FILES_START },
      { type: types.GET_FILES_SUCCESS, payload: mockResponse }
    ]

    const store = mockStore({ payload: [] })

    await store.dispatch(getFiles())
    expect(store.getActions()).toEqual(expectedActions)
  })

  it('should execute getFiles and return the file list', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({ status: 500 })
    })

    const expectedActions = [
      { type: types.GET_FILES_START },
      { type: types.GET_FILES_FAIL, error: new Error('Request failed with status code 500') }
    ]

    const store = mockStore({ files: [] })

    await store.dispatch(getFiles())
    expect(store.getActions()).toEqual(expectedActions)
  })
})
