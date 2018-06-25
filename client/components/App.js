import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { actions, selectors } from '../redux/files'

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

    if (error) return <h2>:-( Ops, something went wrong! Try again.</h2>

    return isLoading ? (
      <div>loading...</div>
    ) : (
      <React.Fragment>
        {!data.length ? <h2>:-( Ops, no files found! Add one!</h2> : <div>file list</div>}
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
