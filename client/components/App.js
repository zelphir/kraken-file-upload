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
    getFiles: PropTypes.func.isRequired,
    uploadFile: PropTypes.func.isRequired,
    deleteFile: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.getFiles()
  }

  handleDeleteFile = event => {
    event.preventDefault()
    this.props.deleteFile(event.currentTarget.value)
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
    const { data, isLoading, error } = this.props

    if (error)
      return (
        <div className="spacer">
          <Callout title="Ops, something went wrong!" intent="danger">
            <strong>{error}:</strong> Please try again refreshing the page.
          </Callout>
        </div>
      )

    return (
      <React.Fragment>
        <Nav hasData={!!data.length} onUpload={this.handleUploadFile} />
        <List data={data} onDelete={this.handleDeleteFile} onUpload={this.handleUploadFile} />
        <Overlay isOpen={isLoading} transitionDuration={50}>
          <Spinner className="spinner" />
        </Overlay>
      </React.Fragment>
    )
  }
}

export default connect(
  state => ({
    data: selectors.getFiles(state),
    isLoading: selectors.isLoading(state),
    error: selectors.getError(state)
  }),
  { getFiles: actions.getFiles, deleteFile: actions.deleteFile, uploadFile: actions.uploadFile }
)(App)
