import Fuse from 'fuse.js'

const options = {
  shouldSort: false,
  threshold: 0.6,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: ['originalName']
}

export const getFiles = state => {
  const fuse = new Fuse(state.files.data, options)
  return !state.files.query ? state.files.data : fuse.search(state.files.query)
}
export const isLoading = state => state.files.isLoading
export const getError = state => state.files.error
export const getQuery = state => state.files.query
