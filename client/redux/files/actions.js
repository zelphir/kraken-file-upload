import axios from 'axios'
import { GET_FILES_START, GET_FILES_SUCCESS, GET_FILES_FAIL } from './types'

const apiUrl = process.env.API_URL || 'http://localhost'
const apiPort = process.env.API_PORT || 5678
export const api = axios.create({ baseURL: `${apiUrl}:${apiPort}` })

const getFilesStart = () => ({ type: GET_FILES_START })
const getFilesSuccess = files => ({ type: GET_FILES_SUCCESS, payload: files })
const getFilesFail = error => ({ type: GET_FILES_FAIL, error })

export const getFiles = () => async dispatch => {
  dispatch(getFilesStart())
  try {
    const response = await api.get('/files')
    dispatch(getFilesSuccess(response.data))
  } catch (err) {
    dispatch(getFilesFail(err))
  }
}
