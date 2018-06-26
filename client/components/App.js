import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Callout, Spinner, Overlay } from '@blueprintjs/core'
import { actions, selectors } from '../redux/files'
import Nav from './Nav'
import List from './List'

export class App extends React.PureComponent {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    data: PropTypes.array.isRequired,
    error: PropTypes.string,
    query: PropTypes.string,
    getFiles: PropTypes.func.isRequired,
    uploadFile: PropTypes.func.isRequired,
    deleteFile: PropTypes.func.isRequired,
    filterList: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.getFiles()
  }

  handleDeleteFile = event => {
    event.preventDefault()
    this.props.deleteFile(event.currentTarget.value)
  }

  handleFilter = event => {
    event.preventDefault()
    this.props.filterList(event.target.value)
  }

  handleUploadFile = event => {
    event.preventDefault()
    const { files } = event.target

    if (!files.length) return

    const data = new FormData()
    data.append('upload', files[0])
    this.props.uploadFile(data)
  }

  render() {
    const { data, isLoading, error, query } = this.props

    return (
      <React.Fragment>
        <Nav
          hasData={!!data.length}
          hasQuery={!!query}
          onUpload={this.handleUploadFile}
          handleFilter={this.handleFilter}
        />
        <List
          data={data}
          onDelete={this.handleDeleteFile}
          onUpload={this.handleUploadFile}
          hasQuery={!!query}
        />
        <Overlay isOpen={isLoading || error} transitionDuration={50}>
          {error ? (
            <div className="callout">
              <Callout title="Ops, something went wrong!" intent="danger">
                <strong>{error}</strong>
                <br />
                <span>Try again refreshing the page.</span>
              </Callout>
            </div>
          ) : (
            <Spinner className="spinner" />
          )}
        </Overlay>
      </React.Fragment>
    )
  }
}

export default connect(
  state => ({
    data: selectors.getFiles(state),
    isLoading: selectors.isLoading(state),
    error: selectors.getError(state),
    query: selectors.getQuery(state)
  }),
  {
    getFiles: actions.getFiles,
    deleteFile: actions.deleteFile,
    uploadFile: actions.uploadFile,
    filterList: actions.filterList
  }
)(App)
