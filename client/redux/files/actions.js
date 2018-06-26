import axios from 'axios'
import * as types from './types'
import { apiUrl } from '../../consts'

export const api = axios.create({ baseURL: apiUrl })

const getFilesStart = () => ({ type: types.GET_FILES_START })
const getFilesSuccess = files => ({ type: types.GET_FILES_SUCCESS, payload: files })
const getFilesFail = error => ({ type: types.GET_FILES_FAIL, error })

export const getFiles = () => async dispatch => {
  dispatch(getFilesStart())
  try {
    const response = await api.get('/files')
    dispatch(getFilesSuccess(response.data))
  } catch (err) {
    dispatch(getFilesFail(err))
  }
}

const deleteFileStart = () => ({ type: types.DELETE_FILE_START })
const deleteFileSuccess = filename => ({ type: types.DELETE_FILE_SUCCESS, payload: filename })
const deleteFileFail = error => ({ type: types.DELETE_FILE_FAIL, error })

export const deleteFile = filename => async dispatch => {
  dispatch(deleteFileStart())
  if (!filename) return dispatch(deleteFileFail(new Error('No filename!')))

  try {
    await api.delete(`/files/${filename}`)
    dispatch(deleteFileSuccess(filename))
  } catch (err) {
    dispatch(deleteFileFail(err))
  }
}

const uploadFileStart = () => ({ type: types.UPLOAD_FILE_START })
const uploadFileSuccess = file => ({ type: types.UPLOAD_FILE_SUCCESS, payload: file })
const uploadFileFail = error => ({ type: types.UPLOAD_FILE_FAIL, error })

export const uploadFile = file => async dispatch => {
  dispatch(uploadFileStart())

  try {
    const response = await api.post('/upload', file)
    dispatch(uploadFileSuccess(response.data))
  } catch (err) {
    dispatch(uploadFileFail(err))
  }
}
