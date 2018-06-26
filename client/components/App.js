import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Callout, Spinner } from '@blueprintjs/core'
import { actions, selectors } from '../redux/files'
import Nav from './Nav'
import List from './List'

export class App extends React.PureComponent {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    data: PropTypes.array.isRequired,
    error: PropTypes.string,
    getFiles: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.getFiles()
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

    return isLoading ? (
      <Spinner className="spinner" />
    ) : (
      <React.Fragment>
        <Nav hasData={!!data.length} />
        <List data={data} />
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
  { getFiles: actions.getFiles }
)(App)
